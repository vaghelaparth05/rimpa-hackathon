'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap, Leaf, Sun, Wind, Gauge, Upload, Clock, Trees, Car, Cloud, Battery, Activity } from 'lucide-react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EnergyData {
  api_version: string;
  last_updated: string;
  servers: {
    [key: string]: {
      region: string;
      city: string;
      coordinates: string;
      energy_data: {
        fuel_tech: {
          solar: { generation: number; unit: string; percent: number };
          wind: { generation: number; unit: string; percent: number };
          hydro: { generation: number; unit: string; percent: number };
          coal: { generation: number; unit: string; percent: number };
          gas: { generation: number; unit: string; percent: number };
        };
        totals: {
          generation: number;
          demand: number;
          renewable_percent: number;
          nonrenewable_percent: number;
        };
        carbon: {
          intensity: number;
          unit: string;
          reduction_percent: number;
        };
        smart_recommendation: {
          optimal_start: string;
          optimal_end: string;
          best_source: string;
          reason: string;
          estimated_co2_saved: number;
          co2_unit: string;
          confidence_score: number;
        };
      };
    };
  };
}

interface UploadedFile {
    id: string;
    name: string;
    size: string;
    type: string;
    status: 'uploading' | 'queued' | 'completed' | 'failed';
    mode: 'green' | 'immediate';
    timestamp: Date;
    carbonSaved: number;
    server: string;
  }

// Carbon savings tracker
let totalCarbonSaved = 2.7; // Starting value to show some impact

export default function SchedulerPage() {
  const [energyData, setEnergyData] = useState<EnergyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<number>(0);
  const [filesUploaded, setFilesUploaded] = useState<number>(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadMode, setUploadMode] = useState<'now' | 'green' | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    fetchEnergyData();
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(fetchEnergyData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchEnergyData = async () => {
    try {
      const response = await fetch('https://api.npoint.io/b4b7c263eaa584d76f02');
      if (!response.ok) throw new Error('Failed to fetch energy data');
      const data = await response.json();
      setEnergyData(data);
      
     // Show notification when renewable energy is high
const bestServer = getBestServer(data);

if (bestServer) {
  // Get the original renewable percentage
  const originalPercent = bestServer[1].energy_data.totals.renewable_percent;

  // Add a small random variation (e.g., ±5%)
  const randomVariation = (Math.random() * 10 - 5); // random number between -5 and +5
  const newPercent = Math.min(100, Math.max(0, originalPercent + randomVariation)); // clamp between 0–100

  if (newPercent > 75) {
    toast.info(
      `🌱 High Renewable Energy! ${newPercent.toFixed(1)}% clean power available`,
      {
        position: "top-right",
        autoClose: 5000,
      }
    );
  }
}
} catch (err) {
  console.error('Error fetching energy data:', err);
} finally {
  setLoading(false);
}

  };

  const getBestServer = (data?: EnergyData) => {
    const targetData = data || energyData;
    if (!targetData) return null;
    
    const servers = Object.entries(targetData.servers);
    const bestServer = servers.reduce((best, [name, serverData]) => {
      if (!best) return [name, serverData];
      return serverData.energy_data.totals.renewable_percent > best[1].energy_data.totals.renewable_percent 
        ? [name, serverData] 
        : best;
    }, null as [string, EnergyData['servers'][string]] | null);

    return bestServer;
  };

  const handleUpload = async (mode: 'now' | 'green', file: File) => {
    setUploadMode(mode);
    setUploading(true);
  
    // Create file object for tracking
    const newFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.type || getFileType(file.name),
      status: mode === 'now' ? 'uploading' : 'queued',
      mode: mode === 'now' ? 'immediate' : 'green',
      timestamp: new Date(),
      carbonSaved: mode === 'now' ? 0.5 : 1.2,
      server: bestServer ? bestServer[0] : 'Unknown'
    };
  
    // Add to uploaded files list
    setUploadedFiles(prev => [newFile, ...prev]);
  
    if (mode === 'now') {
      // Immediate upload
      toast.success(`🚀 Uploading ${file.name} immediately...`);
      await simulateUpload();
      
      // Update file status to completed
      setUploadedFiles(prev => 
        prev.map(f => 
          f.id === newFile.id 
            ? { ...f, status: 'completed' }
            : f
        )
      );
      
      totalCarbonSaved += newFile.carbonSaved;
      setFilesUploaded(prev => prev + 1);
      toast.success(`✅ ${file.name} uploaded! ${newFile.carbonSaved}kg CO₂ saved`);
    } else {
      // Green upload - add to queue
      setUploadQueue(prev => prev + 1);
      toast.info(`🌿 ${file.name} queued for green upload during optimal renewable energy`);
      
      // Simulate waiting for optimal conditions
      setTimeout(async () => {
        // Update status to uploading when it starts
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === newFile.id 
              ? { ...f, status: 'uploading' }
              : f
          )
        );
        
        toast.info(`🌱 Now uploading ${file.name} with renewable energy...`);
        await simulateUpload();
        
        // Update to completed
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === newFile.id 
              ? { ...f, status: 'completed' }
              : f
          )
        );
        
        totalCarbonSaved += newFile.carbonSaved;
        setUploadQueue(prev => prev - 1);
        setFilesUploaded(prev => prev + 1);
        toast.success(`🌱 ${file.name} green upload complete! ${newFile.carbonSaved}kg CO₂ saved - equivalent to charging 60 smartphones!`);
      }, 5000); // Simulate 5 second delay for optimal energy
    }
  
    setUploading(false);
    setShowUploadModal(false);
  };
  
  const simulateUpload = () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
  };
  
  // Add this helper function
  const getFileType = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return 'PDF Document';
      case 'doc': case 'docx': return 'Word Document';
      case 'jpg': case 'jpeg': case 'png': case 'gif': return 'Image';
      case 'zip': case 'rar': return 'Archive';
      case 'mp4': case 'mov': return 'Video';
      case 'xls': case 'xlsx': return 'Spreadsheet';
      default: return 'Document';
    }
  };
  
  const getCarbonEquivalent = (carbonKg: number) => {
    const equivalents = [
      { value: carbonKg * 4.0, unit: 'smartphones charged', icon: '📱' },
      { value: carbonKg * 0.08, unit: 'km driven by car', icon: '🚗' },
      { value: carbonKg * 0.05, unit: 'tree days of oxygen', icon: '🌳' },
    ];
    return equivalents;
  };

  const bestServer = getBestServer();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!bestServer) {
    return <ErrorScreen onRetry={fetchEnergyData} />;
  }

  const [serverName, serverData] = bestServer;
  const renewablePercent = serverData.energy_data.totals.renewable_percent;
  const carbonEquivalents = getCarbonEquivalent(totalCarbonSaved);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-30 animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-cyan-200 rounded-full opacity-25 animate-ping"></div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <Link href="/admin">
            <Button variant="ghost" size="icon" className="bg-white/80 backdrop-blur-sm hover:bg-white">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center py-12 relative z-0">
        <div className="w-full max-w-4xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Carbon Impact */}
            <div className="lg:col-span-1 space-y-6">
              <CarbonImpactCard 
                totalCarbonSaved={totalCarbonSaved}
                equivalents={carbonEquivalents}
                filesUploaded={filesUploaded}
              />
              
              <UploadQueueCard 
                queueCount={uploadQueue}
                onUploadClick={() => setShowUploadModal(true)}
              />
            </div>

            {/* Right Column - Best Server & Upload */}
            <div className="lg:col-span-2">
              <BestServerCard 
                serverName={serverName}
                serverData={serverData}
                renewablePercent={renewablePercent}
                onUploadClick={() => setShowUploadModal(true)}
                uploading={uploading}
              />
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center mt-8">
  <p className="text-gray-500 text-sm">
    Last updated: {new Date().toLocaleTimeString('en-AU', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    })} - {new Date().toLocaleDateString('en-AU', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })}
  </p>
</div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
          renewablePercent={renewablePercent}
          optimalTime={serverData.energy_data.smart_recommendation.optimal_start}
        />
      )}

      <ToastContainer />
    </div>
  );
}

// Component: Loading Screen
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Scanning renewable energy grid...</p>
        <p className="text-gray-500 text-sm mt-2">Finding optimal server for your upload</p>
      </div>
    </div>
  );
}

// Component: Error Screen
function ErrorScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center">
          <p className="text-red-600 mb-4">Failed to load energy data</p>
          <Button onClick={onRetry}>Retry Analysis</Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Component: Carbon Impact Card
function CarbonImpactCard({ 
  totalCarbonSaved, 
  equivalents, 
  filesUploaded 
}: { 
  totalCarbonSaved: number;
  equivalents: any[];
  filesUploaded: number;
}) {
  return (
    <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-emerald-700">
          <Leaf className="h-5 w-5" />
          Your Green Impact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Carbon Saved */}
        <div className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-br from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
            {totalCarbonSaved.toFixed(1)}kg
          </div>
          <div className="text-sm text-gray-600 font-medium">CO₂ Emissions Saved</div>
        </div>

        {/* Equivalent Facts */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 text-sm">That's equivalent to:</h4>
          {equivalents.map((eq, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">{eq.icon}</span>
              <div>
                <div className="font-semibold text-gray-900">{eq.value.toFixed(1)}</div>
                <div className="text-xs text-gray-600">{eq.unit}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Files Stats */}
        <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
          <div>
            <div className="font-semibold text-emerald-900">{filesUploaded}</div>
            <div className="text-xs text-emerald-700">Files Uploaded</div>
          </div>
          <Cloud className="h-8 w-8 text-emerald-600 opacity-60" />
        </div>
      </CardContent>
    </Card>
  );
}

// Component: Upload Queue Card
function UploadQueueCard({ queueCount, onUploadClick }: { queueCount: number; onUploadClick: () => void }) {
  return (
    <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-xl">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Green Upload Queue</h3>
          <div className="text-3xl font-bold text-amber-600 mb-4">{queueCount}</div>
          <p className="text-sm text-gray-600 mb-4">
            Files waiting for optimal renewable energy
          </p>
          <Button 
            onClick={onUploadClick}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Component: Best Server Card
function BestServerCard({ 
  serverName, 
  serverData, 
  renewablePercent, 
  onUploadClick,
  uploading 
}: { 
  serverName: string;
  serverData: any;
  renewablePercent: number;
  onUploadClick: () => void;
  uploading: boolean;
}) {
  return (
    <Card className="border-0 shadow-2xl backdrop-blur-sm bg-white/90">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center">
              <Zap className="h-12 w-12 text-white" />
            </div>
            <Badge className="absolute -top-2 -right-2 bg-emerald-500 text-white px-3 py-1 text-sm">
              ★ Optimal
            </Badge>
          </div>
        </div>
        
        <CardTitle className="text-4xl font-bold text-gray-900 mb-2 capitalize">
          {serverName} Server
        </CardTitle>
        
        <CardDescription className="text-xl text-gray-600">
          {serverData.city}, {serverData.region}
        </CardDescription>

        {/* Renewable Percentage with Animation */}
        <div className="mt-6">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="text-center">

              <div className="text-2xl font-bold text-gray-900">
      {Math.max(0, Math.min(100, 
        renewablePercent + (Math.random() * 6 - 3)
      )).toFixed(1)}%
    </div>
              <div className="text-lg text-gray-600 font-medium">Renewable Energy</div>
            </div>
          </div>
          
          {/* Animated Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-cyan-500 h-4 rounded-full transition-all duration-2000 ease-out"
              style={{ width: `${renewablePercent}%` }}
            ></div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Energy Sources */}
        <div className="grid grid-cols-2 gap-4">
  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 text-center border border-amber-200">
    <Sun className="h-8 w-8 text-amber-500 mx-auto mb-2" />
    <div className="text-2xl font-bold text-gray-900">
      {Math.max(0, Math.min(100, 
        serverData.energy_data.fuel_tech.solar.percent + (Math.random() * 6 - 3)
      )).toFixed(1)}%
    </div>
    <div className="text-sm text-amber-700 font-medium">Solar</div>
  </div>
  
  <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-4 text-center border border-blue-200">
    <Wind className="h-8 w-8 text-blue-500 mx-auto mb-2" />
    <div className="text-2xl font-bold text-gray-900">
      {Math.max(0, Math.min(100, 
        serverData.energy_data.fuel_tech.wind.percent + (Math.random() * 8 - 4)
      )).toFixed(1)}%
    </div>
    <div className="text-sm text-blue-700 font-medium">Wind</div>
  </div>
</div>

        {/* Smart Recommendation */}
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl p-6 text-white">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Activity className="h-5 w-5" />
              <span className="font-semibold">Smart Recommendation</span>
            </div>
            
            <p className="text-emerald-100 text-sm mb-4">
              {serverData.energy_data.smart_recommendation.reason}
            </p>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="text-center">
                <div className="font-semibold text-lg">
                  {serverData.energy_data.smart_recommendation.estimated_co2_saved}kg
                </div>
                <div className="text-emerald-100">CO₂ Saved</div>
              </div>
              
              <div className="h-8 w-px bg-emerald-400"></div>
              
              <div className="text-center">
                <div className="font-semibold text-lg">
                  {serverData.energy_data.carbon.intensity} {serverData.energy_data.carbon.unit}
                </div>
                <div className="text-emerald-100">Carbon Intensity</div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={onUploadClick}
            disabled={uploading}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-6 w-6 mr-3" />
                Upload Your Files
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function UploadModal({ 
    onClose, 
    onUpload, 
    renewablePercent,
    optimalTime 
  }: { 
    onClose: () => void;
    onUpload: (mode: 'now' | 'green', file: File) => void;
    renewablePercent: number;
    optimalTime: string;
  }) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
  
    const handleFileSelect = (file: File) => {
      setSelectedFile(file);
    };
  
    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
  
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    };
  
    const handleUploadClick = (mode: 'now' | 'green') => {
      if (selectedFile) {
        onUpload(mode, selectedFile);
      } else {
        toast.error('Please select a file first');
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-auto animate-in fade-in duration-300">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload File</h3>
            <p className="text-gray-600 mb-6">Choose how to upload your file</p>
  
            {/* File Upload Area */}
            <div 
              className={`border-2 border-dashed rounded-2xl p-8 text-center mb-6 cursor-pointer transition-all duration-200 ${
                dragActive 
                  ? 'border-emerald-400 bg-emerald-50' 
                  : selectedFile 
                  ? 'border-emerald-300 bg-emerald-50' 
                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />
              
              <Cloud className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              
              {selectedFile ? (
                <div>
                  <p className="font-semibold text-gray-900 truncate">{selectedFile.name}</p>
                  <p className="text-sm text-gray-600">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'Unknown type'}
                  </p>
                  <p className="text-xs text-emerald-600 mt-2">Click to change file</p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-gray-900">Drop your file here</p>
                  <p className="text-sm text-gray-600">or click to browse</p>
                  <p className="text-xs text-gray-500 mt-2">PDF, Images, Documents</p>
                </div>
              )}
            </div>
  
            {/* Upload Options */}
            <div className="space-y-4">
              {/* Green Upload Option */}
              <div 
                className={`border-2 rounded-2xl p-4 cursor-pointer transition-all duration-200 ${
                  selectedFile 
                    ? 'border-emerald-200 bg-emerald-50 hover:border-emerald-400' 
                    : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                }`}
                onClick={() => selectedFile && handleUploadClick('green')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-emerald-900 text-lg">Green Upload</h4>
                    <p className="text-emerald-700 text-sm">
                      Wait for optimal renewable energy ({renewablePercent}% now)
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs text-emerald-600">Best time: {optimalTime}</span>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Immediate Upload Option */}
              <div 
                className={`border-2 rounded-2xl p-4 cursor-pointer transition-all duration-200 ${
                  selectedFile 
                    ? 'border-blue-200 bg-blue-50 hover:border-blue-400' 
                    : 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                }`}
                onClick={() => selectedFile && handleUploadClick('now')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">Upload Now</h4>
                    <p className="text-gray-600 text-sm">
                      Immediate upload (higher carbon footprint)
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            <Button 
              variant="ghost" 
              onClick={onClose}
              className="w-full mt-6"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }