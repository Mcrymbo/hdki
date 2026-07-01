"use client";

import { useState } from "react";
import { Save, RefreshCw, Shield, Database, Mail, Globe, CheckCircle2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const DEFAULT_SETTINGS = {
  siteName: "HDKI Kenya",
  siteDescription: "Official website of HDKI Kenya - Karate Adventures and Sports Tourism",
  contactEmail: "info@hdkikenya.org",
  adminEmail: "admin@hdkikenya.org",
  maintenanceMode: false,
  registrationEnabled: true,
  emailNotifications: true,
  autoApproveEvents: false,
  maxFileSize: "10",
  allowedImageTypes: "jpg,jpeg,png,webp",
  apiRateLimit: "100",
  sessionTimeout: "60",
};

function ToggleRow({
  title,
  description,
  name,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-sm bg-hdki-gray-light p-3">
      <div>
        <div className="font-medium text-hdki-ink">{title}</div>
        <div className="text-sm text-hdki-gray-mid">{description}</div>
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
        <div className="peer h-6 w-11 rounded-full bg-hdki-border transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-hdki-border after:bg-white after:transition-all after:content-[''] peer-checked:bg-hdki-red peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-hdki-red/20" />
      </label>
    </div>
  );
}

export default function AdminSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // In real app, save to API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <AdminLayout breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Settings" }]}>
      <div className="space-y-6">
        <div className="rounded-sm border border-hdki-border bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-medium text-hdki-ink">Settings</h1>
              <p className="mt-1 text-sm text-hdki-gray-mid">Manage your HDKI Kenya website configuration</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" icon={<RefreshCw />} iconPosition="left" onClick={handleReset}>
                Reset
              </Button>
              <Button variant="primary" size="sm" icon={<Save />} iconPosition="left" loading={loading} onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>

          {saved && (
            <div className="mt-4 flex items-center gap-2 rounded-sm border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              <CheckCircle2 className="h-4 w-4" />
              Settings saved successfully
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* General Settings */}
          <div className="rounded-sm border border-hdki-border bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
              <Globe className="h-5 w-5 text-hdki-red" />
              <h2 className="font-display text-lg font-medium text-hdki-ink">General Settings</h2>
            </div>
            <div className="space-y-4">
              <Input label="Site Name" name="siteName" value={settings.siteName} onChange={handleInputChange} />
              <Textarea
                label="Site Description"
                name="siteDescription"
                rows={3}
                value={settings.siteDescription}
                onChange={handleInputChange}
              />
              <Input
                label="Contact Email"
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleInputChange}
              />
              <Input
                label="Admin Email"
                type="email"
                name="adminEmail"
                value={settings.adminEmail}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Security Settings */}
          <div className="rounded-sm border border-hdki-border bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
              <Shield className="h-5 w-5 text-hdki-red" />
              <h2 className="font-display text-lg font-medium text-hdki-ink">Security Settings</h2>
            </div>
            <div className="space-y-4">
              <Input
                label="API Rate Limit (requests per minute)"
                type="number"
                name="apiRateLimit"
                value={settings.apiRateLimit}
                onChange={handleInputChange}
              />
              <Input
                label="Session Timeout (minutes)"
                type="number"
                name="sessionTimeout"
                value={settings.sessionTimeout}
                onChange={handleInputChange}
              />
              <ToggleRow
                title="Maintenance Mode"
                description="Temporarily disable public access"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* File Upload Settings */}
          <div className="rounded-sm border border-hdki-border bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
              <Database className="h-5 w-5 text-hdki-red" />
              <h2 className="font-display text-lg font-medium text-hdki-ink">File Upload Settings</h2>
            </div>
            <div className="space-y-4">
              <Input
                label="Max File Size (MB)"
                type="number"
                name="maxFileSize"
                value={settings.maxFileSize}
                onChange={handleInputChange}
              />
              <Input
                label="Allowed Image Types"
                name="allowedImageTypes"
                value={settings.allowedImageTypes}
                onChange={handleInputChange}
                placeholder="jpg,jpeg,png,webp"
                hint="Comma-separated file extensions"
              />
            </div>
          </div>

          {/* Event & Notification Settings */}
          <div className="rounded-sm border border-hdki-border bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
              <Mail className="h-5 w-5 text-hdki-red" />
              <h2 className="font-display text-lg font-medium text-hdki-ink">Event & Notification Settings</h2>
            </div>
            <div className="space-y-4">
              <ToggleRow
                title="Event Registration"
                description="Allow users to register for events"
                name="registrationEnabled"
                checked={settings.registrationEnabled}
                onChange={handleInputChange}
              />
              <ToggleRow
                title="Email Notifications"
                description="Send email alerts for new registrations"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleInputChange}
              />
              <ToggleRow
                title="Auto-approve Events"
                description="Automatically publish new events"
                name="autoApproveEvents"
                checked={settings.autoApproveEvents}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="rounded-sm border border-hdki-border bg-white p-6">
          <h2 className="mb-6 font-display text-lg font-medium text-hdki-ink">System Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-sm bg-hdki-gray-light p-4 text-center">
              <div className="mb-2 text-2xl font-bold text-hdki-red">v2.1.0</div>
              <div className="text-hdki-gray-mid">HDKI Kenya Website</div>
            </div>
            <div className="rounded-sm bg-hdki-gray-light p-4 text-center">
              <div className="mb-2 text-2xl font-bold text-hdki-red">99.9%</div>
              <div className="text-hdki-gray-mid">Uptime</div>
            </div>
            <div className="rounded-sm bg-hdki-gray-light p-4 text-center">
              <div className="mb-2 text-2xl font-bold text-hdki-red">15 MB</div>
              <div className="text-hdki-gray-mid">Database Size</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
