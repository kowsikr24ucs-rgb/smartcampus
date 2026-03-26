import { AppLayout } from "@/components/AppLayout";
import { ComplaintCard } from "@/components/ComplaintCard";
import { mockComplaints } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MyComplaints() {
  const all = mockComplaints;
  const active = all.filter(c => c.status !== "resolved");
  const resolved = all.filter(c => c.status === "resolved");

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">My Complaints</h2>
          <p className="text-sm text-muted-foreground">View your complaint history and status</p>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved ({resolved.length})</TabsTrigger>
            <TabsTrigger value="all">All ({all.length})</TabsTrigger>
          </TabsList>
          {["active", "resolved", "all"].map(tab => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                {(tab === "active" ? active : tab === "resolved" ? resolved : all).map(c => (
                  <ComplaintCard key={c.id} complaint={c} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
}
