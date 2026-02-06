import Header from "./_components/Header";
import Hero from "./_components/Hero";
import BentoGrid from "./_components/BentoGrid";
import CallToAction from "./_components/CallToAction";
import Footer from "./_components/Footer";

export default function Home() {
  return (
   <div className="bg-slate-50 min-h-screen">
      <Header />
      <Hero />
      <BentoGrid />
      <CallToAction />
      <Footer />
   </div>
  );
}
