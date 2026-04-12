import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600",
  processing: "bg-rh-blue/10 text-rh-blue",
  shipped: "bg-primary/10 text-primary",
  delivered: "bg-rh-green/10 text-rh-green",
  cancelled: "bg-destructive/10 text-destructive",
};

const AdminOrders = () => {
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, profiles(full_name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      toast({ title: "Order updated" });
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Orders</h2>

      <div className="rounded-2xl border border-border/20 bg-card/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/20 bg-secondary/30">
                <th className="text-left p-3 font-semibold text-muted-foreground">Order ID</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Customer</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Total</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Status</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Date</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id} className="border-b border-border/10 hover:bg-secondary/20 transition-colors">
                  <td className="p-3 font-mono text-xs text-foreground">#{order.id.slice(0, 8)}</td>
                  <td className="p-3 text-foreground">{order.profiles?.full_name || "—"}</td>
                  <td className="p-3 font-semibold text-foreground">${Number(order.total_amount).toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${statusColors[order.status] || "bg-secondary text-muted-foreground"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground text-xs">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus.mutate({ id: order.id, status: e.target.value })}
                      className="px-2 py-1.5 text-xs rounded-lg bg-secondary/50 border border-border text-foreground focus:outline-none focus:border-primary/40"
                    >
                      {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {!isLoading && orders.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
