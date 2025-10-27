"use client";
import Link from "next/link";
import { Zap, Cloud, Clock, Upload, Sparkles, Leaf, LayoutDashboard, Shield } from "lucide-react";
import { MetricCard } from "./components/MetricCard";
import { ImpactDonutChart } from "./components/ImpactDonutChart";
import { TrendsChart } from "./components/TrendsCharts";
import { ActivityFeed } from "./components/ActivityFeed";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function ClientDashboard() {
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
                    {/* Hero KPIs */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <MetricCard
                            title="CO₂ Avoided This Month"
                            value="4.82 kg"
                            change={14.5}
                            changeLabel="vs last month"
                            icon={Cloud}
                            iconClassName="bg-success/10 text-success"
                        />
                        <MetricCard
                            title="Bytes Shifted to Green Hours"
                            value="18.3 GB"
                            icon={Zap}
                            iconClassName="bg-primary/10 text-primary"
                            subtitle="72% of eligible traffic"
                        />
                        <MetricCard
                            title="On-Time Rate"
                            value="94%"
                            change={3.2}
                            icon={Clock}
                            iconClassName="bg-chart-3/10 text-chart-3"
                        />
                        <MetricCard
                            title="Urgent/Manual Uploads"
                            value="7"
                            change={-12}
                            changeLabel="fewer than last month"
                            icon={Upload}
                            iconClassName="bg-warning/10 text-warning"
                        />
                    </div>

                    {/* Impact Cards Row */}
                    <div className="grid gap-6 md:grid-cols-3">
                        <ImpactDonutChart />

                        <div className="rounded-2xl bg-card p-6 shadow-sm">
                            <h3 className="text-sm font-semibold mb-4">Green Windows Hit Rate</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Last 7 days</span>
                                    <span className="text-2xl font-bold">68%</span>
                                </div>
                                <div className="h-16 flex items-end gap-1">
                                    {[45, 62, 71, 58, 73, 81, 68].map((value, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 bg-primary rounded-t transition-all hover:opacity-80"
                                            style={{ height: `${value}%` }}
                                        />
                                    ))}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Average upload timing during low-carbon periods
                                </p>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-6 shadow-sm border border-primary/20">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                <h3 className="text-sm font-semibold">Next Green Slot</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-3xl font-bold">3h 12m</div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Tonight 10:30 PM • 220 gCO₂/kWh
                                    </p>
                                </div>
                                <div className="rounded-lg bg-card/50 p-3">
                                    <p className="text-sm font-medium">Save ~28% vs now</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Current intensity: 306 gCO₂/kWh
                                    </p>
                                </div>
                                <Button className="w-full" size="sm">
                                    Queue Files for This Slot
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Trends & Activity */}
                    <div className="grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <TrendsChart />
                        </div>
                        <ActivityFeed />
                    </div>

                    {/* Map & Forecast */}
                    <div className="rounded-2xl bg-card p-6 shadow-sm">
                        <h3 className="text-sm font-semibold mb-4">Carbon Intensity Forecast</h3>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <p className="text-xs text-muted-foreground mb-2">Your DC Region: Sydney, Australia</p>
                                <div className="h-32 rounded-lg bg-muted/30 flex items-center justify-center">
                                    <p className="text-sm text-muted-foreground">Map visualization</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground mb-2">Next 24 hours</p>
                                <div className="h-32">
                                    <div className="flex items-end gap-1 h-full">
                                        {Array.from({ length: 24 }, (_, i) => {
                                            const value = 180 + Math.sin(i / 3) * 80 + Math.random() * 40;
                                            const isLow = value < 220;
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex-1 rounded-t transition-all hover:opacity-80"
                                                    style={{
                                                        height: `${(value / 400) * 100}%`,
                                                        backgroundColor: isLow
                                                            ? "hsl(var(--success))"
                                                            : value < 280
                                                                ? "hsl(var(--warning))"
                                                                : "hsl(var(--destructive))",
                                                    }}
                                                    title={`${value.toFixed(0)} gCO₂/kWh`}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                                    <span>Now</span>
                                    <span>+24h</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
