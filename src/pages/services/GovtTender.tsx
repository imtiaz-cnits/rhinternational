import ServicePageLayout from "@/components/ServicePageLayout";
import { Briefcase, Building, CheckCircle2, FileText, Landmark } from "lucide-react";

const GovtTender = () => (
  <ServicePageLayout
    title="Government Tenders"
    subtitle="Precision & Expertise"
    description="End-to-end e-GP management, strategic bidding, and flawless documentation for high-value government projects across major ministries in Bangladesh. We simplify the entire public procurement process for you."
    icon={Landmark}
    features={[
      {
        title: "Comprehensive e-GP Management",
        description: "Complete e-GP profile creation, regular maintenance, and rapid renewal services. We handle the technicalities so you can focus on execution."
      },
      {
        title: "Strategic Bidding (DPM, LTM, OTM)",
        description: "Expert consultancy on selecting the right procurement method. Whether it’s Direct Procurement (DPM), Limited Tendering (LTM), or Open Tendering (OTM), we develop winning strategies tailored to your firm's capacity."
      },
      {
        title: "Specialized Ministry Focus",
        description: "Deep expertise in processing and submitting bids for heavy-budget sectors, including the Ministry of Road Transport and Bridges, the Ministry of Railways, the Ministry of Shipping, and the Ministry of Agriculture."
      },
      {
        title: "Flawless Document Preparation",
        description: "Accurate preparation of Tender Document Setup (TDS), Bill of Quantities (BOQ), and compliance paperwork (TIN, BIN, Trade License, Tax Clearance)."
      },
      {
        title: "Financial & Joint Venture (JV) Support",
        description: "Professional assistance in organizing Liquid Asset certificates, Credit Line formats from banks, and establishing solid Joint Venture Consortium agreements for mega projects."
      }
    ]}
    highlights={[
      "Zero-Error Policy ensuring 100% responsiveness",
      "Time-Critical Execution for on-time submissions",
      "Strict corporate non-disclosure & confidentiality"
    ]}
  >
    {/* Additional Content Section 1: Strategic Bidding */}
    <div className="mt-16 bg-muted/30 p-8 rounded-2xl border border-border">
      <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Briefcase className="w-6 h-6 text-primary" />
        Strategic Bidding Methods (OTM, LTM & DPM)
      </h3>
      <p className="text-muted-foreground mb-6">
        Not every tender requires the same approach. We analyze your firm's capacity and advise on the most viable bidding strategy:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-2 text-foreground">Open Tendering (OTM)</h4>
          <p className="text-sm text-muted-foreground">Assisting in competitive national and international bidding for large-scale projects.</p>
        </div>
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-2 text-foreground">Limited Tendering (LTM)</h4>
          <p className="text-sm text-muted-foreground">Helping enlisted contractors secure routine government works with optimized pricing strategies.</p>
        </div>
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-2 text-foreground">Direct Procurement (DPM)</h4>
          <p className="text-sm text-muted-foreground">Consultation and documentation for proprietary or emergency government supplies.</p>
        </div>
      </div>
    </div>

    {/* Additional Content Section 2: Specialized Ministries */}
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Building className="w-6 h-6 text-primary" />
        Sector-Specific Expertise
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex gap-4 p-4">
          <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">Road Transport & Railways</h4>
            <p className="text-sm text-muted-foreground">Heavy infrastructure projects, road/bridge construction, railway sleeper supply, and maintenance works.</p>
          </div>
        </div>
        <div className="flex gap-4 p-4">
          <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">Ministry of Shipping</h4>
            <p className="text-sm text-muted-foreground">Specialized procurement involving river dredging, port equipment supply, and vessel maintenance.</p>
          </div>
        </div>
        <div className="flex gap-4 p-4">
          <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">Ministry of Agriculture</h4>
            <p className="text-sm text-muted-foreground">Supply of advanced agricultural machinery, bulk fertilizer procurement, and irrigation development projects.</p>
          </div>
        </div>
        <div className="flex gap-4 p-4">
          <FileText className="w-6 h-6 text-primary shrink-0" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">Documentation & Compliance</h4>
            <p className="text-sm text-muted-foreground">Past performance certificates, ongoing work experience mappings, and zero-margin-for-error paperwork.</p>
          </div>
        </div>
      </div>
    </div>
  </ServicePageLayout>
);

export default GovtTender;