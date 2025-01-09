import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { DashboardCard } from "@/components/DashboardCard";
import { BudgetChart } from "@/components/BudgetChart";
import {
  BarChart3,
  Building2,
  FileCheck2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Dashboard = () => {
  const { user, signOut, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      // Optionally display an error message to the user
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="container mx-auto p-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">GovTrack PNG Dashboard</h1>
        <div>
          <p className="text-muted-foreground">Welcome back, {user.email}</p>
          <Button variant="outline" onClick={handleSignOut} disabled={isLoggingOut || loading}>
            {isLoggingOut ? "Logging out..." : "Sign Out"}
          </Button>
        </div>
      </div>
      <div className="container mx-auto p-8">
        <div className="flex flex-col gap-8">
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Total Budget"
              value="K20.7M"
              description="+2.1% from last month"
              icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
            />
            <DashboardCard
              title="Active Projects"
              value="149"
              description="23 pending approval"
              icon={<Building2 className="h-4 w-4 text-muted-foreground" />}
            />
            <DashboardCard
              title="Completed Acquittals"
              value="89%"
              description="Last 30 days"
              icon={<FileCheck2 className="h-4 w-4 text-muted-foreground" />}
            />
            <DashboardCard
              title="Pending Reviews"
              value="29"
              description="5 require immediate attention"
              icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          {/* Charts Section */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <BudgetChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
