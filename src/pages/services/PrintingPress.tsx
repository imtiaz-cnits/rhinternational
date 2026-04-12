import { Printer } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const PrintingPress = () => (
  <ServicePageLayout
    title="Printing Press"
    subtitle="PVC & Bag Printing"
    description="Industrial-grade PVC and bag printing services with precision machinery, delivering high-volume orders with consistent quality and fast turnaround times."
    icon={Printer}
    features={[
      { title: "PVC Printing", description: "High-quality PVC card, label, and material printing using advanced digital and offset technologies." },
      { title: "Bag Printing", description: "Custom bag printing for retail, industrial, and promotional purposes with vibrant color reproduction." },
      { title: "Bulk Production", description: "Scalable manufacturing capacity to handle large-volume orders while maintaining strict quality control." },
      { title: "Custom Design", description: "In-house design team for creating compelling print materials that align with your brand identity." },
    ]}
    highlights={[
      "State-of-the-art printing machinery",
      "Consistent quality across high-volume runs",
      "Fast turnaround times",
      "Eco-friendly material options available",
    ]}
  />
);

export default PrintingPress;
