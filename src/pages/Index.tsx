import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import CTASection from "@/components/sections/CTASection";
import FAQSection from "@/components/sections/FAQSection";
import GlobalPresenceSection from "@/components/sections/GlobalPresenceSection";
import HeroSection from "@/components/sections/HeroSection";
import PartnersSection from "@/components/sections/PartnersSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import { lazy, Suspense } from "react";

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
