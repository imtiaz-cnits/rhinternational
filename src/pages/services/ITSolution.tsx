import { Monitor } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const ITSolution = () => (
  <ServicePageLayout
    title="IT Solution"
    subtitle="Technology Consulting"
    description="Comprehensive IT solutions spanning software development, cloud infrastructure, cybersecurity, and digital transformation for businesses of all scales."
    icon={Monitor}
    features={[
      { title: "Software Development", description: "Custom web and mobile application development using modern frameworks and agile methodologies." },
      { title: "Cloud & Infrastructure", description: "Cloud migration, hosting solutions, and infrastructure management for optimal performance and scalability." },
      { title: "Cybersecurity", description: "Security audits, threat assessment, and implementation of robust security protocols to protect your digital assets." },
      { title: "IT Consulting", description: "Strategic technology advisory services to align your IT investments with business objectives." },
    ]}
    highlights={[
      "Experienced team of engineers and architects",
      "Agile development methodologies",
      "24/7 monitoring and support",
      "Scalable solutions for growing businesses",
    ]}
  />
);

export default ITSolution;
