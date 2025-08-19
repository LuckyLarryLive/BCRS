import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { GaugeIcon, SearchIcon, BriefcaseIcon, TrophyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NavigationMenu() {
  const [location, setLocation] = useLocation();

  const navigationItems = [
    {
      id: "dashboard",
      icon: GaugeIcon,
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      id: "nav-link-mls",
      icon: SearchIcon,
      label: "MLS",
      path: "/mls",
    },
    {
      id: "portfolio",
      icon: BriefcaseIcon,
      label: "My Portfolio",
      path: "/portfolio",
    },
    {
      id: "leaderboard",
      icon: TrophyIcon,
      label: "Leaderboard",
      path: "/leaderboard",
    },
  ];

  return (
    <Card className="bg-white p-4">
      <nav>
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <button
                id={item.id}
                onClick={() => setLocation(item.path)}
                className={cn(
                  "w-full flex items-center p-3 text-left rounded-lg font-medium transition-colors",
                  location === item.path || (location === "/" && item.path === "/dashboard")
                    ? "text-monopoly-green bg-green-50"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </Card>
  );
}
