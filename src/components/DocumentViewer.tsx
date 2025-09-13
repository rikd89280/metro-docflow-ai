import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Download, 
  Share, 
  MessageCircle, 
  Send, 
  Mic, 
  Volume2,
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  Calendar,
  FileText,
  Eye,
  ThumbsUp,
  MessageSquare,
  Forward,
  Flag,
  History,
  Zap
} from "lucide-react";

interface DocumentViewerProps {
  document: any;
  onBack: () => void;
  userRole: string;
  language: string;
}

export const DocumentViewer = ({ document, onBack, userRole, language }: DocumentViewerProps) => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "ai",
      message: language === "en" 
        ? "I've analyzed this document. Ask me anything about its content!" 
        : "ഞാൻ ഈ പ്രമാണം വിശകലനം ചെയ്തു. ഇതിന്റെ ഉള്ളടക്കത്തെക്കുറിച്ച് എന്നോട് എന്തെങ്കിലും ചോദിക്കുക!",
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [actionComment, setActionComment] = useState("");

  const sendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: "user",
      message: currentMessage,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: "ai",
        message: getAIResponse(currentMessage),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
    
    setCurrentMessage("");
  };

  const getAIResponse = (question: string) => {
    if (language === "ml") {
      if (question.toLowerCase().includes("date") || question.toLowerCase().includes("when")) {
        return "ഈ പ്രമാണം 2024 ജനുവരി 15-ന് സൃഷ്ടിച്ചതാണ്. ഇത് സുരക്ഷാ പ്രോട്ടോക്കോൾ അപ്ഡേറ്റുകളെക്കുറിച്ചാണ്.";
      }
      return "ക്ഷമിക്കണം, എനിക്ക് ആ വിവരം കൃത്യമായി കണ്ടെത്താൻ കഴിഞ്ഞില്ല. കൂടുതൽ വ്യക്തമായ ചോദ്യം ചോദിക്കാമോ?";
    }
    
    if (question.toLowerCase().includes("summary")) {
      return "This document outlines updated safety protocols for platform operations, including crowd management during peak hours and emergency evacuation procedures. Key changes include new signage requirements and staff positioning guidelines.";
    }
    if (question.toLowerCase().includes("date") || question.toLowerCase().includes("when")) {
      return "This document was created on January 15, 2024, and contains safety protocol updates that need to be implemented by February 1, 2024.";
    }
    if (question.toLowerCase().includes("who") || question.toLowerCase().includes("responsible")) {
      return "The document was issued by the Safety Department and requires approval from the Operations Manager. Implementation is the responsibility of Station Supervisors.";
    }
    return "I found relevant information in the document. Could you be more specific about what you'd like to know about this safety protocol update?";
  };

  const handleAction = (action: string) => {
    // Simulate workflow action
    console.log(`${action} action taken on document ${document.id} by ${userRole}`);
  };

  const auditTrail = [
    {
      id: 1,
      action: "Document Uploaded",
      user: "safety@kochimetro.org",
      timestamp: "2024-01-15 10:30 AM",
      details: "Safety protocol document uploaded via email"
    },
    {
      id: 2,
      action: "AI Analysis Completed",
      user: "System",
      timestamp: "2024-01-15 10:31 AM", 
      details: "Document processed and summary generated"
    },
    {
      id: 3,
      action: "Assigned for Review",
      user: "System",
      timestamp: "2024-01-15 10:32 AM",
      details: "Automatically assigned to Operations department"
    },
    {
      id: 4,
      action: "Viewed",
      user: "KMRL001 (You)",
      timestamp: "2024-01-15 02:45 PM",
      details: "Document opened for review"
    }
  ];

  const extractedInfo = {
    dates: ["2024-01-15", "2024-02-01"],
    amounts: [],
    departments: ["Safety", "Operations", "Station Management"],
    keyPersons: ["Operations Manager", "Station Supervisors"],
    priority: "High",
    deadline: "2024-02-01",
    tags: ["Safety", "Protocol", "Platform", "Emergency"]
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="gradient-primary shadow-professional">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === "en" ? "Back to Dashboard" : "ഡാഷ്ബോർഡിലേക്ക് മടങ്ങുക"}
              </Button>
              <div>
                <h1 className="text-xl font-bold text-white">{document.title}</h1>
                <p className="text-white/70 text-sm">
                  {language === "en" ? "Document Viewer & AI Assistant" : "പ്രമാണം കാഴ്ചക്കാരനും AI സഹായിയും"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                {language === "en" ? "Download" : "ഡൗൺലോഡ്"}
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <Share className="w-4 h-4 mr-2" />
                {language === "en" ? "Share" : "പങ്കിടുക"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Document Info */}
            <Card className="shadow-professional">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    {language === "en" ? "Document Details" : "പ്രമാണത്തിന്റെ വിശദാംശങ്ങൾ"}
                  </CardTitle>
                  <Badge variant="info">
                    {document.type.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {language === "en" ? "Sender:" : "അയച്ചയാൾ:"}
                    </span>
                    <p>{document.sender}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {language === "en" ? "Date:" : "തീയതി:"}
                    </span>
                    <p>{document.date}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {language === "en" ? "Size:" : "വലുപ്പം:"}
                    </span>
                    <p>{document.size}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">
                      {language === "en" ? "Department:" : "വകുപ്പ്:"}
                    </span>
                    <p className="capitalize">{document.department}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">
                    {language === "en" ? "AI Summary:" : "AI സംഗ്രഹം:"}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {document.summary}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Document Preview */}
            <Card className="shadow-professional">
              <CardHeader>
                <CardTitle>
                  {language === "en" ? "Document Preview" : "പ്രമാണ പ്രിവ്യൂ"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-6 min-h-96 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">
                      {language === "en" ? "Document Preview" : "പ്രമാണ പ്രിവ്യൂ"}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {language === "en" 
                        ? "Full document content would be displayed here" 
                        : "പൂർണ്ണ പ്രമാണ ഉള്ളടക്കം ഇവിടെ പ്രദർശിപ്പിക്കും"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Q&A Panel */}
            <Card className="shadow-professional">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-accent" />
                  {language === "en" ? "AI Document Assistant" : "AI പ്രമാണ സഹായി"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {msg.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder={language === "en" ? "Ask about this document..." : "ഈ പ്രമാണത്തെക്കുറിച്ച് ചോദിക്കുക..."}
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    <Mic className={`w-4 h-4 mr-2 ${isRecording ? 'text-danger' : ''}`} />
                    {isRecording 
                      ? (language === "en" ? "Stop Recording" : "റെക്കോർഡിംഗ് നിർത്തുക")
                      : (language === "en" ? "Voice Question" : "ശബ്ദ ചോദ്യം")
                    }
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Center */}
            <Card className="shadow-professional">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-warning" />
                  {language === "en" ? "Action Center" : "പ്രവർത്തന കേന്ദ്രം"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="success" 
                    size="sm" 
                    onClick={() => handleAction('approve')}
                    disabled={userRole === 'guest'}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {language === "en" ? "Approve" : "അംഗീകരിക്കുക"}
                  </Button>
                  <Button 
                    variant="warning" 
                    size="sm"
                    onClick={() => handleAction('review')}
                    disabled={userRole === 'guest'}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    {language === "en" ? "Review" : "അവലോകനം"}
                  </Button>
                  <Button 
                    variant="info" 
                    size="sm"
                    onClick={() => handleAction('forward')}
                    disabled={userRole === 'guest'}
                  >
                    <Forward className="w-4 h-4 mr-1" />
                    {language === "en" ? "Forward" : "കൈമാറുക"}
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleAction('escalate')}
                    disabled={userRole === 'guest'}
                  >
                    <Flag className="w-4 h-4 mr-1" />
                    {language === "en" ? "Escalate" : "ഉയർത്തുക"}
                  </Button>
                </div>
                
                <Textarea
                  placeholder={language === "en" ? "Add your comment..." : "നിങ്ങളുടെ കമന്റ് ചേർക്കുക..."}
                  value={actionComment}
                  onChange={(e) => setActionComment(e.target.value)}
                  className="min-h-20"
                />
              </CardContent>
            </Card>

            {/* Extracted Information */}
            <Card className="shadow-professional">
              <CardHeader>
                <CardTitle>
                  {language === "en" ? "Extracted Information" : "വേർതിരിച്ചെടുത്ത വിവരങ്ങൾ"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {language === "en" ? "Key Dates:" : "പ്രധാന തീയതികൾ:"}
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {extractedInfo.dates.map((date, i) => (
                      <Badge key={i} variant="outline" className="text-xs">{date}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {language === "en" ? "Departments:" : "വകുപ്പുകൾ:"}
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {extractedInfo.departments.map((dept, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{dept}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {language === "en" ? "Priority:" : "മുൻഗണന:"}
                  </span>
                  <Badge variant="danger" className="ml-2 text-xs">{extractedInfo.priority}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Audit Trail */}
            <Card className="shadow-professional">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5 text-info" />
                  {language === "en" ? "Audit Trail" : "ഓഡിറ്റ് ട്രയൽ"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auditTrail.map((entry) => (
                    <div key={entry.id} className="flex gap-3 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium">{entry.action}</p>
                        <p className="text-muted-foreground text-xs">{entry.user}</p>
                        <p className="text-muted-foreground text-xs">{entry.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};