import { Features } from "../components/Features";
import { Hero } from "../components/Hero";

const Landingpage = () =>{ 
    return (
        <>
        <div className="min-h-screen bg-gradient-to-br f
        rom-[hsl(var(--hero-gradient-from))]
         via-[hsl(var(--hero-gradient-via))] 
         to-[hsl(var(--hero-gradient-to))]">
            <Hero />
            <Features />
        </div>
        </>
    )
}

export default Landingpage;