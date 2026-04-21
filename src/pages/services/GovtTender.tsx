import ServicePageLayout from "@/components/ServicePageLayout";
import { Briefcase, Building, CheckCircle2, FileText, Landmark } from "lucide-react";

const GovtTender = () => (
  <ServicePageLayout
    title="Government Tenders"
    subtitle="Precision & Expertise"
    description="Navigating government tenders can be highly complex and time-consuming. We simplify the entire public procurement process for you. From initial e-GP registration to strategic bidding and contract awarding, our specialized team ensures your business stays compliant, competitive, and ready to win high-value government contracts across major ministries in Bangladesh."
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
      "Zero-Error Policy: We double-check every clause of the tender document to ensure 100% responsiveness.",
      "Time-Critical Execution: Government deadlines are absolute. We ensure your bids are encrypted and submitted well before the closing time.",
      "Confidentiality: Your commercial rates, strategies, and financial data are handled with strict corporate non-disclosure protocols."
    ]}
  >
    {/* Additional Content Section 1: Introduction */}
    <div className="mt-16 bg-muted/30 p-8 rounded-2xl border border-border">
      <h3 className="text-2xl font-bold text-foreground mb-4">
        Winning Government Contracts Made Simple
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        Participating in government tenders requires more than just meeting the baseline criteria; it demands a strategic approach, a profound understanding of the Public Procurement Rules (PPR), and zero margin for error documentation. We are RH International, and we act as your dedicated public procurement partner. From handling the complexities of the National e-GP portal to securing banking compliance and preparing winning financial propositions, our expert team ensures your business is always positioned at the forefront of government contracting.
      </p>
    </div>

    {/* Additional Content Section 2: Comprehensive Services */}
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6 text-primary" />
        Our Comprehensive Tender Management Services:
      </h3>
      
      <div className="space-y-6">
        {/* Service 1 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-2 text-foreground">1. Complete e-GP Portal Management</h4>
          <p className="text-sm text-muted-foreground">
            We eliminate the technical friction of the e-GP system. Our services include new profile registration, regular Maker/Checker ID management, timely renewals, and constant monitoring of relevant tender notices so you never miss an opportunity.
          </p>
        </div>

        {/* Service 2 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground">2. Strategic Bidding Methods: (OTM, LTM & DPM)</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Not every tender requires the same approach. We analyze your firm's capacity and advise on the most viable bidding strategy:
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span><strong>Open Tendering Method (OTM):</strong> Assisting in competitive national and international bidding for large-scale projects.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span><strong>Limited Tendering Method (LTM):</strong> Helping enlisted contractors secure routine government works with optimized pricing strategies.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span><strong>Direct Procurement Method (DPM):</strong> Consultation and documentation for proprietary or emergency government supplies.</span>
            </li>
          </ul>
        </div>

        {/* Service 3 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground">3. Flawless Documentation & Compliance Preparation</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Disqualification often happens due to minor documentation errors. We meticulously prepare and audit:
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Tender Document Setup (TDS) and Bill of Quantities (BOQ).</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Mandatory compliance papers (Updated Trade License, TIN, BIN, Tax Clearance).</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Past performance certificates and ongoing work experience mappings.</span>
            </li>
          </ul>
        </div>

        {/* Service 4 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground">4. Financial Synergies & Bank Compliance</h4>
          <p className="text-sm text-muted-foreground mb-4">
            A strong financial footprint is key to winning mega-projects. We guide you in properly structuring:
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Liquid Asset Certificates and working capital proofs.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Unconditional Credit Line formats from scheduled banks.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Bid Security (Tender Security) and Performance Security guarantees.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Forming compliant Joint Venture (JV) Consortium agreements to meet high-capacity tender criteria.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Additional Content Section 3: Specialized Ministries */}
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Building className="w-6 h-6 text-primary" />
        Sector-Specific Expertise: Ministries We Specialize In
      </h3>
      <p className="text-muted-foreground mb-6">
        Government procurement varies heavily by sector. We have deep operational insights into the bidding structures of top-tier ministries:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex gap-4 p-5 bg-background rounded-xl border border-border shadow-sm">
          <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Ministry of Road Transport and Bridges & Ministry of Railways</h4>
            <p className="text-sm text-muted-foreground">Heavy infrastructure projects, road/bridge construction, railway sleeper supply, and maintenance works.</p>
          </div>
        </div>
        <div className="flex gap-4 p-5 bg-background rounded-xl border border-border shadow-sm">
          <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Ministry of Shipping</h4>
            <p className="text-sm text-muted-foreground">Specialized procurement involving river dredging, port equipment supply, and vessel maintenance.</p>
          </div>
        </div>
        <div className="flex gap-4 p-5 bg-background rounded-xl border border-border shadow-sm">
          <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Ministry of Agriculture</h4>
            <p className="text-sm text-muted-foreground">Supply of advanced agricultural machinery (tractors, harvesters), bulk fertilizer procurement, and irrigation development projects.</p>
          </div>
        </div>
      </div>
    </div>
  </ServicePageLayout>
);

export default GovtTender;