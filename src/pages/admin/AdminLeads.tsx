import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LeadForm {
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  status: string;
  notes: string;
}

const empty: LeadForm = { company_name: "", contact_person: "", email: "", phone: "", status: "new", notes: "" };

const statusColors: Record<string, string> = {
  new: "bg-rh-blue/10 text-rh-blue",
  contacted: "bg-amber-500/10 text-amber-600",
  qualified: "bg-rh-green/10 text-rh-green",
  proposal: "bg-primary/10 text-primary",
  won: "bg-rh-green/15 text-rh-green",
  lost: "bg-destructive/10 text-destructive",
};

const AdminLeads = () => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<LeadForm>(empty);
  const [showAdd, setShowAdd] = useState(false);

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const { data, error } = await supabase.from("crm_leads").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const upsert = useMutation({
    mutationFn: async ({ id, form }: { id?: string; form: LeadForm }) => {
      const payload = {
        company_name: form.company_name,
        contact_person: form.contact_person || null,
        email: form.email || null,
        phone: form.phone || null,
        status: form.status,
        notes: form.notes || null,
      };
      if (id) {
        const { error } = await supabase.from("crm_leads").update(payload).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("crm_leads").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-leads"] });
      setEditing(null);
      setShowAdd(false);
      setForm(empty);
      toast({ title: "Lead saved!" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("crm_leads").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-leads"] });
      toast({ title: "Lead deleted" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const startEdit = (l: any) => {
    setEditing(l.id);
    setShowAdd(false);
    setForm({
      company_name: l.company_name,
      contact_person: l.contact_person || "",
      email: l.email || "",
      phone: l.phone || "",
      status: l.status,
      notes: l.notes || "",
    });
  };

  const inputCls = "w-full px-3 py-2 text-sm rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-all";

  const FormRow = ({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) => (
    <tr className="border-b border-border/10 bg-primary/5">
      <td className="p-3"><input className={inputCls} placeholder="Company" value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} /></td>
      <td className="p-3"><input className={inputCls} placeholder="Contact" value={form.contact_person} onChange={(e) => setForm({ ...form, contact_person: e.target.value })} /></td>
      <td className="p-3"><input className={inputCls} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></td>
      <td className="p-3"><input className={inputCls} placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></td>
      <td className="p-3">
        <select className={inputCls} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          {["new", "contacted", "qualified", "proposal", "won", "lost"].map((s) => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </td>
      <td className="p-3">
        <div className="flex gap-2">
          <button onClick={onSave} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"><Save className="w-4 h-4" /></button>
          <button onClick={onCancel} className="p-2 rounded-lg border border-border/30 text-muted-foreground hover:text-foreground transition-all"><X className="w-4 h-4" /></button>
        </div>
      </td>
    </tr>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>CRM Leads</h2>
        <button
          onClick={() => { setShowAdd(true); setEditing(null); setForm(empty); }}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      <div className="rounded-2xl border border-border/20 bg-card/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/20 bg-secondary/30">
                <th className="text-left p-3 font-semibold text-muted-foreground">Company</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Contact</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Email</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Phone</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Status</th>
                <th className="text-left p-3 font-semibold text-muted-foreground w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {showAdd && (
                <FormRow
                  onSave={() => upsert.mutate({ form })}
                  onCancel={() => { setShowAdd(false); setForm(empty); }}
                />
              )}
              {leads.map((l) =>
                editing === l.id ? (
                  <FormRow
                    key={l.id}
                    onSave={() => upsert.mutate({ id: l.id, form })}
                    onCancel={() => { setEditing(null); setForm(empty); }}
                  />
                ) : (
                  <tr key={l.id} className="border-b border-border/10 hover:bg-secondary/20 transition-colors">
                    <td className="p-3 font-medium text-foreground">{l.company_name}</td>
                    <td className="p-3 text-foreground">{l.contact_person || "—"}</td>
                    <td className="p-3 text-muted-foreground text-xs">{l.email || "—"}</td>
                    <td className="p-3 text-muted-foreground text-xs">{l.phone || "—"}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${statusColors[l.status] || ""}`}>{l.status}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1.5">
                        <button onClick={() => startEdit(l)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => deleteMut.mutate(l.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                )
              )}
              {!isLoading && leads.length === 0 && !showAdd && (
                <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No leads yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLeads;
