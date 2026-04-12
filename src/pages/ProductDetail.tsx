import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ShoppingCart, Star, Heart, Share2, Check, Minus, Plus, Package,
  Shield, Clock, Truck, ChevronRight, ShoppingBag, X, Trash2,
} from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categoryGradients } from "@/data/products";
import { useProduct, useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(id);
  const { data: allProducts = [] } = useProducts();
  const { cart, cartCount, addToCart, removeFromCart, updateQty, addedToCartId } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [qty, setQty] = useState(1);

  const cartTotal = cart.reduce((sum, item) => {
    const p = allProducts.find((pr) => pr.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="fixed inset-0 mesh-gradient pointer-events-none" />
        <Navbar />
        <div className="relative z-10 pt-40 pb-20 text-center px-6">
          <div className="animate-pulse space-y-4 max-w-md mx-auto">
            <div className="h-8 bg-secondary/50 rounded w-2/3 mx-auto" />
            <div className="h-4 bg-secondary/30 rounded w-1/2 mx-auto" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const gradient = categoryGradients[product.category ?? ""] || "from-primary to-primary";
  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const justAdded = addedToCartId === product.id;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product.id);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />
      <Navbar />

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setCartOpen(false)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md z-50 bg-card border-l border-border/20 shadow-[-8px_0_30px_rgba(0,0,0,0.5)] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Your Cart</h2>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/15 text-primary">{cartCount}</span>
                </div>
                <button onClick={() => setCartOpen(false)} className="p-2 rounded-full hover:bg-secondary transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="w-16 h-16 text-muted-foreground/20 mb-4" />
                    <p className="text-muted-foreground text-sm font-medium">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map((item) => {
                    const p = allProducts.find((pr) => pr.id === item.id);
                    if (!p) return null;
                    return (
                      <motion.div key={item.id} layout className="flex gap-4 p-4 rounded-xl bg-secondary/50 border border-border/15">
                        <div className="w-16 h-16 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
                          <img src={p.image} alt={p.title} className="w-10 h-10 object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-foreground truncate">{p.title}</h4>
                          <p className="text-xs text-primary font-medium mt-0.5">${p.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center"><Minus className="w-3 h-3 text-muted-foreground" /></button>
                            <span className="text-sm font-semibold text-foreground w-6 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center"><Plus className="w-3 h-3 text-muted-foreground" /></button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <button onClick={() => removeFromCart(item.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors group"><Trash2 className="w-3.5 h-3.5 text-muted-foreground group-hover:text-destructive" /></button>
                          <span className="text-sm font-bold text-foreground">${(p.price * item.qty).toFixed(2)}</span>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
              {cart.length > 0 && (
                <div className="p-6 border-t border-border/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="text-lg font-bold text-gradient-cyan" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button onClick={() => navigate("/checkout", { state: { cart } })} className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all text-sm">Proceed to Checkout</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Breadcrumb */}
      <section className="relative z-10 pt-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-8"
          >
            <Link to="/shop" className="hover:text-foreground transition-colors flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" /> Shop
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{product.title}</span>
          </motion.div>
        </div>
      </section>

      {/* Product Detail */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-3xl border border-border/15 bg-card/25 backdrop-blur-sm overflow-hidden relative group">
                <button
                  onClick={() => setCartOpen(true)}
                  className="absolute top-6 right-6 z-10 p-3 rounded-xl border border-border/20 bg-background/70 backdrop-blur-xl hover:border-primary/30 transition-all group/cart"
                >
                  <ShoppingCart className="w-5 h-5 text-muted-foreground group-hover/cart:text-primary transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
                  )}
                </button>

                <div className="w-full aspect-square bg-gradient-to-br from-secondary/40 to-background/50 flex items-center justify-center p-12">
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    className="w-4/5 h-4/5 object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ scale: 1.08, rotate: 2 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md bg-gradient-to-r ${gradient} text-white shadow-sm inline-block mb-4`}>
                {product.category}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {product.title}
              </h1>

              <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl font-bold text-gradient-cyan" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 border border-border/20 rounded-xl overflow-hidden bg-secondary/30">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors">
                    <Minus className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-foreground">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors">
                    <Plus className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] active:scale-[0.98]"
                >
                  <AnimatePresence mode="wait">
                    {justAdded ? (
                      <motion.span key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                        <Check className="w-4 h-4" /> Added to Cart!
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" /> Add to Cart — ${(product.price * qty).toFixed(2)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Wishlist & Share */}
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-300 ${
                    wishlisted
                      ? "border-destructive/30 bg-destructive/10 text-destructive"
                      : "border-border/25 bg-secondary/20 text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
                  {wishlisted ? "Wishlisted" : "Wishlist"}
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-border/25 bg-secondary/20 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Package, label: "Free Shipping", sub: "Over $200" },
                  { icon: Shield, label: "Secure Pay", sub: "100% Protected" },
                  { icon: Truck, label: "Fast Delivery", sub: "2-5 Days" },
                ].map((perk) => (
                  <div key={perk.label} className="p-3 rounded-xl border border-border/15 bg-card/20 text-center">
                    <perk.icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
                    <p className="text-[11px] font-semibold text-foreground">{perk.label}</p>
                    <p className="text-[10px] text-muted-foreground">{perk.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="relative z-10 px-6 pb-28">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-4xl mx-auto mb-8">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-14"
              />
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-10 text-center"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Related <span className="text-gradient-cyan">Products</span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {relatedProducts.map((rp, i) => {
                const rpGradient = categoryGradients[rp.category ?? ""] || "from-primary to-primary";
                return (
                  <motion.div
                    key={rp.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link to={`/shop/${rp.id}`} className="block group">
                      <div className="rounded-2xl border border-border/15 bg-card/25 backdrop-blur-sm overflow-hidden hover:border-primary/20 transition-all duration-500 hover:-translate-y-2">
                        <div className="w-full aspect-square bg-gradient-to-br from-secondary/40 to-background/50 flex items-center justify-center p-8">
                          <img src={rp.image} alt={rp.title} className="w-3/5 h-3/5 object-contain group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="p-5">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-gradient-to-r ${rpGradient} text-white`}>
                            {rp.category}
                          </span>
                          <h3 className="text-base font-bold text-foreground mt-3 mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            {rp.title}
                          </h3>
                          <span className="text-xl font-bold text-gradient-cyan" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            ${rp.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
