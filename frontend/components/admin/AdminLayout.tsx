import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Newspaper,
  Image,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "News", href: "/admin/news", icon: Newspaper },
    { name: "Gallery", href: "/admin/gallery", icon: Image },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return location === "/admin";
    return location.startsWith(href);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-hdki-gray-dark transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-hdki-red">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white flex items-center justify-center mr-3">
              <span className="text-hdki-red font-bold text-xs leading-tight">
                HD<br />KI
              </span>
            </div>
            <span className="text-white font-semibold">Admin Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-6 flex flex-col h-[calc(100%-4rem)]">
          <div className="px-6 mb-6">
            <Link
              href="/"
              className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Home className="h-4 w-4 mr-2" />
              <span className="text-sm">Back to Website</span>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "bg-hdki-red text-white border-r-4 border-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Right side: user + logout */}
            <div className="flex items-center space-x-4 ml-auto">
              <span className="text-gray-600 hidden sm:inline">
                Welcome back, Admin
              </span>
              <div className="w-8 h-8 bg-hdki-red rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-hdki-red transition-colors duration-200"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
