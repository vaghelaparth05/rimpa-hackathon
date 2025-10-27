"use client";
import { useState } from "react";
import { Upload, Play, Pause, X, Clock, CheckCircle2, AlertCircle, Loader2, Leaf, Shield, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./components/Table";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "./components/Sheet";
import { cn } from "@/lib/utils";
import { Badge } from "./components/Badge";
import { Progress } from "./components/Progress";
import Link from "next/link";
import { usePathname } from "next/navigation";

const uploads = [
    {
        id: 1,
        name: "Q4_Marketing_Assets.zip",
        size: "2.3 GB",
        status: "uploading",
        progress: 42,
        targetStart: "10:30 PM",
        deadline: "Tomorrow 8 AM",
        saving: 0.31,
        savingPercent: 28,
    },
    {
        id: 2,
        name: "Database_Backup_Dec.sql",
        size: "8.7 GB",
        status: "scheduled",
        progress: 0,
        targetStart: "11:45 PM",
        deadline: "Tomorrow 6 AM",
        saving: 1.24,
        savingPercent: 35,
    },
    {
        id: 3,
        name: "Video_Campaign_Raw.mov",
        size: "4.1 GB",
        status: "queued",
        progress: 0,
        targetStart: "10:30 PM",
        deadline: "Dec 16, 9 AM",
        saving: 0.58,
        savingPercent: 31,
    },
    {
        id: 4,
        name: "Client_Reports_Bundle.zip",
        size: "1.2 GB",
        status: "completed",
        progress: 100,
        targetStart: "Last night",
        deadline: "Today 8 AM",
        saving: 0.18,
        savingPercent: 24,
    },
    {
        id: 5,
        name: "Emergency_Patch.tar.gz",
        size: "450 MB",
        status: "failed",
        progress: 67,
        targetStart: "2:30 PM",
        deadline: "Today 3 PM",
        saving: 0,
        savingPercent: 0,
    },
];

const statusConfig = {
    queued: { label: "Queued", icon: Clock, className: "bg-muted text-muted-foreground" },
    scheduled: { label: "Scheduled", icon: Clock, className: "bg-primary/10 text-primary" },
    uploading: { label: "Uploading", icon: Loader2, className: "bg-chart-3/10 text-chart-3 animate-pulse-soft" },
    paused: { label: "Paused", icon: Pause, className: "bg-warning/10 text-warning" },
    completed: { label: "Done", icon: CheckCircle2, className: "bg-success/10 text-success" },
    failed: { label: "Failed", icon: AlertCircle, className: "bg-destructive/10 text-destructive" },
};

export default function UploadsPage() {
    const [selectedUpload, setSelectedUpload] = useState<number | null>(null);
    const selected = uploads.find((u) => u.id === selectedUpload);
    const navigation = [
        { name: "Client Dashboard", href: "/client", icon: LayoutDashboard },
        { name: "Admin Dashboard", href: "/admin", icon: Shield },
        { name: "Uploads", href: "/uploads", icon: Upload },
    ];
    const pathname = usePathname();
    return (
        <div>
            <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
                <div className="container flex h-16 items-center px-4">
                    <div className="flex items-center gap-2 font-semibold">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                            <Leaf className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-lg">CarbonSync</span>
                    </div>

                    <nav className="ml-auto flex items-center gap-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </header>
            <div className="container mx-auto py-8 px-4">
                <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Uploads & Progress</h1>
                            <p className="text-muted-foreground mt-1">
                                Manage your file uploads and track carbon impact
                            </p>
                        </div>
                        <Button>
                            <Upload className="mr-2 h-4 w-4" />
                            New Upload
                        </Button>
                    </div>

                    <div className="rounded-2xl bg-card shadow-sm overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>File/Bundle</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Target Start</TableHead>
                                    <TableHead>Deadline</TableHead>
                                    <TableHead>Projected Saving</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {uploads.map((upload) => {
                                    const StatusIcon = statusConfig[upload.status as keyof typeof statusConfig].icon;
                                    return (
                                        <TableRow
                                            key={upload.id}
                                            className="cursor-pointer hover:bg-muted/50"
                                            onClick={() => setSelectedUpload(upload.id)}
                                        >
                                            <TableCell className="font-medium">{upload.name}</TableCell>
                                            <TableCell>{upload.size}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="secondary"
                                                    className={cn(
                                                        "gap-1",
                                                        statusConfig[upload.status as keyof typeof statusConfig].className
                                                    )}
                                                >
                                                    <StatusIcon className="h-3 w-3" />
                                                    {statusConfig[upload.status as keyof typeof statusConfig].label}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{upload.targetStart}</TableCell>
                                            <TableCell>{upload.deadline}</TableCell>
                                            <TableCell>
                                                {upload.saving > 0 ? (
                                                    <div>
                                                        <span className="font-semibold text-success">{upload.saving} kg</span>
                                                        <span className="text-xs text-muted-foreground ml-1">
                                                            ({upload.savingPercent}%)
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">N/A</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {upload.status === "uploading" && (
                                                        <Button variant="ghost" size="sm">
                                                            <Pause className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    {(upload.status === "queued" || upload.status === "scheduled") && (
                                                        <Button variant="ghost" size="sm">
                                                            <Play className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    <Button variant="ghost" size="sm">
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>

                    <Sheet  open={selectedUpload !== null} onOpenChange={() => setSelectedUpload(null)}>
                        <SheetContent className="sm:max-w-2xl overflow-y-auto background-white-important">
                            {selected && (
                                <>
                                    <SheetHeader>
                                        <SheetTitle>{selected.name}</SheetTitle>
                                        <SheetDescription>Upload details and carbon impact</SheetDescription>
                                    </SheetHeader>

                                    <div className="mt-6 space-y-6">
                                        {/* Status Pills */}
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">Queued</Badge>
                                            <div className="h-px flex-1 bg-border" />
                                            <Badge variant="outline">Waiting for Green</Badge>
                                            <div className="h-px flex-1 bg-border" />
                                            <Badge
                                                className={cn(
                                                    selected.status === "uploading" && "bg-primary text-primary-foreground"
                                                )}
                                            >
                                                Uploading
                                            </Badge>
                                            <div className="h-px flex-1 bg-border" />
                                            <Badge variant="outline">Done</Badge>
                                        </div>

                                        {/* Progress */}
                                        {selected.status === "uploading" && (
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-medium">{selected.progress}% Complete</span>
                                                    <span className="text-muted-foreground">22 MB/s • ETA 09:14</span>
                                                </div>
                                                <Progress value={selected.progress} className="h-2" />
                                            </div>
                                        )}

                                        {/* Countdown */}
                                        {selected.status === "scheduled" && (
                                            <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                                                <div className="flex items-center gap-3">
                                                    <Clock className="h-5 w-5 text-primary" />
                                                    <div>
                                                        <p className="font-semibold">20m 18s to target start</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Greener than now by {selected.savingPercent}%
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Carbon Meters */}
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="rounded-lg bg-muted/50 p-4">
                                                <p className="text-xs font-medium text-muted-foreground mb-2">BASELINE</p>
                                                <p className="text-2xl font-bold">1.10 kg</p>
                                                <p className="text-xs text-muted-foreground mt-1">If started now</p>
                                            </div>
                                            <div className="rounded-lg bg-success/10 p-4 border border-success/20">
                                                <p className="text-xs font-medium text-success mb-2">SCHEDULED</p>
                                                <p className="text-2xl font-bold text-success">0.79 kg</p>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Target: {selected.targetStart}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="rounded-lg bg-success/5 p-4 border border-success/20">
                                            <p className="text-sm font-medium text-success">
                                                You're on track to avoid {selected.saving} kg on this job
                                            </p>
                                        </div>

                                        {/* Details */}
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-muted-foreground">File Size</span>
                                                <span className="font-medium">{selected.size}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-muted-foreground">Deadline</span>
                                                <span className="font-medium">{selected.deadline}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-muted-foreground">Target Start</span>
                                                <span className="font-medium">{selected.targetStart}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-muted-foreground">Region</span>
                                                <span className="font-medium">Sydney, AU</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 pt-4">
                                            <Button className="flex-1">Start Now</Button>
                                            <Button variant="outline" className="flex-1">
                                                Reschedule
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
}