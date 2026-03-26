import { Badge } from "@/components/ui/badge";
import type { ComplaintStatus, ComplaintPriority } from "@/lib/mock-data";
import { statusLabels, priorityLabels } from "@/lib/mock-data";

export function StatusBadge({ status }: { status: ComplaintStatus }) {
  const variants: Record<ComplaintStatus, string> = {
    reported: "bg-info/15 text-info border-info/30",
    in_progress: "bg-warning/15 text-warning border-warning/30",
    resolved: "bg-success/15 text-success border-success/30",
  };

  return (
    <Badge variant="outline" className={`${variants[status]} font-medium`}>
      {statusLabels[status]}
    </Badge>
  );
}

export function PriorityBadge({ priority }: { priority: ComplaintPriority }) {
  const variants: Record<ComplaintPriority, string> = {
    low: "bg-muted text-muted-foreground",
    medium: "bg-info/15 text-info",
    high: "bg-warning/15 text-warning",
    urgent: "bg-urgent/15 text-urgent animate-pulse",
  };

  return (
    <Badge className={`${variants[priority]} font-medium border-0`}>
      {priority === "urgent" && "🚨 "}{priorityLabels[priority]}
    </Badge>
  );
}
