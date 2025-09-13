import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Train, Shield, Users, FileText, Settings, Eye } from "lucide-react";

interface LoginProps {
  onLogin: (role: string) => void;
}

const roles = [
  { id: "admin", name: "Admin", icon: Shield, color: "bg-danger" },
  { id: "maintenance", name: "Maintenance", icon: Settings, color: "bg-warning" },
  { id: "hr", name: "Human Resources", icon: Users, color: "bg-info" },
  { id: "finance", name: "Finance", icon: FileText, color: "bg-success" },
  { id: "operations", name: "Operations", icon: Train, color: "bg-primary" },
  { id: "guest", name: "Guest", icon: Eye, color: "bg-muted" }
];

export const Login = ({ onLogin }: LoginProps) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleLogin = () => {
    if (selectedRole && employeeId) {
      onLogin(selectedRole);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-professional">
            <Train className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">DocBridge</h1>
          <p className="text-white/80">AI-Powered Document Management</p>
          <p className="text-white/60 text-sm mt-1">Kochi Metro Rail Corporation</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/95 shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Employee Login</CardTitle>
            <CardDescription>
              Select your role to access department-specific documents
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employee-id">Employee ID</Label>
              <Input
                id="employee-id"
                placeholder="Enter your employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="transition-smooth"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Department/Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger id="role" className="transition-smooth">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      <div className="flex items-center gap-2">
                        <role.icon className="w-4 h-4" />
                        {role.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Role Preview Cards */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`p-2 rounded-md cursor-pointer transition-smooth border ${
                    selectedRole === role.id 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${role.color} flex items-center justify-center`}>
                      <role.icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-medium">{role.name}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleLogin}
              disabled={!selectedRole || !employeeId}
              className="w-full gradient-primary hover:opacity-90 transition-smooth"
              size="lg"
            >
              Access Dashboard
            </Button>

            {/* Demo Credentials */}
            <div className="mt-4 p-3 bg-muted rounded-md">
              <p className="text-xs font-medium text-muted-foreground mb-2">Demo Credentials:</p>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">Employee ID: KMRL001</Badge>
                <p className="text-xs text-muted-foreground">Any role can be selected for demo</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm mb-2">Platform Features:</p>
          <div className="flex justify-center gap-4 text-white/80">
            <span className="text-xs">• AI Document Analysis</span>
            <span className="text-xs">• Role-Based Access</span>
            <span className="text-xs">• Multilingual Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};