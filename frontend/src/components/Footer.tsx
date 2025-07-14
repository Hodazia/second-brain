
import { Brain, Twitter, Github, Mail, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
export const Footer = () => {

  const navigate = useNavigate();
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo and description */}
          {/*so divide it into 4 grids, but the first gird takes 2 columns size */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">BrainVault</span>
            </div>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              Transform your scattered thoughts into an organized digital brain. 
              Capture, connect, and share your knowledge with the world.
            </p>
            
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="hover:bg-accent">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-accent">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-accent">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* second grid => Product links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Product</h4>
            <div className="space-y-3">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Roadmap</a>
            </div>
          </div>

          {/* Third grid => Company links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <div className="space-y-3">
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">About Us</a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>

        {/*Fouth grid =>  Final CTA section */}
        <div className="border-t border-border pt-12 mb-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Ready to Build Your Digital Brain?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of knowledge creators who are already organizing and sharing their expertise with BrainVault.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/signup')}
            >
              Get Started Free
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 BrainVault. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1 mt-2">
            Made with 
            <Heart className="w-8 h-8 text-pink-500"/>  
            by Ziaul Hoda
          </p>
        </div>
      </div>


    </footer>
  );
};
