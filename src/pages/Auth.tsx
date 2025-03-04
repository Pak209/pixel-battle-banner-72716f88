import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Auth() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (!emailOrUsername.includes('@')) {
          throw new Error("Please provide a valid email address for signup");
        }

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: emailOrUsername,
          password,
          options: {
            data: {
              username,
            },
          },
        });

        if (signUpError) throw signUpError;

        if (signUpData.user) {
          toast({
            title: "Account created!",
            description: "Please proceed to mint your first Holobot.",
          });
          
          navigate('/mint');
        }
      } else {
        let loginEmail = emailOrUsername;

        // If input is not an email, try to find the associated email
        if (!emailOrUsername.includes('@')) {
          console.log("Attempting to login with username:", emailOrUsername);
          
          // Look for user in the users table by wallet_address
          const { data: users, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('wallet_address', emailOrUsername);

          if (userError) {
            console.error("User lookup error:", userError);
            throw new Error("Error looking up username");
          }

          // Check if any users were found
          if (!users || users.length === 0) {
            console.error("No user found for username:", emailOrUsername);
            throw new Error("Username not found. Please check your credentials.");
          }

          // Use the username as part of a deterministic email
          loginEmail = `${emailOrUsername.toLowerCase()}@holobots.com`;
        }

        console.log("Attempting login with email:", loginEmail);

        const { data, error } = await supabase.auth.signInWithPassword({
          email: loginEmail,
          password,
        });

        if (error) {
          console.error("Login error:", error);
          if (error.message === "Invalid login credentials") {
            throw new Error("Invalid username/email or password");
          }
          throw error;
        }

        if (data.user) {
          console.log("Login successful, checking profile...");
          
          // Check user tokens in the users table
          const { data: userTokens, error: userError } = await supabase
            .from('users')
            .select('tokens')
            .eq('wallet_address', data.user.id)
            .single();

          if (userError) {
            console.error("User fetch error:", userError);
            throw new Error("Error fetching user profile");
          }

          console.log("Profile checked, navigating...");
          
          if (!userTokens || userTokens.tokens === null) {
            navigate('/mint');
          } else {
            navigate('/');
          }
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication Error",
        description: error instanceof Error ? error.message : "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-holobots-background dark:bg-holobots-dark-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-holobots-text dark:text-holobots-dark-text">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-holobots-text/60 dark:text-holobots-dark-text/60">
            {isSignUp ? "Sign up to start your journey" : "Sign in to continue"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full"
                placeholder="Choose a username"
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">
              {isSignUp ? "Email" : "Email or Username"}
            </label>
            <Input
              type={isSignUp ? "email" : "text"}
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
              className="w-full"
              placeholder={isSignUp ? "Enter your email" : "Enter your email or username"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
              placeholder="Enter your password"
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-holobots-accent hover:bg-holobots-hover"
            disabled={loading}
          >
            {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Button
            variant="link"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-holobots-accent hover:text-holobots-hover"
          >
            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </Button>
        </div>
      </div>
    </div>
  );
}
