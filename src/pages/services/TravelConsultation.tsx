import { Plane } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const TravelConsultation = () => (
  <ServicePageLayout
    title="Travel Consultation"
    subtitle="Portugal · Spain · Denmark"
    description="Expert travel and immigration consultation for European destinations, providing visa guidance, documentation support, and relocation assistance for Portugal, Spain, and Denmark."
    icon={Plane}
    features={[
      { title: "Portugal Immigration", description: "Golden Visa, D7 Visa, and residency permit guidance with complete documentation and legal support." },
      { title: "Spain Consultation", description: "Non-lucrative visa, student visa, and work permit applications with step-by-step guidance." },
      { title: "Denmark Services", description: "Work permit, family reunification, and student visa processing with Danish immigration expertise." },
      { title: "Document Preparation", description: "Complete document preparation, translation, and attestation services for all European visa applications." },
    ]}
    highlights={[
      "High visa approval success rate",
      "Personalized consultation for each case",
      "Post-arrival settlement support",
      "Transparent pricing with no hidden fees",
    ]}
  />
);

export default TravelConsultation;
