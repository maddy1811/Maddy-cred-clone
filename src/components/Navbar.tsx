import { motion } from "framer-motion";
import { CreditCard, Gift, BarChart3, User, LogOut } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onLogout: () => void;
}

const Navbar = ({ activeSection, onNavigate, onLogout }: NavbarProps) => {
  const navItems = [
    { id: "home", label: "Home", icon: CreditCard },
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "rewards", label: "Rewards", icon: Gift },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">C</span>
          </div>
          <span className="font-display text-xl font-bold gold-text">CRED</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon size={16} />
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 gold-gradient rounded-full"
                  />
                )}
              </button>
            );
          })}
          <button
            onClick={onLogout}
            className="ml-4 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div className="md:hidden flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`p-2 rounded-lg transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon size={20} />
              </button>
            );
          })}
          <button onClick={onLogout} className="p-2 rounded-lg text-muted-foreground hover:text-destructive">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;