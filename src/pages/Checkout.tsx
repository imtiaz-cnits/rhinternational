import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, CreditCard, Truck, Shield, ChevronLeft, Check, LogIn } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/use-products";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

interface CartItem {
  id: string;
  qty: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const { data: products = [] } = useProducts();
  const cartItems: CartItem[] = (location.state as { cart?: CartItem[] })?.cart ?? [];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "Bangladesh",
  });

  const [payment, setPayment] = useState({
    cardNumber: "", expiry: "", cvv: "", cardName: "",
  });

  const subtotal = cartItems.reduce((sum, item) => {
    const p = products.find((pr) => pr.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
  const shipping_cost = subtotal > 200 ? 0 : 12.99;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping_cost + tax;

  const handlePlaceOrder = async () => {
    if (!user) return;
    setPlacingOrder(true);

    try {
      // Create the order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_id: user.id,
          total_amount: Number(total.toFixed(2)),
          status: "pending",
        })
        .select("id")
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map((item) => {
        const p = products.find((pr) => pr.id === item.id);
        return {
          order_id: order.id,
          product_id: item.id,
          quantity: item.qty,
          price_at_time: p ? Number(p.price.toFixed(2)) : 0,
        };
      });

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setOrderId(order.id);
      setOrderPlaced(true);
      toast({ title: "Order Placed!", description: "Your order has been placed successfully." });
    } catch (error: any) {
      toast({ title: "Order failed", description: error.message, variant: "destructive" });
    } finally {
      setPlacingOrder(false);
    }
  };

  // Auth gate — must be logged in
  if (!authLoading && !user) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 mesh-gradient pointer-events-none" />
        <Navbar />
        <div className="relative z-10 pt-40 pb-20 text-center px-6">
          <LogIn className="w-20 h-20 text-muted-foreground/20 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Sign in to checkout
          </h1>
          <p className="text-muted-foreground mb-8">You need an account to place an order.</p>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all"
          >
            <LogIn className="w-4 h-4" /> Sign In or Create Account
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 mesh-gradient pointer-events-none" />
        <Navbar />
        <div className="relative z-10 pt-40 pb-20 text-center px-6">
          <ShoppingBag className="w-20 h-20 text-muted-foreground/20 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Your cart is empty
          </h1>
          <p className="text-muted-foreground mb-8">Add some products before checking out.</p>
          <button onClick={() => navigate("/shop")} className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all">
            Browse Shop
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 mesh-gradient pointer-events-none" />
        <Navbar />
        <div className="relative z-10 pt-40 pb-20 text-center px-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
            <div className="w-24 h-24 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_hsl(var(--primary)/0.2)]">
              <Check className="w-12 h-12 text-primary" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground mb-2">Thank you for your purchase.</p>
          <p className="text-muted-foreground/60 text-sm mb-8">Order #{orderId?.slice(0, 8).toUpperCase()}</p>
          <button onClick={() => navigate("/shop")} className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all">
            Continue Shopping
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 text-sm rounded-xl bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:shadow-[0_0_12px_hsl(var(--primary)/0.1)] transition-all";

  const steps = [
    { num: 1, label: "Shipping" },
    { num: 2, label: "Payment" },
    { num: 3, label: "Review" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />
      <Navbar />

      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate("/shop")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ChevronLeft className="w-4 h-4" /> Back to Shop
          </button>

          <div className="flex items-center justify-center gap-2 mb-12">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s.num ? "bg-primary text-primary-foreground shadow-[0_0_16px_hsl(var(--primary)/0.2)]" : "bg-secondary text-muted-foreground border border-border"}`}>
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${step >= s.num ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
                {i < steps.length - 1 && <div className={`w-12 h-px mx-1 ${step > s.num ? "bg-primary" : "bg-border/20"}`} />}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="glass-card rounded-2xl p-6 md:p-8">
                {step === 1 && (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <Truck className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Shipping Information</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input className={inputClass} placeholder="First Name" value={shipping.firstName} onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })} />
                      <input className={inputClass} placeholder="Last Name" value={shipping.lastName} onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })} />
                      <input className={inputClass} placeholder="Email" type="email" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} />
                      <input className={inputClass} placeholder="Phone" value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} />
                      <input className={`${inputClass} sm:col-span-2`} placeholder="Street Address" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} />
                      <input className={inputClass} placeholder="City" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} />
                      <input className={inputClass} placeholder="State / Region" value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} />
                      <input className={inputClass} placeholder="ZIP / Postal Code" value={shipping.zip} onChange={(e) => setShipping({ ...shipping, zip: e.target.value })} />
                      <input className={inputClass} placeholder="Country" value={shipping.country} onChange={(e) => setShipping({ ...shipping, country: e.target.value })} />
                    </div>
                    <button onClick={() => setStep(2)} className="mt-6 w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all text-sm">
                      Continue to Payment
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Payment Details</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <input className={inputClass} placeholder="Name on Card" value={payment.cardName} onChange={(e) => setPayment({ ...payment, cardName: e.target.value })} />
                      <input className={inputClass} placeholder="Card Number" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })} />
                      <div className="grid grid-cols-2 gap-4">
                        <input className={inputClass} placeholder="MM / YY" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} />
                        <input className={inputClass} placeholder="CVV" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                      <span>Your payment is secured with 256-bit SSL encryption</span>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl border border-border/30 text-sm font-medium text-muted-foreground hover:text-foreground transition-all">Back</button>
                      <button onClick={() => setStep(3)} className="flex-1 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all text-sm">Review Order</button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h2 className="text-lg font-bold text-foreground mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Review Your Order</h2>
                    <div className="mb-5 p-4 rounded-xl bg-secondary/50 border border-border">
                      <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">Shipping to</p>
                      <p className="text-sm text-foreground">{shipping.firstName} {shipping.lastName}</p>
                      <p className="text-xs text-muted-foreground">{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</p>
                      <p className="text-xs text-muted-foreground">{shipping.email} • {shipping.phone}</p>
                    </div>
                    <div className="space-y-3 mb-5">
                      {cartItems.map((item) => {
                        const p = products.find((pr) => pr.id === item.id);
                        if (!p) return null;
                        return (
                          <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border">
                            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                              <img src={p.image} alt={p.title} className="w-6 h-6 object-contain" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">{p.title}</p>
                              <p className="text-xs text-muted-foreground">Qty: {item.qty}</p>
                            </div>
                            <span className="text-sm font-bold text-foreground">${(p.price * item.qty).toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-xl border border-border/30 text-sm font-medium text-muted-foreground hover:text-foreground transition-all">Back</button>
                      <button
                        onClick={handlePlaceOrder}
                        disabled={placingOrder}
                        className="flex-1 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all text-sm disabled:opacity-50"
                      >
                        {placingOrder ? "Placing Order..." : `Place Order — $${total.toFixed(2)}`}
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <div className="glass-card rounded-2xl p-6 sticky top-28">
                <h3 className="text-sm font-bold text-foreground mb-5 uppercase tracking-wider" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Order Summary</h3>
                <div className="space-y-3 mb-5 max-h-52 overflow-y-auto pr-1">
                  {cartItems.map((item) => {
                    const p = products.find((pr) => pr.id === item.id);
                    if (!p) return null;
                    return (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                          <img src={p.image} alt={p.title} className="w-6 h-6 object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{p.title}</p>
                          <p className="text-[10px] text-muted-foreground">×{item.qty}</p>
                        </div>
                        <span className="text-xs font-bold text-foreground">${(p.price * item.qty).toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-border/20 pt-4 space-y-2.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground font-medium">{shipping_cost === 0 ? "Free" : `$${shipping_cost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span className="text-foreground font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border/20 pt-3 flex justify-between">
                    <span className="text-sm font-semibold text-foreground">Total</span>
                    <span className="text-lg font-bold text-gradient-cyan" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>${total.toFixed(2)}</span>
                  </div>
                </div>
                {subtotal > 200 && (
                  <div className="mt-4 flex items-center gap-2 text-[10px] text-primary font-medium px-3 py-2 rounded-lg bg-primary/8 border border-primary/15">
                    <Truck className="w-3.5 h-3.5" /> You qualify for free shipping!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;
