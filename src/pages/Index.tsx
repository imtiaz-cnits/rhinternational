import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PartnersSection from "@/components/sections/PartnersSection";
import GlobalPresenceSection from "@/components/sections/GlobalPresenceSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

const GlobeBackground = lazy(() => import("@/components/GlobeBackground"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Suspense fallback={null}>
        <GlobeBackground />
      </Suspense>
      <div className="fixed inset-0 mesh-gradient pointer-events-none z-[1]" />
      <Navbar />
      <HeroSection />


      <PartnersSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <GlobalPresenceSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
