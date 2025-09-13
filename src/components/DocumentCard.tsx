import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Mail, 
  Upload, 
  MessageSquare, 
  Scan,
  Cloud,
  Calendar,
  User,
  MoreHorizontal,
  Eye,
  MessageCircle,
  Clock
} from "lucide-react";

interface DocumentCardProps {
  document: {
    id: string;
    title: string;
    source: string;
    type: string;
    sender: string;
    date: string;
    urgency: string;
    status: string;
    summary: string;
    department: string;
    size: string;
  };
  onClick: () => void;
  userRole: string;
  language: string;
}

const sourceIcons = {
  email: Mail,
  upload: Upload,
  whatsapp: MessageSquare,
  scan: Scan,
  cloud: Cloud
};

const typeColors = {
  pdf: "bg-danger/10 text-danger",
  docx: "bg-info/10 text-info", 
  xlsx: "bg-success/10 text-success",
  image: "bg-warning/10 text-warning",
  default: "bg-muted/10 text-muted-foreground"
};

export const DocumentCard = ({ document, onClick, userRole, language }: DocumentCardProps) => {
  const SourceIcon = sourceIcons[document.source as keyof typeof sourceIcons] || FileText;
  
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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === "en" ? "en-US" : "ml-IN", {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const translations = {
    status: {
      pending: language === "en" ? "Pending" : "കാത്തിരിക്കുന്നു",
      approved: language === "en" ? "Approved" : "അംഗീകരിച്ചു",
      processing: language === "en" ? "Processing" : "പ്രോസസ്സിംഗ്",
      review: language === "en" ? "Review" : "അവലോകനം",
      completed: language === "en" ? "Completed" : "പൂർത്തിയായി"
    },
    urgency: {
      high: language === "en" ? "High Priority" : "ഉയർന്ന മുൻഗണന",
      medium: language === "en" ? "Medium" : "ഇടത്തരം",
      low: language === "en" ? "Low" : "കുറഞ്ഞത്"
    }
  };

  return (
    <Card 
      className="gradient-card hover:shadow-lg transition-smooth cursor-pointer border-0 group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <SourceIcon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <Badge 
                variant="outline" 
                className={`text-xs ${typeColors[document.type as keyof typeof typeColors] || typeColors.default}`}
              >
                {document.type.toUpperCase()}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-smooth">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-smooth">
          {document.title}
        </h3>
      </CardHeader>

      <CardContent className="pt-0 space-y-3">
        {/* Summary */}
        <p className="text-xs text-muted-foreground line-clamp-2">
          {document.summary}
        </p>

        {/* Metadata */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="w-3 h-3" />
            <span className="truncate">{document.sender}</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(document.date)}</span>
            <span className="ml-auto">{document.size}</span>
          </div>
        </div>

        {/* Status and Urgency Badges */}
        <div className="flex items-center justify-between">
          <Badge variant={getStatusColor(document.status) as any} className="text-xs">
            {translations.status[document.status as keyof typeof translations.status] || document.status}
          </Badge>
          
          <Badge variant={getUrgencyColor(document.urgency) as any} className="text-xs">
            {translations.urgency[document.urgency as keyof typeof translations.urgency] || document.urgency}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-border/50">
          <Button variant="ghost" size="sm" className="flex-1 text-xs">
            <Eye className="w-3 h-3 mr-1" />
            {language === "en" ? "View" : "കാണുക"}
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 text-xs">
            <MessageCircle className="w-3 h-3 mr-1" />
            {language === "en" ? "Q&A" : "ചോദ്യോത്തരം"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};