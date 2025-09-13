import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Train, 
  User, 
  LogOut, 
  Bell, 
  Globe, 
  Settings,
  Shield,
  Users,
  FileText,
  Eye
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  userRole: string;
  onLogout: () => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const roleNames = {
  admin: "Administrator",
  maintenance: "Maintenance",
  hr: "Human Resources", 
  finance: "Finance",
  operations: "Operations",
  guest: "Guest"
};

const roleIcons = {
  admin: Shield,
  maintenance: Settings,
  hr: Users,
  finance: FileText,
  operations: Train,
  guest: Eye
};

export const Header = ({ userRole, onLogout, language, setLanguage }: HeaderProps) => {
  const RoleIcon = roleIcons[userRole as keyof typeof roleIcons] || User;
  
  return (
    <header className="gradient-primary shadow-professional border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Train className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">DocBridge</h1>
                <p className="text-xs text-white/70">Kochi Metro Rail Corporation</p>
              </div>
            </div>
            
            {/* Role Badge */}
            <div className="hidden md:flex items-center gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <RoleIcon className="w-3 h-3 mr-1" />
                {roleNames[userRole as keyof typeof roleNames]}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <Globe className="w-4 h-4 mr-1" />
                  {language === "en" ? "EN" : "മലയാളം"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("ml")}>
                  🇮🇳 മലയാളം
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <User className="w-4 h-4 mr-1" />
                  <span className="hidden md:inline">KMRL001</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">Employee KMRL001</p>
                  <p className="text-xs text-muted-foreground">
                    {roleNames[userRole as keyof typeof roleNames]}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  {language === "en" ? "Settings" : "ക്രമീകരണങ്ങൾ"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout} className="text-danger">
                  <LogOut className="w-4 h-4 mr-2" />
                  {language === "en" ? "Logout" : "ലോഗൗട്ട്"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};