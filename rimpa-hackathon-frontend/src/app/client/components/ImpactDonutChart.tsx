"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "CO₂ Saved", value: 8.53, color: "hsl(var(--success))" },
  { name: "CO₂ Wasted", value: 0.77, color: "hsl(var(--muted))" },
];

export function ImpactDonutChart() {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm">
      <h3 className="text-sm font-semibold mb-4">Net Impact This Month</h3>
      <div className="flex items-center gap-6">
        <div className="h-40 w-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `${value.toFixed(2)} kg`}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1">
          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-semibold">{item.value} kg</span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-success/10 p-3">
            <p className="text-sm font-medium text-success">
              Net Impact: +4.82 kg CO₂ avoided
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Scheduling saved +8.53 kg; manuals added +0.77 kg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
