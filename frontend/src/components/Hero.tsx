
import { Brain, ArrowRight, Play } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
// hero section for tha landing page
export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse dark:from-purple-600/20 dark:to-pink-600/20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000 dark:from-blue-600/20 dark:to-cyan-600/20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500 dark:from-indigo-600/10 dark:to-purple-600/10"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/*have added a custom color foreground */}
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-purple-600
         to-foreground bg-clip-text text-transparent mb-6 animate-fade-in">
          Externalize Your Genius.
          <br />
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Share Your Brain.
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto 
        leading-relaxed animate-fade-in-delay">
          Transform scattered thoughts into an organized digital brain. Capture ideas, connect knowledge, and share your unique perspective with the world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white 
            px-8 py-4 text-lg font-semibold rounded-full shadow-2xl 
            hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:translate-x-2"
            onClick={() => navigate('/signup')}
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-border hover:border-purple-300 
            px-8 py-4 text-lg font-semibold rounded-full transition-all 
            duration-300 hover:bg-accent hover:translate-x-2"
          >
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Button>
        </div>

        {/* Stats or social proof */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-muted-foreground">
          {/*there shall be two divs, in row style above sm, and columns style when sm */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Join 10,000+ knowledge creators</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-border"></div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">⭐⭐⭐⭐⭐ Rated 4.8/5</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
