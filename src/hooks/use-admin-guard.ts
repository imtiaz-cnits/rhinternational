import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook that checks if the current user has the 'admin' role.
 * Redirects to home if not admin.
 */
export const useAdminGuard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/auth");
      return;
    }

    const checkRole = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (data?.role !== "admin" && data?.role !== "editor") {
        navigate("/");
      } else {
        setIsAdmin(true);
      }
      setChecking(false);
    };

    checkRole();
  }, [user, authLoading, navigate]);

  return { isAdmin, checking: checking || authLoading };
};
