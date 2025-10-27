"use client"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  saved: Math.random() * 2 + 3,
  baseline: 0,
}));

export function TrendsChart() {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-sm font-semibold">Daily CO₂ Avoided vs Baseline</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Past 30 days • Steady weekly improvement due to green-hour scheduling
        </p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="day"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}kg`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`${value.toFixed(2)} kg`, "CO₂ Avoided"]}
              labelFormatter={(label) => `Day ${label}`}
            />
            <Area
              type="monotone"
              dataKey="saved"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSaved)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
