import { motion } from "framer-motion";
import { Wifi } from "lucide-react";

interface CreditCardProps {
  card: {
    id: number;
    name: string;
    number: string;
    expiry: string;
    type: string;
    dueDate: string;
    amountDue: number;
    isPaid: boolean;
  };
  index: number;
  onPay: (id: number) => void;
}

const CreditCardDisplay = ({ card, index, onPay }: CreditCardProps) => {
  const isGold = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className="space-y-4"
    >
      {/* Card visual */}
      <div
        className={`relative p-6 rounded-2xl overflow-hidden aspect-[1.6/1] flex flex-col justify-between ${
          isGold ? "credit-card-gold" : "credit-card-gradient"
        } border border-glass-border`}
      >
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-foreground/5 -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex justify-between items-start">
          <span className="text-xs font-semibold uppercase tracking-widest text-foreground/60">
            {card.type}
          </span>
          <Wifi size={20} className="text-foreground/40 rotate-90" />
        </div>

        <div>
          <p className="font-mono text-lg tracking-[0.25em] text-foreground/80 mb-3">
            {card.number}
          </p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-0.5">Card Holder</p>
              <p className="text-sm font-medium text-foreground/80">{card.name}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-foreground/40 mb-0.5">Expires</p>
              <p className="text-sm font-medium text-foreground/80">{card.expiry}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bill details */}
      <div className="glass-card rounded-xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Amount Due</span>
          <span className="text-lg font-bold text-foreground">₹{card.amountDue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Due Date</span>
          <span className="text-sm text-foreground">{card.dueDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Status</span>
          <span className={`text-sm font-medium ${card.isPaid ? "text-green-400" : "text-primary"}`}>
            {card.isPaid ? "✓ Paid" : "Pending"}
          </span>
        </div>

        {!card.isPaid && (
          <button
            onClick={() => onPay(card.id)}
            className="w-full mt-2 gold-gradient py-3 rounded-lg font-semibold text-primary-foreground hover:scale-[1.02] transition-transform"
          >
            Pay Now
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CreditCardDisplay;
