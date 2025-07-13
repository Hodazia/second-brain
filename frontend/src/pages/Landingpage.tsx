import { Features } from "../components/Features";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";

const Landingpage = () =>{ 
    return (
        <>
        <div className="min-h-screen bg-gradient-to-br f
        rom-[hsl(var(--hero-gradient-from))]
         via-[hsl(var(--hero-gradient-via))] 
         to-[hsl(var(--hero-gradient-to))]">
            <Hero />
            <Features />
            <HowItWorks />
        </div>
        </>
    )
}

export default Landingpage;