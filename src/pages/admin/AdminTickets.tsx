import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const priorityColors: Record<string, string> = {
  low: "bg-rh-green/10 text-rh-green",
  medium: "bg-amber-500/10 text-amber-600",
  high: "bg-rh-orange/10 text-rh-orange",
  urgent: "bg-destructive/10 text-destructive",
};

const statusColors: Record<string, string> = {
  open: "bg-rh-blue/10 text-rh-blue",
  "in-progress": "bg-amber-500/10 text-amber-600",
  resolved: "bg-rh-green/10 text-rh-green",
  closed: "bg-muted text-muted-foreground",
};

const AdminTickets = () => {
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["admin-tickets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("support_tickets")
        .select("*, profiles(full_name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateTicket = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Record<string, string> }) => {
      const { error } = await supabase.from("support_tickets").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-tickets"] });
      toast({ title: "Ticket updated" });
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Support Tickets</h2>

      <div className="rounded-2xl border border-border/20 bg-card/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/20 bg-secondary/30">
                <th className="text-left p-3 font-semibold text-muted-foreground">Subject</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Customer</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Priority</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Status</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Date</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t: any) => (
                <tr key={t.id} className="border-b border-border/10 hover:bg-secondary/20 transition-colors">
                  <td className="p-3">
                    <div className="font-medium text-foreground">{t.subject}</div>
                    {t.description && <div className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs">{t.description}</div>}
                  </td>
                  <td className="p-3 text-foreground">{t.profiles?.full_name || "—"}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${priorityColors[t.priority] || ""}`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${statusColors[t.status] || ""}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground text-xs">{new Date(t.created_at).toLocaleDateString()}</td>
                  <td className="p-3">
                    <select
                      value={t.status}
                      onChange={(e) => updateTicket.mutate({ id: t.id, updates: { status: e.target.value } })}
                      className="px-2 py-1.5 text-xs rounded-lg bg-secondary/50 border border-border text-foreground focus:outline-none focus:border-primary/40"
                    >
                      {["open", "in-progress", "resolved", "closed"].map((s) => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {!isLoading && tickets.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No tickets yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTickets;
