"use client"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  subtitle?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconClassName,
  subtitle,
}: MetricCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
            {change !== undefined && (
              <span
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  isPositive && "text-success",
                  isNegative && "text-destructive"
                )}
              >
                {isPositive && <TrendingUp className="h-4 w-4" />}
                {isNegative && <TrendingDown className="h-4 w-4" />}
                {Math.abs(change)}%
              </span>
            )}
          </div>
          {(changeLabel || subtitle) && (
            <p className="mt-1 text-xs text-muted-foreground">
              {changeLabel || subtitle}
            </p>
          )}
        </div>
        {Icon && (
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              iconClassName || "bg-primary/10 text-primary"
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
}
