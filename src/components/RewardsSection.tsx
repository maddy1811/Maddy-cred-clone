import { motion } from "framer-motion";
import { Gift, Coffee, ShoppingBag, Plane, Ticket, Sparkles } from "lucide-react";
import { useState } from "react";

interface RewardsSectionProps {
  points: number;
  onRedeem: (cost: number) => void;
}

const rewards = [
  { id: 1, name: "Amazon Voucher", description: "₹500 gift card", cost: 500, icon: ShoppingBag },
  { id: 2, name: "Starbucks Coffee", description: "Free grande drink", cost: 200, icon: Coffee },
  { id: 3, name: "Flight Discount", description: "₹2000 off flights", cost: 2000, icon: Plane },
  { id: 4, name: "Movie Tickets", description: "2 premium tickets", cost: 300, icon: Ticket },
  { id: 5, name: "Mystery Box", description: "Surprise reward!", cost: 1000, icon: Sparkles },
  { id: 6, name: "Shopping Spree", description: "₹1000 store credit", cost: 1500, icon: Gift },
];

const RewardsSection = ({ points, onRedeem }: RewardsSectionProps) => {
  const [redeemed, setRedeemed] = useState<number[]>([]);

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (points >= reward.cost && !redeemed.includes(reward.id)) {
      onRedeem(reward.cost);
      setRedeemed((prev) => [...prev, reward.id]);
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Rewards</h2>
          <p className="text-muted-foreground mb-8">Redeem your points for exclusive rewards</p>
        </motion.div>

        {/* Points balance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-8 mb-10 text-center glow-gold"
        >
          <Gift size={32} className="text-primary mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-1">Available Points</p>
          <p className="text-5xl font-bold gold-text">{points.toLocaleString()}</p>
        </motion.div>

        {/* Rewards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rewards.map((reward, i) => {
            const Icon = reward.icon;
            const isRedeemed = redeemed.includes(reward.id);
            const canAfford = points >= reward.cost;

            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-secondary">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-primary">{reward.cost} pts</span>
                </div>
                <h4 className="font-semibold text-foreground mb-1">{reward.name}</h4>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{reward.description}</p>
                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={!canAfford || isRedeemed}
                  className={`w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                    isRedeemed
                      ? "bg-green-900/30 text-green-400 cursor-default"
                      : canAfford
                      ? "gold-gradient text-primary-foreground hover:scale-[1.02]"
                      : "bg-secondary text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {isRedeemed ? "✓ Redeemed" : canAfford ? "Redeem" : "Not enough points"}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RewardsSection;
