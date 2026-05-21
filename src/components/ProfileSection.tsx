import { motion } from "framer-motion";
import { User, Mail, Phone, Shield, Award, CreditCard } from "lucide-react";

interface ProfileSectionProps {
  creditScore: number;
  rewardPoints: number;
  billsPaid: number;
  user: {
    name: string;
    email: string;
    phone?: string;
  };
}

const ProfileSection = ({ creditScore, rewardPoints, billsPaid, user }: ProfileSectionProps) => {
  return (
    <section className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">Profile</h2>
        </motion.div>

        {/* Avatar & name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-8 flex flex-col items-center mb-6"
        >
          <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center mb-4">
            <User size={36} className="text-primary-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground">{user.name}</h3>
          <p className="text-sm text-muted-foreground">CRED Member since 2024</p>
          <div className="flex items-center gap-2 mt-3">
            <Shield size={14} className="text-primary" />
            <span className="text-xs text-primary font-medium">Verified Member</span>
          </div>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 space-y-4 mb-6"
        >
          <div className="flex items-center gap-4">
            <Mail size={18} className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm text-foreground">{user.email}</p>
            </div>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-center gap-4">
            <Phone size={18} className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm text-foreground">{user.phone ?? "Not provided"}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { label: "Credit Score", value: creditScore, icon: Award },
            { label: "Reward Points", value: rewardPoints.toLocaleString(), icon: CreditCard },
            { label: "Bills Paid", value: billsPaid, icon: Shield },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
                <Icon size={18} className="text-primary mx-auto mb-2" />
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProfileSection;