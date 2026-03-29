import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Dashboard from "@/components/Dashboard";
import RewardsSection from "@/components/RewardsSection";
import ProfileSection from "@/components/ProfileSection";
import PaymentSuccess from "@/components/PaymentSuccess";

const initialCards = [
  { id: 1, name: "Rahul Sharma", number: "•••• •••• •••• 4521", expiry: "12/27", type: "VISA Platinum", dueDate: "Apr 15, 2026", amountDue: 12450, isPaid: false },
  { id: 2, name: "Rahul Sharma", number: "•••• •••• •••• 8834", expiry: "08/28", type: "Mastercard Gold", dueDate: "Apr 20, 2026", amountDue: 8200, isPaid: false },
  { id: 3, name: "Rahul Sharma", number: "•••• •••• •••• 3367", expiry: "03/26", type: "AMEX Black", dueDate: "Apr 10, 2026", amountDue: 25600, isPaid: true },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [cards, setCards] = useState(initialCards);
  const [rewardPoints, setRewardPoints] = useState(1250);
  const [creditScore, setCreditScore] = useState(742);
  const [paymentModal, setPaymentModal] = useState<{ isOpen: boolean; amount: number; points: number }>({
    isOpen: false,
    amount: 0,
    points: 0,
  });

  const handlePayBill = (cardId: number) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isPaid) return;

    const pointsEarned = Math.floor(card.amountDue * 0.1);

    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, isPaid: true } : c)));
    setRewardPoints((prev) => prev + pointsEarned);
    setCreditScore((prev) => Math.min(900, prev + 15));
    setPaymentModal({ isOpen: true, amount: card.amountDue, points: pointsEarned });
  };

  const handleRedeem = (cost: number) => {
    setRewardPoints((prev) => prev - cost);
  };

  const billsPaid = cards.filter((c) => c.isPaid).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection={activeSection} onNavigate={setActiveSection} />

      {activeSection === "home" && <HeroSection onGetStarted={() => setActiveSection("dashboard")} />}
      {activeSection === "dashboard" && (
        <Dashboard cards={cards} rewardPoints={rewardPoints} creditScore={creditScore} onPayBill={handlePayBill} />
      )}
      {activeSection === "rewards" && <RewardsSection points={rewardPoints} onRedeem={handleRedeem} />}
      {activeSection === "profile" && (
        <ProfileSection creditScore={creditScore} rewardPoints={rewardPoints} billsPaid={billsPaid} />
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
