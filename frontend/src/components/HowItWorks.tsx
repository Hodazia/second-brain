import { UserPlus, PlusCircle, Tags, Share2 } from "lucide-react";
import { Button } from "../components/ui/button";

// define few steps for it
const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Sign Up",
    description: "Create your free account in seconds. No credit card required.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: PlusCircle,
    number: "02", 
    title: "Add Content",
    description: "Capture links, notes, and ideas with our intuitive interface.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Tags,
    number: "03",
    title: "Organize",
    description: "Tag and categorize your knowledge for easy discovery.",
    color: "from-green-500 to-teal-500"
  },
  {
    icon: Share2,
    number: "04",
    title: "Share",
    description: "Generate shareable links to showcase your expertise.",
    color: "from-orange-500 to-red-500"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[hsl(var(--features-bg))] to-background">
      <div className="mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {/*if the above crosses the max-width , then it will go the new line */}
            Get started with BrainVault in minutes. Our streamlined process makes knowledge management effortless.
          </p>
        </div>

        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 ">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                {/* Connection line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 
                  bg-gradient-to-r from-border to-transparent 
                  transform -translate-y-1/2 z-0"></div>
                )}
                
                {/* Step icon */}
                {/*can try this one as well
                      <div className="relative left-10 bottom-20 mx-auto w-20 h-20 rounded-full bg-card shadow-xl 
                                flex items-center justify-center group-hover:scale-110 
                                transition-transform duration-300 border border-border">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 
                        w-[80px] h-[80px] flex items-center justify-center rounded-full">
                            <UserPlus className="text-white border rounded-full w-[40px] h-[40px]"/>
                        </div>
                    </div>

                */}
                <div className="relative z-10 mx-auto w-20 h-20 rounded-full bg-card shadow-2xl 
                flex items-center justify-center group-hover:scale-110 
                transition-transform duration-300 border border-border">

                    {/*now the below element is once again wrapped inside a div, 
                    which is again a rectangular box with custom css properties like
                    rounded to make it apear like circle, flex ,  */}
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} 
                  flex items-center justify-center`}>
                    {/*the icon(svg) is wrapped inside a div with w-16 h-16 and it gets rounded 
                    the container div has a linear background-gradient which changes via the map
                    function step.color, 
                    
                    */}
                    <step.icon className="w-9 h-9 text-yellow-100" />
                  </div>
                </div>
                
                {/* Step number */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-foreground text-background 
                rounded-full flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
              </div>

              {/*title section */}
              <h3 className="text-xl font-bold text-foreground mb-4">
                {step.title}
              </h3>
              
              {/*description section */}
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 
            hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg 
            font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 
            transition-all duration-300 transform hover:scale-105 hover:translate-x-3"
          >
            Start Building Your Brain
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            Free forever. No credit card required.
          </p>
        </div>
      </div>




    </section>
  );
};
