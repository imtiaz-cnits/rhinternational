import { Building2 } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

const DubaiOffice = () => (
  <ServicePageLayout
    title="Dubai Office"
    subtitle="UAE Operations"
    description="Strategic business presence in Dubai providing corporate services, trade facilitation, and market entry support for companies looking to establish operations in the UAE."
    icon={Building2}
    features={[
      { title: "Company Formation", description: "End-to-end company registration and licensing in Dubai free zones and mainland jurisdictions." },
      { title: "Trade Facilitation", description: "Import/export facilitation, trade documentation, and logistics coordination through Dubai's strategic hub." },
      { title: "Business Services", description: "Virtual office, PRO services, visa processing, and corporate banking setup for seamless operations." },
      { title: "Market Advisory", description: "Local market intelligence, partnership identification, and business development support in the GCC region." },
    ]}
    highlights={[
      "Established presence in Dubai",
      "Deep knowledge of UAE business regulations",
      "Strong local network and partnerships",
      "Multi-lingual support team",
    ]}
  />
);

export default DubaiOffice;
