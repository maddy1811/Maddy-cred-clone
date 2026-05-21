import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, Sparkles } from "lucide-react";

interface PaymentSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  pointsEarned: number;
}

const PaymentSuccess = ({ isOpen, onClose, amount, pointsEarned }: PaymentSuccessProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-card rounded-2xl p-8 max-w-sm w-full text-center relative glow-gold"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <CheckCircle size={64} className="text-green-400 mx-auto mb-4" />
            </motion.div>

            <h3 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-6">
              ₹{amount.toLocaleString()} has been paid successfully
            </p>

            <div className="glass-card rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2">
                <Sparkles size={18} className="text-primary" />
                <span className="text-lg font-bold gold-text">+{pointsEarned} points earned!</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Reward points added to your account
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full gold-gradient py-3 rounded-xl font-semibold text-primary-foreground hover:scale-[1.02] transition-transform"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentSuccess;
