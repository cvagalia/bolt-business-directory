import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthModal } from "./auth/AuthModal";
import { useState } from "react";

export function Navbar() {
  const { user, signOut, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
    <nav className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
          <div className="hidden md:flex items-center space-x-4">
            <img src="/png-coat-of-arms.png" alt="PNG Coat of Arms" className="h-8" />
            <h1 className="text-xl font-semibold text-primary">GovTrack PNG</h1>
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.email}</span>
              <Button variant="outline" onClick={handleSignOut} disabled={isLoggingOut}>
                {isLoggingOut ? "Logging out..." : "Sign Out"}
              </Button>
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Login</Button>
              </DialogTrigger>
              <DialogContent>
                <AuthModal />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </nav>
  );
}
