import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Plus, Search, MoreHorizontal, Pencil, Copy, Trash2,
  ImageIcon, Package, X, Save, Filter,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter,
} from "@/components/ui/sheet";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface ProductRow {
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
}

interface ProductForm {
  title: string;
  description: string;
  price: string;
  sku: string;
  category: string;
  image_url: string;
  stock: string;
  status: string;
}

const empty: ProductForm = {
  title: "", description: "", price: "", sku: "",
  category: "Printing", image_url: "", stock: "0", status: "active",
};

const CATEGORIES = ["Printing", "Digital", "Service"];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

const AdminProducts = () => {
  const { toast } = useToast();
  const qc = useQueryClient();

  /* ---------- state ---------- */
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(empty);

  /* ---------- data ---------- */
  const { data: products = [], isLoading } = useQuery<ProductRow[]>({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ProductRow[];
    },
  });

  const filtered = useMemo(() => {
    let list = products;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.sku && p.sku.toLowerCase().includes(q)),
      );
    }
    if (catFilter !== "all") list = list.filter((p) => p.category === catFilter);
    if (statusFilter !== "all") list = list.filter((p) => p.status === statusFilter);
    return list;
  }, [products, search, catFilter, statusFilter]);

  /* ---------- mutations ---------- */
  const upsert = useMutation({
    mutationFn: async ({ id, form: f }: { id?: string; form: ProductForm }) => {
      const payload = {
        title: f.title,
        description: f.description || null,
        price: parseFloat(f.price),
        sku: f.sku || null,
        category: f.category || null,
        image_url: f.image_url || null,
        stock: parseInt(f.stock, 10) || 0,
        status: f.status,
      };
      if (id) {
        const { error } = await supabase.from("products").update(payload).eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["products"] });
      closeSheet();
      toast({ title: "Product saved!" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Product deleted" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  /* ---------- helpers ---------- */
  const openAdd = () => {
    setEditingId(null);
    setForm(empty);
    setSheetOpen(true);
  };

  const openEdit = (p: ProductRow) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      description: p.description || "",
      price: String(p.price),
      sku: p.sku || "",
      category: p.category || "Printing",
      image_url: p.image_url || "",
      stock: String(p.stock),
      status: p.status,
    });
    setSheetOpen(true);
  };

  const duplicate = (p: ProductRow) => {
    setEditingId(null);
    setForm({
      title: `${p.title} (Copy)`,
      description: p.description || "",
      price: String(p.price),
      sku: p.sku ? `${p.sku}-COPY` : "",
      category: p.category || "Printing",
      image_url: p.image_url || "",
      stock: String(p.stock),
      status: "draft",
    });
    setSheetOpen(true);
  };

  const closeSheet = () => {
    setSheetOpen(false);
    setEditingId(null);
    setForm(empty);
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((p) => p.id)));
    }
  };

  const handleSave = () => {
    if (!form.title || !form.price) {
      toast({ title: "Title and Price are required", variant: "destructive" });
      return;
    }
    upsert.mutate({ id: editingId ?? undefined, form });
  };

  const set = (key: keyof ProductForm, val: string) => setForm((f) => ({ ...f, [key]: val }));

  /* ---------- render ---------- */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Products
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {products.length} total &middot; {filtered.length} shown
          </p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* CONTROLS BAR */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products by title or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger className="w-[160px]">
            <Filter className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* BULK ACTIONS */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
          <span className="text-sm font-medium text-foreground">{selected.size} selected</span>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              selected.forEach((id) => deleteMut.mutate(id));
              setSelected(new Set());
            }}
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete Selected
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())}>
            Clear
          </Button>
        </div>
      )}

      {/* TABLE */}
      <div className="rounded-2xl border border-border/20 bg-card/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/30 hover:bg-secondary/30">
              <TableHead className="w-10">
                <Checkbox
                  checked={filtered.length > 0 && selected.size === filtered.length}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead className="w-14">Image</TableHead>
              <TableHead>Title & SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-14 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">Loading…</TableCell>
              </TableRow>
            )}
            {!isLoading && filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12">
                  <Package className="w-10 h-10 mx-auto mb-2 text-muted-foreground/40" />
                  <p className="text-muted-foreground">No products found</p>
                </TableCell>
              </TableRow>
            )}
            {filtered.map((p) => (
              <TableRow key={p.id} className="group">
                <TableCell>
                  <Checkbox
                    checked={selected.has(p.id)}
                    onCheckedChange={() => toggleSelect(p.id)}
                  />
                </TableCell>
                <TableCell>
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="w-10 h-10 rounded-lg object-cover border border-border/30"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-secondary/60 flex items-center justify-center border border-border/30">
                      <ImageIcon className="w-4 h-4 text-muted-foreground/50" />
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <p className="font-medium text-foreground leading-tight">{p.title}</p>
                  {p.sku && <p className="text-xs text-muted-foreground font-mono mt-0.5">{p.sku}</p>}
                </TableCell>
                <TableCell>
                  {p.category && (
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground">
                      {p.category}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right font-semibold text-foreground tabular-nums">
                  ${Number(p.price).toFixed(2)}
                </TableCell>
                <TableCell className={`text-right font-medium tabular-nums ${p.stock < 5 ? "text-destructive" : "text-foreground"}`}>
                  {p.stock}
                </TableCell>
                <TableCell>
                  <Badge variant={p.status === "active" ? "default" : "secondary"} className={p.status === "active" ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20" : ""}>
                    {p.status === "active" ? "Active" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(p)}>
                        <Pencil className="w-3.5 h-3.5 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => duplicate(p)}>
                        <Copy className="w-3.5 h-3.5 mr-2" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => deleteMut.mutate(p.id)}
                      >
                        <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* SHEET (Add / Edit) */}
      <Sheet open={sheetOpen} onOpenChange={(o) => { if (!o) closeSheet(); }}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingId ? "Edit Product" : "Add New Product"}</SheetTitle>
            <SheetDescription>
              {editingId ? "Update the product details below." : "Fill in the details for the new product."}
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6 py-6">
            {/* Image placeholder */}
            <div>
              <Label className="text-sm font-medium">Product Image</Label>
              <div className="mt-2 border-2 border-dashed border-border/40 rounded-xl p-8 flex flex-col items-center justify-center gap-2 bg-secondary/20">
                {form.image_url ? (
                  <img src={form.image_url} alt="Preview" className="w-24 h-24 rounded-lg object-cover" />
                ) : (
                  <ImageIcon className="w-10 h-10 text-muted-foreground/40" />
                )}
                <p className="text-xs text-muted-foreground">Image upload coming soon</p>
                <Input
                  placeholder="Or paste image URL..."
                  value={form.image_url}
                  onChange={(e) => set("image_url", e.target.value)}
                  className="mt-2 max-w-xs"
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Basic Information</h4>
              <div className="grid gap-3">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input id="title" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Product title" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" value={form.sku} onChange={(e) => set("sku", e.target.value)} placeholder="SKU-001" />
                  </div>
                  <div>
                    <Label htmlFor="price">Price *</Label>
                    <Input id="price" type="number" step="0.01" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" value={form.stock} onChange={(e) => set("stock", e.target.value)} placeholder="0" />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Detailed Information</h4>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Write a detailed product description..."
                rows={5}
              />
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Settings</h4>
              <div>
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => set("category", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border/30 p-3">
                <div>
                  <Label className="text-sm">Active</Label>
                  <p className="text-xs text-muted-foreground">Product is visible in the shop</p>
                </div>
                <Switch
                  checked={form.status === "active"}
                  onCheckedChange={(c) => set("status", c ? "active" : "draft")}
                />
              </div>
            </div>
          </div>

          <SheetFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={closeSheet}>Cancel</Button>
            <Button onClick={handleSave} disabled={upsert.isPending} className="gap-2">
              <Save className="w-4 h-4" /> {editingId ? "Update" : "Create"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;
