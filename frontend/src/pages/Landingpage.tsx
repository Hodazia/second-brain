import { Features } from "../components/Features";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { Footer } from "../components/Footer";
import { ThemeToggle } from "../components/ThemeToggle";
const Landingpage = () =>{ 
    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-background via-accent/40 to-card">
            <ThemeToggle />
            <Hero />
            <Features />
            <HowItWorks />
            <Footer />
        </div>
        </>
    )
}

export default Landingpage;