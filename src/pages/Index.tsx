import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Dashboard from "@/components/Dashboard";
import RewardsSection from "@/components/RewardsSection";
import ProfileSection from "@/components/ProfileSection";
import PaymentSuccess from "@/components/PaymentSuccess";
import { payBill } from "@/services/api";

interface IndexProps {
  user: any;
  onLogout: () => void;
}

const initialCards = [
  { id: 1, name: "Rahul Sharma", number: "•••• •••• •••• 4521", expiry: "12/27", type: "VISA Platinum", dueDate: "Apr 15, 2026", amountDue: 12450, isPaid: false },
  { id: 2, name: "Rahul Sharma", number: "•••• •••• •••• 8834", expiry: "08/28", type: "Mastercard Gold", dueDate: "Apr 20, 2026", amountDue: 8200, isPaid: false },
  { id: 3, name: "Rahul Sharma", number: "•••• •••• •••• 3367", expiry: "03/26", type: "AMEX Black", dueDate: "Apr 10, 2026", amountDue: 25600, isPaid: true },
];

const Index = ({ user, onLogout }: IndexProps) => {
  const [activeSection, setActiveSection] = useState("home");
  const [cards, setCards] = useState(initialCards);
  const [rewardPoints, setRewardPoints] = useState(user?.rewardPoints || 1250);
  const [creditScore, setCreditScore] = useState(user?.creditScore || 742);
  const [balance, setBalance] = useState(user?.balance || 10000);
  const [paymentModal, setPaymentModal] = useState<{ isOpen: boolean; amount: number; points: number }>({
    isOpen: false,
    amount: 0,
    points: 0,
  });
  const [error, setError] = useState("");

  const handlePayBill = async (cardId: number) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isPaid) return;

    try {
      const res = await payBill(card.amountDue);
      
      setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, isPaid: true } : c)));
      setRewardPoints(res.data.rewardPoints);
      setCreditScore(res.data.creditScore);
      setBalance(res.data.balance);
      setPaymentModal({ isOpen: true, amount: card.amountDue, points: res.data.pointsEarned });
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Payment failed");
    }
  };

  const handleRedeem = (cost: number) => {
    setRewardPoints((prev) => prev - cost);
  };

  const billsPaid = cards.filter((c) => c.isPaid).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} onLogout={onLogout} />

      {error && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-destructive text-white px-6 py-3 rounded-xl shadow-lg">
          {error}
        </div>
      )}

      {activeSection === "home" && <HeroSection onGetStarted={() => setActiveSection("dashboard")} />}
      {activeSection === "dashboard" && (
        <Dashboard cards={cards} rewardPoints={rewardPoints} creditScore={creditScore} balance={balance} onPayBill={handlePayBill} />
      )}
      {activeSection === "rewards" && <RewardsSection points={rewardPoints} onRedeem={handleRedeem} />}
      {activeSection === "profile" && (
        <ProfileSection creditScore={creditScore} rewardPoints={rewardPoints} billsPaid={billsPaid} user={user} />
      )}

      <PaymentSuccess
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal((prev) => ({ ...prev, isOpen: false }))}
        amount={paymentModal.amount}
        pointsEarned={paymentModal.points}
      />
    </div>
  );
};

export default Index;