import ServicePageLayout from "@/components/ServicePageLayout";
import { Briefcase, Building, CheckCircle2, FileText, Globe, MapPin, Plane, UserCheck } from "lucide-react";

const TravelConsultation = () => (
  <ServicePageLayout
     title="Travel Consultation"
    subtitle="Portugal · Spain · Denmark"
    description="Specialized consultation and comprehensive travel management for Portugal, Spain, and Denmark. We turn your European aspirations into reality with expert guidance and transparent processing."
    icon={Plane}
    primaryCtaText="Book a Free Profile Assessment"
    secondaryCtaText="Consult with Our Visa Experts"
    features={[
      {
        title: "Comprehensive Profile Assessment",
        description: "We don't just fill out forms; we analyze your profile. Our experts review your background to recommend the most strategic approach for a successful visa application."
      },
      {
        title: "Flawless Document Preparation",
        description: "The secret to Schengen visa approval lies in the paperwork. We audit, fix, and organize all necessary documents tailored to your specific travel purpose."
      },
      {
        title: "Corporate & B2B Travel Management",
        description: "Leveraging our global sourcing network, we organize seamless travel for corporate teams, including trade fairs and B2B meetings."
      },
      {
        title: "Appointment & Interview Guidance",
        description: "We navigate the complexities of VFS and embassy portals to secure timely appointment slots and provide comprehensive interview briefing sessions."
      }
    ]}
    highlights={[
      "Specialized Expertise: By focusing strictly on Portugal, Spain, and Denmark, we maintain an unparalleled, in-depth understanding of their specific immigration and visa policies.",
      "Transparent Processing: No hidden fees, no false promises. We provide an honest assessment of your visa chances before initiating the process.",
      "High Success Rate: Our zero-error documentation policy significantly minimizes the risk of visa refusals."
    ]}
  >
    {/* Additional Content Section 1: Overview */}
    <div className="mt-16 bg-muted/30 p-8 rounded-2xl border border-border">
      <h3 className="text-2xl font-bold text-foreground mb-4">
        Overview: Navigating the Complexities of European Travel
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        Securing a visa and planning a trip to the Schengen Area require meticulous preparation, accurate documentation, and up-to-date knowledge of embassy regulations. At RH International Sourcing Center, our Travel Consultation division acts as your dedicated advising partner. Whether you are traveling for corporate trade fairs, seeking business expansion, or planning a personal visit, we bypass bureaucratic hurdles to ensure a seamless and cost-effective journey to Europe's most sought-after destinations.
      </p>
    </div>

    {/* Additional Content Section 2: Specialized Destinations */}
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Globe className="w-6 h-6 text-primary" />
        Our Specialized Destinations
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-3 text-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Portugal
          </h4>
          <p className="text-sm text-muted-foreground">
            Portugal is a prime destination for both business ventures and residency pathways. We provide deep insights and structured visa processing for tourism, business visits, work permits, and long-term settlement programs.
          </p>
        </div>
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-3 text-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Spain
          </h4>
          <p className="text-sm text-muted-foreground">
            Whether you are attending a global corporate conference in Barcelona or exploring the vibrant culture of Madrid, we streamline the Spanish Schengen visa process, ensuring your itinerary and financial documents perfectly align with embassy requirements.
          </p>
        </div>
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-3 text-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Denmark
          </h4>
          <p className="text-sm text-muted-foreground">
            Known for its robust economy and strict visa policies, Denmark requires an exact application approach. We assist professionals and corporate delegates with precise guidance on documentation for short-stay business visas and strategic recommendations for long-term programs.
          </p>
        </div>
      </div>
    </div>

    {/* Additional Content Section 3: Detailed Services */}
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Our Core Travel & Consultation Services
      </h3>
      
      <div className="space-y-6">
        {/* Service 1 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-3 text-foreground flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-primary" />
            1. Comprehensive Profile Assessment & Visa Strategy
          </h4>
          <p className="text-sm text-muted-foreground pl-8">
            We don't just fill out forms; we analyze your profile. Our experts review your financial standing, travel history, and professional background to recommend the most strategic approach for a successful visa application.
          </p>
        </div>

        {/* Service 2 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            2. Flawless Document Preparation
          </h4>
          <p className="text-sm text-muted-foreground mb-4 pl-8">
            The secret to Schengen visa approval lies in the paperwork. We audit and fix:
          </p>
          <ul className="space-y-3 pl-8">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Drafting persuasive Cover Letters tailored to your specific travel purpose.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Organizing and authenticating bank statements, audit reports, and tax papers.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Securing authentic hotel reservations and/or confirmed flight itineraries.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Travel insurance sourcing that meets exact Schengen mandates.</span>
            </li>
          </ul>
        </div>

        {/* Service 3 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
            <Building className="w-6 h-6 text-primary" />
            3. Corporate & B2B Travel Management
          </h4>
          <p className="text-sm text-muted-foreground mb-4 pl-8">
            Leveraging our global sourcing network, we organize seamless travel for corporate teams:
          </p>
          <ul className="space-y-3 pl-8">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Visa assistance for international trade fairs, exhibitions, and B2B meetings.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Hotel contracting and premium accommodation sourcing.</span>
            </li>
          </ul>
        </div>

        {/* Service 4 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-3 text-foreground flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            4. Embassy Appointment & Interview Guidance
          </h4>
          <p className="text-sm text-muted-foreground pl-8">
            We navigate the complexities of VFS and embassy portals to secure timely appointment slots. Additionally, we provide comprehensive briefing sessions to prepare you for potential embassy interviews.
          </p>
        </div>
      </div>
    </div>
  </ServicePageLayout>
);

export default TravelConsultation;
