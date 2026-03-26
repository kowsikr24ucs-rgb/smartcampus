import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { locations, categoryLabels, categoryIcons } from "@/lib/mock-data";
import type { ComplaintCategory } from "@/lib/mock-data";
import { Camera, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function NewComplaint() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ComplaintCategory | "">("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category || !location) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Complaint submitted successfully!", {
      description: "You'll receive updates on your complaint status.",
    });
    navigate("/dashboard");
  };

  return (
    <AppLayout>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="font-display text-xl">Submit a Complaint</CardTitle>
            <p className="text-sm text-muted-foreground">Report an infrastructure issue on campus</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title</Label>
                <Input id="title" placeholder="Brief description of the issue" value={title} onChange={e => setTitle(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={(v) => setCategory(v as ComplaintCategory)}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {(Object.keys(categoryLabels) as ComplaintCategory[]).map(key => (
                        <SelectItem key={key} value={key}>
                          {categoryIcons[key]} {categoryLabels[key]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
                    <SelectContent>
                      {locations.map(loc => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" placeholder="Provide details about the issue..." rows={4} value={description} onChange={e => setDescription(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Photo/Video Evidence</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG, MP4 up to 10MB</p>
                </div>
              </div>

              <Button type="submit" className="w-full gap-2" size="lg">
                <Send className="h-4 w-4" /> Submit Complaint
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </AppLayout>
  );
}
