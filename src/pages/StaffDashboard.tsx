import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge, PriorityBadge } from "@/components/StatusBadge";
import { mockComplaints, categoryIcons } from "@/lib/mock-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function StaffDashboard() {
  const assigned = mockComplaints.filter(c => c.status !== "resolved");

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Assigned Tasks</h2>
          <p className="text-sm text-muted-foreground">{assigned.length} tasks pending</p>
        </div>

        <div className="space-y-4">
          {assigned.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{categoryIcons[c.category]}</span>
                      <div>
                        <CardTitle className="text-base font-display">{c.title}</CardTitle>
                        <p className="text-xs text-muted-foreground font-mono">{c.id}</p>
                      </div>
                    </div>
                    <PriorityBadge priority={c.priority} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{c.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {c.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(c.createdAt).toLocaleDateString()}</span>
                    <span>By: {c.studentName}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Update status:</span>
                      <Select defaultValue={c.status}>
                        <SelectTrigger className="w-[140px] h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reported">Reported</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 text-xs"
                      onClick={() => toast.success("Status updated")}
                    >
                      <CheckCircle className="h-3 w-3" /> Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
