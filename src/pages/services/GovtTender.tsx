import { Landmark } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const GovtTender = () => (
  <ServicePageLayout
    title="Govt Tender"
    subtitle="Procurement Solutions"
    description="We provide end-to-end government tender management — from identification and documentation to submission and execution — ensuring compliance and competitive positioning."
    icon={Landmark}
    features={[
      { title: "Tender Identification", description: "Systematic monitoring and identification of relevant government tenders across multiple sectors and departments." },
      { title: "Documentation & Compliance", description: "Meticulous preparation of all required documentation ensuring full regulatory compliance and timely submission." },
      { title: "Bid Strategy", description: "Strategic pricing and proposal development to maximize win probability while maintaining healthy margins." },
      { title: "Project Execution", description: "Complete project management from contract award through delivery, ensuring quality and timeline adherence." },
    ]}
    highlights={[
      "Proven track record with government agencies",
      "Expert compliance and documentation team",
      "Competitive pricing strategies",
      "End-to-end project management",
    ]}
  />
);

export default GovtTender;
