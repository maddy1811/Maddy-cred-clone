import { motion } from "framer-motion";
import { TrendingUp, CreditCard, Gift, Calendar } from "lucide-react";
import CreditCardDisplay from "./CreditCardDisplay";

interface DashboardProps {
  cards: Array<{
    id: number;
    name: string;
    number: string;
    expiry: string;
    type: string;
    dueDate: string;
    amountDue: number;
    isPaid: boolean;
  }>;
  rewardPoints: number;
  creditScore: number;
  onPayBill: (id: number) => void;
}

const Dashboard = ({ cards, rewardPoints, creditScore, onPayBill }: DashboardProps) => {
  const totalDue = cards.filter((c) => !c.isPaid).reduce((sum, c) => sum + c.amountDue, 0);
  const paidCount = cards.filter((c) => c.isPaid).length;

  const stats = [
    { label: "Total Due", value: `₹${totalDue.toLocaleString()}`, icon: CreditCard, accent: true },
    { label: "Credit Score", value: creditScore.toString(), icon: TrendingUp },
    { label: "Reward Points", value: rewardPoints.toLocaleString(), icon: Gift },
    { label: "Bills Paid", value: `${paidCount}/${cards.length}`, icon: Calendar },
  ];

  return (
    <section className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground mb-8">Manage your credit cards & payments</p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-5"
              >
                <Icon size={20} className={stat.accent ? "text-primary mb-3" : "text-muted-foreground mb-3"} />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Credit Score gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-8 mb-10 flex flex-col items-center"
        >
          <h3 className="text-lg font-semibold mb-6">Credit Score</h3>
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
              <circle
                cx="100" cy="100" r="85"
                fill="none"
                stroke="hsl(0, 0%, 15%)"
                strokeWidth="12"
              />
              <circle
                cx="100" cy="100" r="85"
                fill="none"
                stroke="url(#goldGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${(creditScore / 900) * 534} 534`}
              />
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(43, 96%, 56%)" />
                  <stop offset="100%" stopColor="hsl(35, 100%, 45%)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold gold-text">{creditScore}</span>
              <span className="text-xs text-muted-foreground mt-1">out of 900</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            {creditScore >= 750 ? "Excellent" : creditScore >= 650 ? "Good" : "Fair"} credit score
          </p>
        </motion.div>

        {/* Cards grid */}
        <h3 className="text-xl font-semibold mb-4">Your Cards</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <CreditCardDisplay key={card.id} card={card} index={i} onPay={onPayBill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
