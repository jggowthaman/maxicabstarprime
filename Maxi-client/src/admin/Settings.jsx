
import { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  UserRound,
  Globe,
  Bell,
  ShieldCheck,
  Save,
  RotateCcw,
  Mail,
  Phone,
  MapPin,
  LockKeyhole,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

import api from "../api/axios";

const initialSettings = {
  adminName: "Administrator",
  adminEmail: "admin@maxicabstarprime.com",
  adminPhone: "",
  companyName: "MaxiCabStar Prime",
  companyEmail: "info@maxicabstarprime.com",
  companyPhone: "",
  companyAddress: "Singapore",
  currency: "SGD",
  timezone: "Asia/Singapore",
  bookingNotifications: true,
  cancellationNotifications: true,
  customerNotifications: true,
  marketingNotifications: false,
};

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-[#111111] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#D4AF37]";

const labelClass = "text-sm font-medium text-gray-300";

function SectionCard({ icon: Icon, title, description, children }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#101010]">
      <div className="flex items-start gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 text-[#D4AF37]">
          <Icon size={21} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-white sm:text-lg">
            {title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function NotificationToggle({ title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 py-4 last:border-b-0 last:pb-0">
      <div>
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-[#D4AF37]" : "bg-gray-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function SaveButton({ saving }) {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        disabled={saving}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e6c75b] disabled:opacity-60 sm:w-auto"
      >
        {saving ? (
          <LoaderCircle size={17} className="animate-spin" />
        ) : (
          <Save size={17} />
        )}
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState("general");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [showPassword, setShowPassword] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "profile", label: "Admin Profile", icon: UserRound },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: ShieldCheck },
  ];

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const updateSetting = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));

    setMessage("");
  };

  // Load website settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);

        const response = await api.get("/settings");

        if (response.data?.success) {
          setSettings((prev) => ({
            ...prev,
            ...response.data.settings,
          }));
        }
      } catch (error) {
        console.error("Settings fetch error:", error);

        showMessage(
          error.response?.data?.message ||
            "Unable to load settings from database.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Save general/profile/notification settings
  const handleSaveSettings = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      const response = await api.put("/settings", settings);

      if (response.data?.success) {
        setSettings((prev) => ({
          ...prev,
          ...response.data.settings,
        }));

        showMessage(
          response.data.message || "Settings saved successfully!"
        );
      } else {
        showMessage("Settings could not be saved.", "error");
      }
    } catch (error) {
      console.error("Settings save error:", error);

      showMessage(
        error.response?.data?.message ||
          "Failed to save settings.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  // Reload persisted settings
  const handleReloadSettings = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.get("/settings");

      if (response.data?.success) {
        setSettings({
          ...initialSettings,
          ...response.data.settings,
        });

        showMessage("Settings reloaded successfully.");
      }
    } catch (error) {
      console.error("Settings reload error:", error);

      showMessage("Failed to reload settings.", "error");
    } finally {
      setLoading(false);
    }
  };

  // REAL password update API
  const handlePasswordSubmit = async (event) => {
    event.preventDefault();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      showMessage("Please fill in all password fields.", "error");
      return;
    }

    if (newPassword.length < 8) {
      showMessage(
        "New password must contain at least 8 characters.",
        "error"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage(
        "New password and confirmation do not match.",
        "error"
      );
      return;
    }

    if (currentPassword === newPassword) {
      showMessage(
        "New password must be different from your current password.",
        "error"
      );
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      const response = await api.put("/admin/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.data?.success) {
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        showMessage(
          response.data.message || "Password changed successfully!"
        );
      } else {
        showMessage(
          response.data?.message || "Password change failed.",
          "error"
        );
      }
    } catch (error) {
      console.error("Password update error:", error);

      showMessage(
        error.response?.data?.message ||
          "Unable to change password. Please check your current password.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const updatePasswordField = (field, value) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setMessage("");
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#0B0B0B] text-[#D4AF37]">
        <LoaderCircle size={25} className="animate-spin" />
        <span className="ml-3">Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 bg-[#0B0B0B] p-4 text-white sm:p-6 lg:p-8">
      {/* Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]">
            MaxiCabStar Prime
          </p>

          <h1 className="text-2xl font-semibold sm:text-3xl">
            Administration Settings
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your website, admin profile, notifications, and security.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReloadSettings}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-300 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
        >
          <RotateCcw size={16} />
          Reload Settings
        </button>
      </div>

      {/* Alert */}
      {message && (
        <div
          className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
            messageType === "error"
              ? "border-red-500/20 bg-red-500/5 text-red-300"
              : "border-green-500/20 bg-green-500/5 text-green-300"
          }`}
        >
          {messageType === "error" ? (
            <AlertCircle size={18} />
          ) : (
            <CheckCircle2 size={18} />
          )}

          <span>{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-white/10 bg-[#101010] p-3">
          <p className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-widest text-gray-600">
            Preferences
          </p>

          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMessage("");
                  }}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition lg:w-full ${
                    activeTab === tab.id
                      ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 space-y-6">
          {/* GENERAL */}
          {activeTab === "general" && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <SectionCard
                icon={Globe}
                title="Website Information"
                description="Manage the basic details displayed for your cab service."
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Company Name</label>
                    <input
                      className={inputClass}
                      value={settings.companyName}
                      onChange={(e) =>
                        updateSetting("companyName", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Company Email</label>
                    <input
                      type="email"
                      className={inputClass}
                      value={settings.companyEmail}
                      onChange={(e) =>
                        updateSetting("companyEmail", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Contact Number</label>
                    <input
                      type="tel"
                      className={inputClass}
                      placeholder="+65..."
                      value={settings.companyPhone}
                      onChange={(e) =>
                        updateSetting("companyPhone", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Business Location</label>
                    <div className="relative">
                      <MapPin
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                      <input
                        className={`${inputClass} pl-11`}
                        value={settings.companyAddress}
                        onChange={(e) =>
                          updateSetting("companyAddress", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Default Currency</label>
                    <select
                      className={inputClass}
                      value={settings.currency}
                      onChange={(e) =>
                        updateSetting("currency", e.target.value)
                      }
                    >
                      <option value="SGD">SGD — Singapore Dollar</option>
                      <option value="INR">INR — Indian Rupee</option>
                      <option value="USD">USD — US Dollar</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Timezone</label>
                    <select
                      className={inputClass}
                      value={settings.timezone}
                      onChange={(e) =>
                        updateSetting("timezone", e.target.value)
                      }
                    >
                      <option value="Asia/Singapore">
                        Singapore (UTC+8)
                      </option>
                      <option value="Asia/Kolkata">
                        India (UTC+5:30)
                      </option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                </div>
              </SectionCard>

              <SaveButton saving={saving} />
            </form>
          )}

          {/* ADMIN PROFILE */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <SectionCard
                icon={UserRound}
                title="Admin Profile"
                description="Manage administrator profile details."
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Admin Name</label>
                    <input
                      className={inputClass}
                      value={settings.adminName}
                      onChange={(e) =>
                        updateSetting("adminName", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Admin Email</label>
                    <input
                      type="email"
                      className={inputClass}
                      value={settings.adminEmail}
                      onChange={(e) =>
                        updateSetting("adminEmail", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>Admin Phone</label>
                    <input
                      type="tel"
                      className={inputClass}
                      value={settings.adminPhone}
                      onChange={(e) =>
                        updateSetting("adminPhone", e.target.value)
                      }
                    />
                  </div>
                </div>
              </SectionCard>

              <SaveButton saving={saving} />
            </form>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <SectionCard
                icon={Bell}
                title="Notification Preferences"
                description="Manage notification preferences."
              >
                <NotificationToggle
                  title="New Booking Notifications"
                  description="Notifications for new bookings."
                  checked={settings.bookingNotifications}
                  onChange={(value) =>
                    updateSetting("bookingNotifications", value)
                  }
                />

                <NotificationToggle
                  title="Cancellation Notifications"
                  description="Notifications for booking cancellations."
                  checked={settings.cancellationNotifications}
                  onChange={(value) =>
                    updateSetting("cancellationNotifications", value)
                  }
                />

                <NotificationToggle
                  title="Customer Notifications"
                  description="Notifications about customer changes."
                  checked={settings.customerNotifications}
                  onChange={(value) =>
                    updateSetting("customerNotifications", value)
                  }
                />

                <NotificationToggle
                  title="Marketing Notifications"
                  description="Optional marketing announcements."
                  checked={settings.marketingNotifications}
                  onChange={(value) =>
                    updateSetting("marketingNotifications", value)
                  }
                />
              </SectionCard>

              <SaveButton saving={saving} />
            </form>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <SectionCard
                icon={LockKeyhole}
                title="Change Password"
                description="Update the password for your administrator account."
              >
                <div className="mb-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <p className="text-xs leading-5 text-amber-200">
                    Your current password will be verified before the new
                    password is saved.
                  </p>
                </div>

                <div className="space-y-5">
                  {[
                    {
                      name: "currentPassword",
                      label: "Current Password",
                      placeholder: "Enter current password",
                    },
                    {
                      name: "newPassword",
                      label: "New Password",
                      placeholder: "Minimum 8 characters",
                    },
                    {
                      name: "confirmPassword",
                      label: "Confirm New Password",
                      placeholder: "Re-enter new password",
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className={labelClass}>
                        {field.label}
                      </label>

                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`${inputClass} pr-12`}
                          placeholder={field.placeholder}
                          value={passwordForm[field.name]}
                          onChange={(e) =>
                            updatePasswordField(
                              field.name,
                              e.target.value
                            )
                          }
                          autoComplete="off"
                          required
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((prev) => !prev)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#D4AF37]"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 font-semibold text-black transition hover:bg-[#e6c75b] disabled:opacity-60 sm:w-auto"
                >
                  {saving ? (
                    <LoaderCircle size={18} className="animate-spin" />
                  ) : (
                    <ShieldCheck size={18} />
                  )}

                  {saving ? "Changing Password..." : "Change Password"}
                </button>
              </SectionCard>
            </form>
          )}

          {/* Footer note */}
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <p className="text-xs leading-5 text-gray-500">
              <span className="font-semibold text-[#D4AF37]">
                MaxiCabStar Prime:
              </span>{" "}
              Settings are managed through the backend API. Password
              changes require authenticated administrator access.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
