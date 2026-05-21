import { useState } from "react";
import { motion } from "framer-motion";
import { login, signup } from "@/services/api";

interface LoginProps {
  onLogin: (user: any, token: string) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const res = isSignup
        ? await signup({ name, email, password })
        : await login({ email, password });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      onLogin(res.data.user, res.data.token);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-2xl w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center">
            <span className="text-black font-bold text-lg">C</span>
          </div>
          <span className="font-display text-2xl font-bold gold-text">CRED</span>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          {isSignup ? "Join the creditworthy community" : "Sign in to your CRED account"}
        </p>

        {/* Demo credentials */}
        {!isSignup && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4 text-sm text-center">
            <span className="text-primary font-medium">Demo: </span>
            <span className="text-muted-foreground">madhav@test.com / madhav1234</span>
          </div>
        )}

        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-secondary border border-border rounded-xl px-4 py-3 mb-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-secondary border border-border rounded-xl px-4 py-3 mb-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-secondary border border-border rounded-xl px-4 py-3 mb-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
        />

        {error && (
          <p className="text-destructive text-sm mb-4 text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full gold-gradient py-3 rounded-xl font-semibold text-black transition-all hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Please wait..." : isSignup ? "Create Account" : "Sign In"}
        </button>

        <p className="text-center text-muted-foreground text-sm mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-primary hover:underline font-medium"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;