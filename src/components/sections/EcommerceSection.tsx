import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { useProducts } from "@/hooks/use-products";

const EcommerceSection = () => {
  const { data: products = [], isLoading } = useProducts();

  return (
    <section id="ecommerce" className="relative z-10 py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/15 bg-primary/5 mb-4">
            <ShoppingCart className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] text-primary font-medium tracking-wider uppercase">Shop</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            E-commerce <span className="text-gradient-cyan">Store</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-base">
            Browse our curated collection of products and digital services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading
            ? [1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl glass-card animate-pulse">
                  <div className="p-5 h-full flex flex-col">
                    <div className="w-full aspect-square rounded-xl bg-secondary/30 mb-5" />
                    <div className="h-3 bg-secondary/50 rounded w-1/3 mb-2" />
                    <div className="h-4 bg-secondary/50 rounded w-2/3 mb-4" />
                    <div className="mt-auto pt-5 border-t border-border/20 flex justify-between">
                      <div className="h-6 bg-secondary/50 rounded w-1/4" />
                      <div className="h-8 bg-secondary/50 rounded w-1/3" />
                    </div>
                  </div>
                </div>
              ))
            : products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="rounded-2xl glass-card group cursor-pointer"
                >
                  <div className="p-5 rounded-2xl h-full flex flex-col">
                    <div className="w-full aspect-square rounded-xl bg-secondary/50 flex items-center justify-center mb-5 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                        width={512}
                        height={512}
                        className="w-3/5 h-3/5 object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-[10px] font-semibold text-primary uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                        {product.category}
                      </span>
                    </div>

                    <h3
                      className="text-sm font-bold text-foreground mb-1 tracking-tight"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {product.title}
                    </h3>

                    <div className="mt-auto pt-5 flex items-center justify-between border-t border-border/20">
                      <span
                        className="text-xl font-bold text-gradient-cyan"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        ${product.price.toFixed(2)}
                      </span>
                      <button className="px-4 py-2 text-xs font-semibold bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all flex items-center gap-1.5 hover:shadow-[0_0_16px_hsl(var(--primary)/0.4)]">
                        <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default EcommerceSection;
