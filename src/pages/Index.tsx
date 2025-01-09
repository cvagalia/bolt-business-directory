import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <img src="/png-coat-of-arms.png" alt="PNG Coat of Arms" className="h-32 mb-8 mx-auto" />
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            GovTrack PNG
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Transparent Government Spending for Papua New Guinea
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-5xl">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Budget Tracking
            </h3>
            <p className="text-gray-600">
              Monitor government spending and budget allocations in real-time
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Project Updates
            </h3>
            <p className="text-gray-600">
              Stay informed about ongoing government projects and their progress
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Department Reports
            </h3>
            <p className="text-gray-600">
              Access detailed reports from various government departments
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Join GovTrack PNG Today
          </h2>
          <p className="text-gray-600 mb-6">
            Get access to detailed insights about government spending and projects
          </p>
          {user ? (
            <div className="space-y-4">
              <p className="text-green-600 font-medium">Welcome, {user.email}</p>
              <Button 
                variant="default" 
                size="lg" 
                className="w-full md:w-auto"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" size="lg">
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <AuthModal />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="lg">
                    Register
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <AuthModal defaultIsLogin={false} />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600">
          <p>© 2024 GovTrack PNG. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
