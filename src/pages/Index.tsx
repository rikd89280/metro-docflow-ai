import { useState } from "react";
import { Login } from "@/components/Login";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const handleLogin = (role: string) => {
    setCurrentUser(role);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (currentUser) {
    return <Dashboard userRole={currentUser} onLogout={handleLogout} />;
  }

  return <Login onLogin={handleLogin} />;
};

export default Index;