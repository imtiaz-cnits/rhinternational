import ServicePageLayout from "@/components/ServicePageLayout";
import { CheckCircle2, Layers, Package, Search, ShoppingCart, Target } from "lucide-react";

const DigitalService = () => (
  <ServicePageLayout
    title="Digital Service & E-commerce"
    subtitle="Service Consultation"
    description="End-to-end digital consultation and highly scalable e-commerce infrastructures. We build, optimize, and manage digital platforms designed for maximum conversion and seamless user experiences."
    icon={ShoppingCart}
    primaryCtaText="Book a Digital Strategy Session"
    secondaryCtaText="Launch Your E-Commerce Platform"
    features={[
      {
        title: "Enterprise E-Commerce Architecture",
        description: "We build lightning-fast, secure, and visually stunning online stores utilizing ultra-modern web technologies (like Next.js and React)."
      },
      {
        title: "Comprehensive Digital Strategy & Consultation",
        description: "Navigating the digital landscape requires a clear roadmap. Our strategic consultants help you align technology with your business goals."
      },
      {
        title: "Digital Product Sourcing & Merchandising",
        description: "Leveraging our core strength as a sourcing center, we assist e-commerce businesses in optimizing their product pipelines."
      },
      {
        title: "Advanced Digital Growth & SEO",
        description: "A beautiful store is useless without targeted traffic. We deploy aggressive digital growth strategies to dominate search results."
      }
    ]}
    highlights={[
      "Performance-First Approach: Our platforms are engineered for speed, ensuring zero friction from the landing page to the checkout cart.",
      "Scalability: As your transaction volume grows, our robust digital infrastructures scale seamlessly with your business.",
      "Holistic Ecosystem: From sourcing the physical product to selling it on a high-end digital platform, we provide a complete, 360-degree business solution."
    ]}
  >
    {/* Additional Content Section 1: Overview */}
    <div className="mt-16 bg-muted/30 p-8 rounded-2xl border border-border">
      <h3 className="text-2xl font-bold text-foreground mb-4">
        Overview: Empowering Your Digital Footprint
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        In the modern marketplace, a successful business requires more than just a standard website; it demands a strategic digital ecosystem. At RH International Sourcing Center, our Digital Service & E-commerce division bridges the gap between traditional business models and cutting-edge digital commerce. Whether you are launching a D2C (Direct-to-Consumer) brand, scaling a B2B wholesale platform, or seeking expert digital transformation consultancy, we provide robust, future-proof solutions tailored to your growth objectives.
      </p>
    </div>

    {/* Additional Content Section 2: Detailed Capabilities */}
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Our Core Digital & E-Commerce Services
      </h3>
      
      <div className="space-y-6">
        {/* Capability 1 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" />
            1. Enterprise E-Commerce Architecture
          </h4>
          <ul className="space-y-3 pl-8">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Custom storefront development with high-end UI/UX (Bento-grids, smooth animations).</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Seamless integration of local and international payment gateways.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Advanced inventory, order management, and secure multi-vendor architectures.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>B2B bulk-ordering portals with dynamic pricing tiers.</span>
            </li>
          </ul>
        </div>

        {/* Capability 2 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            2. Comprehensive Digital Strategy & Consultation
          </h4>
          <ul className="space-y-3 pl-8">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Business model validation and digital transformation planning.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Data-driven Conversion Rate Optimization (CRO) to maximize sales.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Automation of digital workflows to reduce operational overhead.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Brand positioning and digital identity development.</span>
            </li>
          </ul>
        </div>

        {/* Capability 3 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            3. Digital Product Sourcing & Merchandising
          </h4>
          <ul className="space-y-3 pl-8">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Dropshipping and bulk product sourcing integration.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>E-commerce catalog management and high-conversion product descriptions.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Digital supply chain consultation to streamline your fulfillment process.</span>
            </li>
          </ul>
        </div>

        {/* Capability 4 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
            <Search className="w-6 h-6 text-primary" />
            4. Advanced Digital Growth & SEO
          </h4>
          <ul className="space-y-3 pl-8">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span><strong>Technical & E-commerce SEO:</strong> Optimizing site architecture, core web vitals, and product schema for rapid indexing.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span><strong>Generative Engine Optimization (GEO) & AEO:</strong> Preparing your brand to rank on AI-driven search platforms.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Omni-channel digital marketing and data analytics tracking.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </ServicePageLayout>
);

export default DigitalService;