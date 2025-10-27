import { CheckCircle2, AlertCircle, TrendingUp } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "success",
    message: "Moved 2.3 GB to 10:45 PM green slot",
    impact: "0.12 kg CO₂ avoided",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "warning",
    message: "Manual upload at 3:12 PM",
    impact: "+0.04 kg vs green window",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "success",
    message: "Batch upload completed during low-carbon period",
    impact: "0.31 kg CO₂ avoided",
    time: "Yesterday",
  },
  {
    id: 4,
    type: "milestone",
    message: "Achievement unlocked: 3 days in a row ≥50% green uploads",
    time: "2 days ago",
  },
];

export function ActivityFeed() {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Recent Activity</h3>
        <span className="text-xs text-muted-foreground">Last 7 days</span>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 pb-4 last:pb-0 border-b last:border-0">
            <div className="flex-shrink-0 mt-1">
              {activity.type === "success" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
              )}
              {activity.type === "warning" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/10">
                  <AlertCircle className="h-4 w-4 text-warning" />
                </div>
              )}
              {activity.type === "milestone" && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{activity.message}</p>
              {activity.impact && (
                <p className="text-sm text-muted-foreground mt-0.5">{activity.impact}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
