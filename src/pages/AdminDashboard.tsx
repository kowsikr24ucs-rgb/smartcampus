import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockComplaints, categoryLabels } from "@/lib/mock-data";
import type { ComplaintCategory } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { AlertTriangle, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const COLORS = ["hsl(174,62%,32%)", "hsl(36,95%,55%)", "hsl(0,72%,51%)", "hsl(210,80%,55%)", "hsl(152,60%,40%)", "hsl(280,60%,50%)"];

export default function AdminDashboard() {
  const total = mockComplaints.length;
  const reported = mockComplaints.filter(c => c.status === "reported").length;
  const inProgress = mockComplaints.filter(c => c.status === "in_progress").length;
  const resolved = mockComplaints.filter(c => c.status === "resolved").length;

  // Category breakdown
  const categoryData = Object.entries(
    mockComplaints.reduce((acc, c) => {
      acc[c.category] = (acc[c.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([key, value]) => ({
    name: categoryLabels[key as ComplaintCategory],
    value,
  }));

  // Location breakdown
  const locationData = Object.entries(
    mockComplaints.reduce((acc, c) => {
      const loc = c.location.split(",")[0].trim();
      acc[loc] = (acc[loc] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, complaints]) => ({ name, complaints }))
    .sort((a, b) => b.complaints - a.complaints);

  const stats = [
    { label: "Total Complaints", value: total, icon: <AlertTriangle className="h-5 w-5" />, color: "text-primary" },
    { label: "Reported", value: reported, icon: <Clock className="h-5 w-5" />, color: "text-info" },
    { label: "In Progress", value: inProgress, icon: <TrendingUp className="h-5 w-5" />, color: "text-warning" },
    { label: "Resolved", value: resolved, icon: <CheckCircle className="h-5 w-5" />, color: "text-success" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">Admin Analytics</h2>
          <p className="text-sm text-muted-foreground">Campus maintenance overview</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <div className={`mx-auto mb-2 ${s.color}`}>{s.icon}</div>
                  <p className="text-3xl font-display font-bold text-card-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-base">Issues by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3} dataKey="value" label={({ name }) => name}>
                      {categoryData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="font-display text-base">Problem Zones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={locationData} layout="vertical">
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="complaints" fill="hsl(174,62%,32%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
