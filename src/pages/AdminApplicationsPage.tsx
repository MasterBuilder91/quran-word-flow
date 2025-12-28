import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Loader2, User, Mail, Clock, FileText, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface Application {
  id: string;
  created_at: string;
  application_type: string;
  full_name: string;
  email: string;
  arabic_background: string;
  years_experience: number | null;
  why_apply: string;
  status: string;
  admin_notes: string | null;
}

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAndFetch();
  }, []);

  const checkAdminAndFetch = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    // Check if user is admin
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to view this page.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsAdmin(true);
    fetchApplications();
  };

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching applications:", error);
      toast({
        title: "Error",
        description: "Failed to load applications.",
        variant: "destructive",
      });
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(true);
    const { error } = await supabase
      .from("applications")
      .update({ status: newStatus, admin_notes: adminNotes || null })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update application.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Updated",
        description: `Application marked as ${newStatus}.`,
      });
      fetchApplications();
      setSelectedApp(null);
      setAdminNotes("");
    }
    setUpdating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "reviewing": return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      case "accepted": return "bg-green-500/20 text-green-500 border-green-500/30";
      case "rejected": return "bg-red-500/20 text-red-500 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Admin: Applications | Quranic Arabic Lab</title>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-24 pb-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Applications</h1>
              <p className="text-muted-foreground">Review coaching and career applications</p>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No applications yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className={`bg-card border rounded-xl p-6 cursor-pointer transition-all hover:border-gold/50 ${
                    selectedApp?.id === app.id ? "border-gold" : "border-border"
                  }`}
                  onClick={() => {
                    setSelectedApp(app);
                    setAdminNotes(app.admin_notes || "");
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-foreground truncate">
                          {app.full_name}
                        </h3>
                        <Badge variant="outline" className={getStatusColor(app.status)}>
                          {app.status}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {app.application_type}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {app.email}
                        </span>
                        {app.years_experience !== null && (
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {app.years_experience} years experience
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {format(new Date(app.created_at), "MMM d, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedApp?.id === app.id && (
                    <div className="mt-6 pt-6 border-t border-border space-y-4" onClick={(e) => e.stopPropagation()}>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Arabic Background:</h4>
                        <p className="text-muted-foreground whitespace-pre-wrap">{app.arabic_background}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Why They Want to Apply:</h4>
                        <p className="text-muted-foreground whitespace-pre-wrap">{app.why_apply}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Admin Notes:</h4>
                        <Textarea
                          value={adminNotes}
                          onChange={(e) => setAdminNotes(e.target.value)}
                          placeholder="Add notes about this application..."
                          rows={3}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={updating}
                          onClick={() => updateStatus(app.id, "reviewing")}
                        >
                          Mark Reviewing
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          disabled={updating}
                          onClick={() => updateStatus(app.id, "accepted")}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={updating}
                          onClick={() => updateStatus(app.id, "rejected")}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AdminApplicationsPage;
