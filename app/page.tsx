import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Services from "./components/Services";
import Trust from "./components/Trust";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Services />
        <Trust />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
