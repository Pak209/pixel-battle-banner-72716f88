
import { Button } from "@/components/ui/button";
import { ArrowRight, Twitter, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import WordCycler from "@/components/WordCycler";
import { Characters } from "@/components/Characters";
import BackgroundEffect from "@/components/BackgroundEffect";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { supabase } from "@/integrations/supabase/client";

const Landing = () => {
  const [api, setApi] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Check if user has minted
        const { data: profile } = await supabase
          .from('profiles')
          .select('holos_tokens')
          .eq('id', user.id)
          .single();

        if (profile && profile.holos_tokens !== null) {
          navigate('/');
        } else {
          navigate('/mint');
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const autoplayOptions = {
    delay: 3000,
    rootNode: (emblaRoot: any) => emblaRoot.parentElement,
  };

  const handleLaunchApp = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/5 relative overflow-hidden">
      <BackgroundEffect />
      <nav className="fixed top-0 w-full p-4 flex justify-between items-center z-50 bg-background/80 backdrop-blur-sm">
        <div className="text-2xl font-bold italic tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-holobots-accent to-holobots-hover">
          HOLOBOTS
        </div>
        <div className="flex gap-4">
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Features</Button>
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={handleLaunchApp}
          >
            Launch App
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="pt-32 text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Welcome to Holobots Battle Arena
          </h1>
        </div>

        {/* Discover/Collect Section */}
        <div className="grid lg:grid-cols-[1fr_250px] gap-8 md:gap-12 items-start mb-16 px-4 md:px-0">
          <div className="space-y-6 md:space-y-8">
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">
              Discover, Collect &{" "}
              <span className="block mt-2">
                <WordCycler 
                  words={["Train", "Battle", "Quest", "Win!"]} 
                  interval={2000}
                />
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl">
              Join the next generation of digital asset staking. Earn rewards while holding unique NFTs in the Holobots ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-primary hover:bg-primary/90 px-4 md:px-8 py-4 md:py-6 text-base md:text-lg w-full sm:w-auto"
                onClick={handleLaunchApp}
              >
                Create Account to Mint Holobots
                <ArrowRight className="ml-2" />
              </Button>
              <div className="flex gap-2 justify-center sm:justify-start">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="relative">
            <Carousel 
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay(autoplayOptions)
              ]}
              setApi={setApi}
              className="w-full max-w-[250px]"
            >
              <CarouselContent>
                <CarouselItem>
                  <div className="p-1">
                    <img
                      src="/lovable-uploads/60586301-1d5a-471c-92b8-72e2d0f7c311.png"
                      alt="Shadow Holobot"
                      className="w-full h-auto rounded-lg object-contain"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <img
                      src="/lovable-uploads/ec4c76d2-330e-4a83-8252-ff1ff19962e8.png"
                      alt="Kuma Holobot"
                      className="w-full h-auto rounded-lg object-contain"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-1">
                    <img
                      src="/lovable-uploads/a8cd74c8-4e2e-4f29-8b1c-913657f0ae03.png"
                      alt="Ace Holobot"
                      className="w-full h-auto rounded-lg object-contain"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </div>

        {/* Character Info Section */}
        <Characters />
      </main>
    </div>
  );
};

export default Landing;
