import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { LogOut, Wrench, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = {
  student: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "New Complaint", path: "/new-complaint" },
    { label: "My Complaints", path: "/my-complaints" },
  ],
  staff: [
    { label: "Dashboard", path: "/staff" },
    { label: "Assigned Tasks", path: "/staff" },
  ],
  admin: [
    { label: "Analytics", path: "/admin" },
    { label: "All Complaints", path: "/admin" },
  ],
};

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  const items = navItems[user.role];

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-hero text-primary-foreground sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary/20 flex items-center justify-center">
              <Wrench className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold leading-none">CampusFix</h1>
              <p className="text-xs opacity-70 capitalize">{user.role} Portal</p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary-foreground/15"
                    : "hover:bg-primary-foreground/10 opacity-80"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs opacity-70">{user.email}</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => { logout(); navigate("/"); }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden border-t border-primary-foreground/10 px-4 py-2 space-y-1">
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => { navigate(item.path); setMenuOpen(false); }}
                className="block w-full text-left px-3 py-2 rounded-md text-sm hover:bg-primary-foreground/10"
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
