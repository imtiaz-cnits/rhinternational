import pvcCardImg from "@/assets/products/pvc-card.png";
import toteBagImg from "@/assets/products/tote-bag.png";
import seoRocketImg from "@/assets/products/seo-rocket.png";
import businessCardImg from "@/assets/products/business-card.png";
import webDevImg from "@/assets/products/web-dev.png";
import visaTravelImg from "@/assets/products/visa-travel.png";
import { Sparkles, TrendingUp, Zap, Star } from "lucide-react";

/** Map SKU → bundled image so Supabase products resolve local assets */
export const productImageMap: Record<string, string> = {
  "PVC-001": pvcCardImg,
  "TOTE-001": toteBagImg,
  "SEO-001": seoRocketImg,
  "BIZ-001": businessCardImg,
  "WEB-001": webDevImg,
  "VISA-001": visaTravelImg,
};

export const categories = ["All", "Printing", "Digital", "Service"];

export const categoryGradients: Record<string, string> = {
  Printing: "from-rh-blue to-[hsl(210_60%_40%)]",
  Digital: "from-rh-green to-[hsl(140_50%_35%)]",
  Service: "from-rh-orange to-[hsl(20_85%_50%)]",
};

export const categoryBgGlow: Record<string, string> = {
  Printing: "hsl(var(--rh-blue)/0.08)",
  Digital: "hsl(var(--rh-green)/0.08)",
  Service: "hsl(var(--rh-orange)/0.08)",
};

export const badgeIcons: Record<string, typeof Sparkles> = {
  Popular: TrendingUp,
  Trending: Zap,
  "Best Value": Sparkles,
  Premium: Star,
  "Top Rated": Star,
};
