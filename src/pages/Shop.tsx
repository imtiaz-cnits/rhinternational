import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Star, Search, Filter, ShoppingBag, X, Plus, Minus, Trash2,
  Eye, Heart, Share2, Check, Package, Shield, Clock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, categoryGradients, categoryBgGlow, badgeIcons } from "@/data/products";
import { useProducts, SupabaseProduct } from "@/hooks/use-products";
import { Sparkles } from "lucide-react";

const Shop = () => {
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedToCartId, setAddedToCartId] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);

  const addToCart = (id: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { id, qty: 1 }];
    });
    setAddedToCartId(id);
    setTimeout(() => setAddedToCartId(null), 1500);
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((c) => c.id !== id));

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c)).filter((c) => c.qty > 0));
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 mesh-gradient pointer-events-none" />
      <Navbar />

      {/* ─── Cart Drawer ─── */}
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
                    const product = products.find((p) => p.id === item.id);
                    if (!product) return null;
                    return (
                      <motion.div key={item.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex gap-4 p-4 rounded-xl bg-secondary/50 border border-border/15">
                        <div className="w-16 h-16 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
                          <img src={product.image} alt={product.title} className="w-10 h-10 object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-foreground truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{product.title}</h4>
                          <p className="text-xs text-primary font-medium mt-0.5">${product.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"><Minus className="w-3 h-3 text-muted-foreground" /></button>
                            <span className="text-sm font-semibold text-foreground w-6 text-center">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"><Plus className="w-3 h-3 text-muted-foreground" /></button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <button onClick={() => removeFromCart(item.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors group"><Trash2 className="w-3.5 h-3.5 text-muted-foreground group-hover:text-destructive" /></button>
                          <span className="text-sm font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>${(product.price * item.qty).toFixed(2)}</span>
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
                  <button onClick={() => navigate("/checkout", { state: { cart } })} className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] text-sm">Proceed to Checkout</button>
                  <button onClick={() => setCartOpen(false)} className="w-full py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Continue Shopping</button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Hero ─── */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,hsl(var(--primary)/0.06),transparent_60%)]" />
        <div className="max-w-6xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/25 bg-primary/5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary font-semibold tracking-wider uppercase">Shop</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="text-foreground">E-commerce</span>{" "}<span className="text-gradient-cyan">Store</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Curated products and digital services — from commercial printing to SEO packages and visa consultations.
            </p>
            <div className="flex items-center justify-center gap-10 mt-12">
              {[
                { icon: Package, label: "Free Shipping", sub: "Over $200" },
                { icon: Shield, label: "Secure Payment", sub: "100% Protected" },
                { icon: Clock, label: "Fast Delivery", sub: "2-5 Business Days" },
              ].map((perk) => (
                <div key={perk.label} className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <perk.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{perk.label}</div>
                    <div className="text-[11px] text-muted-foreground">{perk.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Filters ─── */}
      <section className="relative z-10 px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl border border-border/20 bg-card/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-muted-foreground mr-1" />
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >{cat}</button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-secondary/50 border border-border/30 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:shadow-[0_0_12px_hsl(var(--primary)/0.15)] transition-all"
                />
              </div>
              <button onClick={() => setCartOpen(true)} className="relative p-3 rounded-xl border border-border/30 bg-secondary/30 hover:border-primary/30 transition-all group">
                <ShoppingCart className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_10px_hsl(var(--primary)/0.4)]">{cartCount}</span>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Products Grid ─── */}
      <section className="relative z-10 px-6 pb-28">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="rounded-3xl border border-border/15 bg-card/30 backdrop-blur-sm overflow-hidden animate-pulse">
                  <div className="w-full aspect-square bg-secondary/30" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-secondary/50 rounded w-1/3" />
                    <div className="h-5 bg-secondary/50 rounded w-2/3" />
                    <div className="h-3 bg-secondary/30 rounded w-full" />
                    <div className="h-8 bg-secondary/50 rounded w-1/3 mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {filtered.map((product, i) => {
                const gradient = categoryGradients[product.category ?? ""] || "from-primary to-primary";
                const bgGlow = categoryBgGlow[product.category ?? ""] || "hsl(var(--primary)/0.08)";
                const isHovered = hoveredProduct === product.id;
                const isInWishlist = wishlist.includes(product.id);
                const justAdded = addedToCartId === product.id;
                const cartItem = cart.find((c) => c.id === product.id);

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    className="group relative rounded-3xl border border-border/15 bg-card/30 backdrop-blur-sm overflow-hidden transition-all duration-600"
                    style={{
                      boxShadow: isHovered
                        ? `0 25px 80px -20px ${bgGlow}, 0 0 0 1px hsl(var(--primary) / 0.15)`
                        : "0 0 0 0 transparent",
                      transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                    }}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradient} transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} />
                    <div
                      className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at 50% 0%, ${bgGlow}, transparent 70%)`,
                        opacity: isHovered ? 1 : 0,
                      }}
                    />

                    {/* ─── Image Section ─── */}
                    <div className="relative p-5 pb-0">
                      <motion.div
                        className="absolute top-1/2 right-7 z-10 flex flex-col gap-2"
                        initial={false}
                        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                          className={`p-2.5 rounded-xl backdrop-blur-xl border shadow-lg transition-all duration-300 ${
                            isInWishlist
                              ? "bg-destructive/20 border-destructive/30 text-destructive"
                              : "bg-background/70 border-border/20 text-muted-foreground hover:text-destructive hover:border-destructive/30"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
                        </button>
                        <button className="p-2.5 rounded-xl bg-background/70 backdrop-blur-xl border border-border/20 text-muted-foreground hover:text-primary hover:border-primary/30 shadow-lg transition-all duration-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2.5 rounded-xl bg-background/70 backdrop-blur-xl border border-border/20 text-muted-foreground hover:text-primary hover:border-primary/30 shadow-lg transition-all duration-300">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </motion.div>

                      <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-secondary/40 to-background/50 flex items-center justify-center overflow-hidden">
                        <motion.img
                          src={product.image}
                          alt={product.title}
                          loading="lazy"
                          width={512}
                          height={512}
                          className="w-3/5 h-3/5 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                          animate={{
                            scale: isHovered ? 1.18 : 1,
                            y: isHovered ? -12 : 0,
                            rotateY: isHovered ? 5 : 0,
                          }}
                          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        />
                      </div>
                    </div>

                    {/* ─── Content ─── */}
                    <div className="relative p-6 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-gradient-to-r ${gradient} text-white shadow-sm`}>
                          {product.category}
                        </span>
                      </div>

                      <Link to={`/shop/${product.id}`}>
                        <h3 className="text-lg font-bold text-foreground mb-1 tracking-tight hover:text-primary transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                          {product.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{product.description}</p>

                      {/* Price + Action */}
                      <div className="flex items-end justify-between pt-4 border-t border-border/15">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-gradient-cyan" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            ${product.price.toFixed(2)}
                          </span>
                        </div>

                        {cartItem ? (
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => updateQty(product.id, -1)} className="w-8 h-8 rounded-lg bg-secondary border border-border/20 flex items-center justify-center hover:border-primary/30 transition-all">
                              <Minus className="w-3 h-3 text-muted-foreground" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-foreground">{cartItem.qty}</span>
                            <button onClick={() => updateQty(product.id, 1)} className="w-8 h-8 rounded-lg bg-secondary border border-border/20 flex items-center justify-center hover:border-primary/30 transition-all">
                              <Plus className="w-3 h-3 text-muted-foreground" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addToCart(product.id)}
                            className="group/btn flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.4)] active:scale-95"
                          >
                            <AnimatePresence mode="wait">
                              {justAdded ? (
                                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5" /> Added!
                                </motion.span>
                              ) : (
                                <motion.span key="cart" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1.5">
                                  <ShoppingCart className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" /> Add to Cart
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
          )}

          {!isLoading && filtered.length === 0 && (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg font-medium">No products found</p>
              <p className="text-muted-foreground/60 text-sm mt-1">Try adjusting your search or filter</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
