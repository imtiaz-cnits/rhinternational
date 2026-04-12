import { ShoppingCart } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const DigitalService = () => (
  <ServicePageLayout
    title="Digital Service & E-commerce"
    subtitle="Service Consultation"
    description="Full-spectrum digital transformation and e-commerce solutions — from strategy consultation to platform development, marketing, and ongoing optimization."
    icon={ShoppingCart}
    features={[
      { title: "E-commerce Development", description: "Custom online store development with payment integration, inventory management, and analytics dashboards." },
      { title: "Digital Marketing", description: "SEO, social media management, paid advertising, and content strategy to drive traffic and conversions." },
      { title: "Service Consultation", description: "Business process analysis and digital strategy roadmaps tailored to your industry and growth goals." },
      { title: "Platform Management", description: "Ongoing platform maintenance, performance optimization, and feature development to keep you competitive." },
    ]}
    highlights={[
      "Data-driven strategies for measurable results",
      "Multi-platform e-commerce expertise",
      "Conversion optimization specialists",
      "Ongoing analytics and reporting",
    ]}
  />
);

export default DigitalService;
