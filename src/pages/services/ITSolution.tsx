import ServicePageLayout from "@/components/ServicePageLayout";
import { CheckCircle2, Code2, MonitorSmartphone, PenTool, Server, TrendingUp } from "lucide-react";

const ITSolution = () => (

  <ServicePageLayout
    title="IT Solution"
    subtitle="Technology Consulting"
    description="Empowering enterprises with high-performance web applications, advanced SEO strategies, and robust digital infrastructure tailored for global scalability."
    icon={MonitorSmartphone}
    primaryCtaText="Discuss Your IT Project with Us"
    secondaryCtaText="Request a Tech Audit"
    features={[
      {
        title: "Enterprise Web & Software Development",
        description: "We build secure, blazing-fast, and highly scalable digital platforms tailored to your specific business architecture."
      },
      {
        title: "High-End UI/UX Design",
        description: "First impressions matter. Our design philosophy revolves around user-centric aesthetics and seamless interactivity."
      },
      {
        title: "Advanced Search Engine Optimization (SEO)",
        description: "We don't just aim for traffic; we aim for digital dominance. Our specialized SEO strategies ensure your brand is discovered by the right audience."
      },
      {
        title: "IT Sourcing & Infrastructure Consultation",
        description: "Leveraging our strength as a global sourcing center, we provide hardware and software infrastructure support."
      }
    ]}
    highlights={[
      "Future-Ready Tech Stack: We utilize the most advanced frameworks and tools to ensure your software remains relevant and scalable for years to come.",
      "Security & Performance: Every line of code and every digital campaign is optimized for maximum security and lightning-fast performance.",
      "Dedicated Support: We provide ongoing technical support and continuous monitoring, ensuring zero downtime for your business operations."
    ]}
  >
    {/* Additional Content Section 1: Overview */}
    <div className="mt-16 bg-muted/30 p-8 rounded-2xl border border-border">
      <h3 className="text-2xl font-bold text-foreground mb-4">
        Overview: Driving Digital Excellence
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        In today’s fast-paced digital economy, having a standard online presence is no longer enough. At RH International Sourcing Center, our IT Solutions division acts as your dedicated technology partner. We bridge the gap between complex business challenges and cutting-edge digital innovations. From developing ultra-modern, high-speed web platforms to executing data-driven digital marketing strategies, we provide scalable solutions that accelerate growth and maximize operational efficiency.
      </p>
    </div>

    {/* Additional Content Section 2: Detailed Capabilities */}
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Detailed Technical Capabilities
      </h3>
      
      <div className="space-y-6">
        {/* Capability 1 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
            <Code2 className="w-6 h-6 text-primary" />
            1. Enterprise Web & Software Development
          </h4>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Custom Corporate Websites & Web Applications (using modern stacks like React, Next.js, and Node.js).</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Comprehensive E-commerce platforms with secure payment gateways and inventory management.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Custom CRM (Customer Relationship Management) and ERP solutions.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Performance optimization, bug fixing, and continuous technical maintenance.</span>
            </li>
          </ul>
        </div>

        {/* Capability 2 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
            <PenTool className="w-6 h-6 text-primary" />
            2. High-End UI/UX Design
          </h4>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Wireframing and rapid prototyping for web and mobile apps.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Ultra-modern, responsive interfaces utilizing global design trends (Glassmorphism, Bento-box layouts, and advanced animations).</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Conversion Rate Optimization (CRO) focused design strategies to turn visitors into clients.</span>
            </li>
          </ul>
        </div>

        {/* Capability 3 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            3. Advanced Search Engine Optimization (SEO)
          </h4>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span><strong>Technical SEO:</strong> Auditing and optimizing website architecture, schema markup, and core web vitals.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span><strong>AEO & GEO:</strong> Implementing Answer Engine Optimization and Generative Engine Optimization to rank highly on AI-driven search platforms.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Local and International SEO to expand your global footprint.</span>
            </li>
          </ul>
        </div>

        {/* Capability 4 */}
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
          <h4 className="font-semibold text-lg mb-4 text-foreground flex items-center gap-2">
            <Server className="w-6 h-6 text-primary" />
            4. IT Sourcing & Infrastructure Consultation
          </h4>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>IT hardware sourcing for corporate offices and institutions.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Cloud server setup, database architecture, and security compliance consulting.</span>
            </li>
            <li className="flex gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span>Digital workflow automation to reduce manual workload.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </ServicePageLayout>
);

export default ITSolution;