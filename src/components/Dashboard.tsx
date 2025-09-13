import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  FileText, 
  Mail, 
  Upload, 
  MessageSquare, 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Filter,
  MoreHorizontal,
  User,
  LogOut,
  Bell,
  Globe,
  Mic
} from "lucide-react";
import { DocumentCard } from "./DocumentCard";
import { DocumentViewer } from "./DocumentViewer";
import { Header } from "./Header";

interface DashboardProps {
  userRole: string;
  onLogout: () => void;
}

const mockDocuments = [
  {
    id: "1",
    title: "Safety Protocol Update - Station Platform Guidelines",
    source: "email",
    type: "pdf",
    sender: "safety@kochimetro.org",
    date: "2024-01-15",
    urgency: "high",
    status: "pending",
    summary: "Updated safety protocols for platform operations including crowd management and emergency procedures.",
    department: "operations",
    size: "2.4 MB"
  },
  {
    id: "2",
    title: "Monthly Maintenance Report - January 2024",
    source: "upload",
    type: "docx",
    sender: "Maintenance Team",
    date: "2024-01-14",
    urgency: "medium",
    status: "approved",
    summary: "Comprehensive maintenance report covering all train units and infrastructure checks for January.",
    department: "maintenance",
    size: "1.8 MB"
  },
  {
    id: "3",
    title: "Employee Leave Application - Rajesh Kumar",
    source: "whatsapp",
    type: "image",
    sender: "+91 9876543210",
    date: "2024-01-13",
    urgency: "low",
    status: "processing",
    summary: "Leave application for medical reasons from January 20-25, 2024.",
    department: "hr",
    size: "245 KB"
  },
  {
    id: "4",
    title: "Budget Allocation Request - Q1 2024",
    source: "cloud",
    type: "xlsx",
    sender: "finance.head@kochimetro.org",
    date: "2024-01-12",
    urgency: "high",
    status: "review",
    summary: "Quarterly budget allocation request for infrastructure upgrades and operational expenses.",
    department: "finance",
    size: "956 KB"
  },
  {
    id: "5",
    title: "Passenger Feedback Analysis Report",
    source: "scan",
    type: "pdf",
    sender: "Customer Relations",
    date: "2024-01-11",
    urgency: "medium",
    status: "completed",
    summary: "Analysis of passenger feedback from December 2023 including satisfaction scores and improvement suggestions.",
    department: "operations",
    size: "3.2 MB"
  }
];

export const Dashboard = ({ userRole, onLogout }: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [language, setLanguage] = useState("en");

  // Filter documents based on role
  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesRole = userRole === "admin" || doc.department === userRole || userRole === "guest";
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "warning";
      case "approved": return "success";
      case "processing": return "info";
      case "review": return "primary";
      case "completed": return "success";
      default: return "secondary";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "danger";
      case "medium": return "warning";
      case "low": return "success";
      default: return "secondary";
    }
  };

  if (selectedDocument) {
    return (
      <DocumentViewer 
        document={selectedDocument} 
        onBack={() => setSelectedDocument(null)}
        userRole={userRole}
        language={language}
      />
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header userRole={userRole} onLogout={onLogout} language={language} setLanguage={setLanguage} />
      
      {/* Main Content */}
      <main className="container mx-auto p-4 pt-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="gradient-card border-0 shadow-professional">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                  <p className="text-2xl font-bold text-primary">{filteredDocuments.length}</p>
                </div>
                <FileText className="w-8 h-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-0 shadow-professional">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold text-warning">
                    {filteredDocuments.filter(d => d.status === "pending" || d.status === "review").length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-warning/60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-0 shadow-professional">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold text-danger">
                    {filteredDocuments.filter(d => d.urgency === "high").length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-danger/60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-0 shadow-professional">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-success">
                    {filteredDocuments.filter(d => d.status === "completed" || d.status === "approved").length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-success/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 shadow-professional">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder={language === "en" ? "Search documents..." : "ഡോക്യുമെന്റുകൾ തിരയുക..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="transition-smooth">
                <Filter className="w-4 h-4 mr-2" />
                {language === "en" ? "Filters" : "ഫിൽട്ടറുകൾ"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Document Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all">
              {language === "en" ? "All Documents" : "എല്ലാ പ്രമാണങ്ങളും"}
            </TabsTrigger>
            <TabsTrigger value="pending">
              {language === "en" ? "Pending" : "കാത്തിരിക്കുന്നവ"}
            </TabsTrigger>
            <TabsTrigger value="urgent">
              {language === "en" ? "Urgent" : "അത്യാവശ്യം"}
            </TabsTrigger>
            <TabsTrigger value="recent">
              {language === "en" ? "Recent" : "പുതിയവ"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredDocuments.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {language === "en" ? "No documents found" : "പ്രമാണങ്ങൾ കണ്ടെത്തിയില്ല"}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === "en" 
                      ? "Try adjusting your search criteria or check back later." 
                      : "നിങ്ങളുടെ തിരയൽ മാനദണ്ഡങ്ങൾ ക്രമീകരിക്കുക അല്ലെങ്കിൽ പിന്നീട് പരിശോധിക്കുക."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    onClick={() => setSelectedDocument(doc)}
                    userRole={userRole}
                    language={language}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};