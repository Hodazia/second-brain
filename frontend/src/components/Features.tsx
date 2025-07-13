
import { Lightbulb, Link, Share2, Search, Tag, Shield } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card"

const features = [
  {
    icon: Lightbulb,
    title: "Capture Anything",
    description: "From fleeting thoughts to complex ideas, store links, notes, and insights in beautiful, organized cards.",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Link,
    title: "Connect Ideas",
    description: "Tag and organize your knowledge to create meaningful connections between concepts and discoveries.",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    icon: Share2,
    title: "Share with Ease",
    description: "Generate a unique link to share your entire knowledge base with colleagues, students, or the world.",
    gradient: "from-green-500 to-teal-500"
  },
  {
    icon: Search,
    title: "Find Instantly",
    description: "Powerful search and filtering capabilities help you rediscover your insights when you need them most.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Tag,
    title: "Smart Organization",
    description: "Intuitive tagging system automatically suggests connections and helps maintain your digital brain.",
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your thoughts remain private by default. Share only what you choose, when you choose.",
    gradient: "from-red-500 to-pink-500"
  }
];

export const Features = () => {
  return (
    <section className="py-24 px-6 bg-[hsl(var(--features-bg))]">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Your Digital Brain,
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">
              Supercharged
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            BrainVault transforms how you collect, organize, and share knowledge. 
            Say goodbye to scattered bookmarks and forgotten insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-300 border-0 bg-card/60 backdrop-blur-sm hover:bg-card/80 hover:scale-105"
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-muted to-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
