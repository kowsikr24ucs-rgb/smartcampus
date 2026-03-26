import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge, PriorityBadge } from "./StatusBadge";
import { categoryIcons, categoryLabels } from "@/lib/mock-data";
import type { Complaint } from "@/lib/mock-data";
import { MapPin, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";

export function ComplaintCard({ complaint, onClick }: { complaint: Complaint; onClick?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="cursor-pointer shadow-card hover:shadow-elevated transition-shadow border-border/60"
        onClick={onClick}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{categoryIcons[complaint.category]}</span>
              <div>
                <p className="text-xs text-muted-foreground font-mono">{complaint.id}</p>
                <h3 className="font-display font-semibold text-card-foreground leading-tight">
                  {complaint.title}
                </h3>
              </div>
            </div>
            <PriorityBadge priority={complaint.priority} />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">{complaint.description}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {complaint.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {new Date(complaint.createdAt).toLocaleDateString()}
            </span>
            {complaint.rating && (
              <span className="flex items-center gap-1 text-accent">
                <Star className="h-3 w-3 fill-accent" /> {complaint.rating}/5
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <StatusBadge status={complaint.status} />
            <span className="text-xs text-muted-foreground">
              {categoryLabels[complaint.category]}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
