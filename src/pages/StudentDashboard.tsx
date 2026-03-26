import { AppLayout } from "@/components/AppLayout";
import { ComplaintCard } from "@/components/ComplaintCard";
import { mockComplaints } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const stats = [
  { label: "Total", value: mockComplaints.length, icon: <AlertTriangle className="h-5 w-5" />, color: "text-primary" },
  { label: "In Progress", value: mockComplaints.filter(c => c.status === "in_progress").length, icon: <Clock className="h-5 w-5" />, color: "text-warning" },
  { label: "Resolved", value: mockComplaints.filter(c => c.status === "resolved").length, icon: <CheckCircle className="h-5 w-5" />, color: "text-success" },
];

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Dashboard</h2>
            <p className="text-sm text-muted-foreground">Overview of your complaints</p>
          </div>
          <Button onClick={() => navigate("/new-complaint")} className="gap-2">
            <Plus className="h-4 w-4" /> New Complaint
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="shadow-card">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`${s.color}`}>{s.icon}</div>
                  <div>
                    <p className="text-2xl font-display font-bold text-card-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div>
          <h3 className="font-display font-semibold text-foreground mb-3">Recent Complaints</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {mockComplaints.map((c) => (
              <ComplaintCard key={c.id} complaint={c} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
