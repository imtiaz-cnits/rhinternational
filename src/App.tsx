import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ServicesIndex from "./pages/Services.tsx";
import Shop from "./pages/Shop.tsx";
import GlobalPresence from "./pages/GlobalPresence.tsx";
import Contact from "./pages/Contact.tsx";
import Checkout from "./pages/Checkout.tsx";
import Auth from "./pages/Auth.tsx";
import GovtTender from "./pages/services/GovtTender.tsx";
import PrintingPress from "./pages/services/PrintingPress.tsx";
import ITSolution from "./pages/services/ITSolution.tsx";
import TravelConsultation from "./pages/services/TravelConsultation.tsx";
import DubaiOffice from "./pages/services/DubaiOffice.tsx";
import DigitalService from "./pages/services/DigitalService.tsx";
import Locations from "./pages/services/Locations.tsx";
import Team from "./pages/Team.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminOverview from "./pages/admin/AdminOverview.tsx";
import AdminProducts from "./pages/admin/AdminProducts.tsx";
import AdminOrders from "./pages/admin/AdminOrders.tsx";
import AdminTickets from "./pages/admin/AdminTickets.tsx";
import AdminLeads from "./pages/admin/AdminLeads.tsx";
import AutoScrollTop from "./components/AutoScrollTop.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AutoScrollTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/team" element={<Team />} />
              <Route path="/services" element={<ServicesIndex />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<ProductDetail />} />
              <Route path="/global-presence" element={<GlobalPresence />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/services/govt-tender" element={<GovtTender />} />
              <Route path="/services/printing-press" element={<PrintingPress />} />
              <Route path="/services/it-solution" element={<ITSolution />} />
              <Route path="/services/travel-consultation" element={<TravelConsultation />} />
              <Route path="/services/dubai-office" element={<DubaiOffice />} />
              <Route path="/services/digital-service" element={<DigitalService />} />
              <Route path="/services/locations" element={<Locations />} />

              {/* Admin Dashboard */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverview />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="tickets" element={<AdminTickets />} />
                <Route path="leads" element={<AdminLeads />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
