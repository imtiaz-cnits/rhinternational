import ServicePageLayout from "@/components/ServicePageLayout";
import { CheckCircle2, FileText, Layers, Package, Printer, ShoppingBag } from "lucide-react";

const PrintingPress = () => (
  <ServicePageLayout
    title="Printing Press"
    subtitle="PVC & Bag Printing"
    description="From high-quality PVC materials to custom bag manufacturing, RH International delivers precision, vibrant colors, and scalable commercial printing solutions."
    icon={Printer}
    primaryCtaText="Request a Bulk Printing Quote"
    secondaryCtaText="Consult with Our Print Experts"
    features={[
      {
        title: "Advanced PVC Printing Solutions",
        description: "We utilize state-of-the-art large format printers to deliver durable, weather-resistant, and high-resolution PVC products."
      },
      {
        title: "Custom Bag Printing & Manufacturing",
        description: "Eco-friendly and reusable packaging is a powerful marketing tool. We offer bulk manufacturing and custom branding on a variety of materials."
      },
      {
        title: "Corporate Identity & Marketing Collaterals",
        description: "We produce sharp, professional marketing materials that help your sales team close deals."
      },
      {
        title: "Industrial Packaging & Labels",
        description: "Secure and attractive packaging that makes your products stand out on the shelves."
      }
    ]}
    highlights={[
      "High-volume Capacity: We are equipped to handle massive commercial print runs without ever compromising on color accuracy or material quality.",
      "Premium Sourcing: Leveraging our expertise as a Sourcing Center, we procure the finest grade raw materials (papers, specialty inks, and fabrics) directly from top suppliers.",
      "End-to-End Quality Control: From color calibration to final binding, every batch undergoes rigorous quality inspection before dispatch.",
      "Cost-Effective B2B Pricing: We offer highly competitive wholesale pricing tailored for corporate clients and long-term contracts."
    ]}
  >
    {/* Additional Content Section 1: Overview */}
    <div className="mt-16 bg-muted/30 p-8 rounded-2xl border border-border">
      <h3 className="text-2xl font-bold text-foreground mb-4">
        Overview: Making Lasting Impressions with Print
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        In the corporate world, the quality of your printed materials directly reflects your brand's standard. At RH International Sourcing Center, we provide top-tier commercial printing and packaging services designed to meet the high-volume demands of businesses, agencies, and government entities. Whether you need durable PVC signages for a nationwide campaign or custom-branded bags for your retail chain, we ensure flawless execution, strict quality control, and on-time delivery.
      </p>
    </div>

    {/* Additional Content Section 2: Detailed Capabilities */}
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Our Specialized Printing Capabilities
      </h3>
      
      <div className="space-y-6">
        {/* Capability 1 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" />
            1. Advanced PVC Printing Solutions
          </h4>
          <ul className="space-y-3 pl-8">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Large-scale Billboards & Corporate Signages</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>X-Banners, Roll-up Banners & Festoons</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>High-quality PVC ID Cards & Lanyards</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Frosted & Clear Window Vinyl Stickers</span>
            </li>
          </ul>
        </div>

        {/* Capability 2 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-primary" />
            2. Custom Bag Printing & Manufacturing
          </h4>
          <ul className="space-y-3 pl-8">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span><strong>Non-Woven Tissue Bags:</strong> Cost-effective and highly popular for retail and exhibitions.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span><strong>Premium Paper Bags:</strong> Kraft and art paper bags with custom handles and premium finishes (UV, foil stamping) for luxury retail.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span><strong>Jute & Canvas Bags:</strong> Sustainable, heavy-duty, and eco-friendly export-quality bags.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span><strong>Polybags & Courier Bags:</strong> Custom-printed mailing bags for e-commerce and logistics.</span>
            </li>
          </ul>
        </div>

        {/* Capability 3 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            3. Corporate Identity & Marketing Collaterals
          </h4>
          <ul className="space-y-3 pl-8">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Corporate Brochures & Annual Reports</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Flyers, Leaflets, and Company Profiles</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Premium Business Cards (Embossed, Spot UV, Die-cut)</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Custom Desk Calendars & Corporate Diaries</span>
            </li>
          </ul>
        </div>

        {/* Capability 4 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            4. Industrial Packaging & Labels
          </h4>
          <ul className="space-y-3 pl-8">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Custom Corrugated Boxes & Master Cartons</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Product Packaging Boxes (Cosmetics, Electronics, Food)</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Die-cut Adhesive Labels & Product Stickers</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </ServicePageLayout>
);

export default PrintingPress;