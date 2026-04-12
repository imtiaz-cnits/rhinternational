import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { productImageMap } from "@/data/products";

export interface SupabaseProduct {
  id: string;
  title: string;
  description: string | null;
  price: number;
  sku: string | null;
  category: string | null;
  image_url: string | null;
  stock: number;
  status: string;
  created_at: string;
  updated_at: string;
  /** Resolved local image (fallback for bundled assets) */
  image: string;
}

const resolveImage = (p: { sku: string | null; image_url: string | null }): string => {
  if (p.sku && productImageMap[p.sku]) return productImageMap[p.sku];
  return p.image_url ?? "/placeholder.svg";
};

export const useProducts = () =>
  useQuery<SupabaseProduct[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) throw error;
      return (data ?? []).map((p) => ({
        ...p,
        price: Number(p.price),
        image: resolveImage(p),
      }));
    },
  });

export const useProduct = (id: string | undefined) =>
  useQuery<SupabaseProduct | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return { ...data, price: Number(data.price), image: resolveImage(data) };
    },
    enabled: !!id,
  });
