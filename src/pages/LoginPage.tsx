import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, GraduationCap, HardHat, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import type { UserRole } from "@/lib/mock-data";

const roles: { role: UserRole; label: string; description: string; icon: React.ReactNode; path: string }[] = [
  {
    role: "student",
    label: "Student",
    description: "Submit & track complaints",
    icon: <GraduationCap className="h-8 w-8" />,
    path: "/dashboard",
  },
  {
    role: "staff",
    label: "Maintenance Staff",
    description: "Manage assigned tasks",
    icon: <HardHat className="h-8 w-8" />,
    path: "/staff",
  },
  {
    role: "admin",
    label: "Administrator",
    description: "Analytics & oversight",
    icon: <ShieldCheck className="h-8 w-8" />,
    path: "/admin",
  },
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: UserRole, path: string) => {
    login(role);
    navigate(path);
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-accent mb-4">
          <Wrench className="h-8 w-8 text-accent-foreground" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
          CampusFix
        </h1>
        <p className="text-primary-foreground/70 text-lg max-w-md">
          Smart campus maintenance management for modern institutions
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-3 w-full max-w-2xl">
        {roles.map((r, i) => (
          <motion.div
            key={r.role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <Card className="group hover:shadow-elevated transition-all border-border/30 bg-card/95 backdrop-blur">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {r.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-card-foreground">{r.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{r.description}</p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleLogin(r.role, r.path)}
                >
                  Sign In
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <p className="text-primary-foreground/40 text-xs mt-8">
        Demo mode — select a role to explore
      </p>
    </div>
  );
}
