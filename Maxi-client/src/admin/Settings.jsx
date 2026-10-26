
import { useState } from "react";
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
} from "lucide-react";

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
      <div className="min-w-0">
        <h3 className="text-sm font-medium text-white">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
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

export default function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState("general");
  const [message, setMessage] = useState("");
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

  const updateSetting = (field, value) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));

    setMessage("");
  };

  const handleSaveSettings = (event) => {
    event.preventDefault();

    // Frontend preview only. Connect this to your backend later.
    setMessage(
      "Settings updated in this session. Backend integration is still pending."
    );
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setMessage("Please complete all password fields.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setMessage("Your new password must contain at least 8 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage("The new password and confirmation do not match.");
      return;
    }

    setMessage(
      "Password form validated. A real password change requires backend authentication."
    );

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const resetSettings = () => {
    setSettings(initialSettings);
    setMessage("Settings reset to their initial demo values.");
  };

  return (
    <div className="min-h-screen space-y-6 bg-[#0B0B0B] p-4 text-white sm:p-6 lg:p-8">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]">
            <SettingsIcon size={15} />
            Administration
          </div>

          <h1 className="text-2xl font-semibold sm:text-3xl">
            Settings
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your admin profile and website preferences.
          </p>
        </div>

        <button
          type="button"
          onClick={resetSettings}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-300 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37] sm:self-auto"
        >
          <RotateCcw size={16} />
          Reset Demo
        </button>
      </div>

      {/* Feedback */}
      {message && (
        <div className="flex items-start gap-3 rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-4 text-sm text-gray-200">
          {message.toLowerCase().includes("pending") ||
          message.toLowerCase().includes("requires") ? (
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0 text-amber-400"
            />
          ) : (
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-[#D4AF37]"
            />
          )}

          <p>{message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Settings navigation */}
        <aside className="rounded-2xl border border-white/10 bg-[#101010] p-3">
          <p className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-widest text-gray-600">
            Preferences
          </p>

          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMessage("");
                  }}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition lg:w-full ${
                    isActive
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

        {/* Settings content */}
        <div className="min-w-0 space-y-6">
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
                      placeholder="+65 ..."
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

              <SaveButton />
            </form>
          )}

          {/* ADMIN PROFILE */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <SectionCard
                icon={UserRound}
                title="Admin Profile"
                description="Manage the contact details associated with your administrator account."
              >
                <div className="mb-6 flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                    <UserRound size={28} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {settings.adminName || "Administrator"}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Administrator account
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Full Name</label>
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
                    <label className={labelClass}>Email Address</label>
                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                      <input
                        type="email"
                        className={`${inputClass} pl-11`}
                        value={settings.adminEmail}
                        onChange={(e) =>
                          updateSetting("adminEmail", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>Phone Number</label>
                    <div className="relative">
                      <Phone
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                      <input
                        type="tel"
                        className={`${inputClass} pl-11`}
                        placeholder="Enter phone number"
                        value={settings.adminPhone}
                        onChange={(e) =>
                          updateSetting("adminPhone", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SaveButton />
            </form>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <SectionCard
                icon={Bell}
                title="Notification Preferences"
                description="Choose which booking-related notifications you want to enable."
              >
                <NotificationToggle
                  title="New Booking Notifications"
                  description="Receive notifications when a new cab booking is submitted."
                  checked={settings.bookingNotifications}
                  onChange={(value) =>
                    updateSetting("bookingNotifications", value)
                  }
                />

                <NotificationToggle
                  title="Cancellation Notifications"
                  description="Receive notifications when a customer cancels a booking."
                  checked={settings.cancellationNotifications}
                  onChange={(value) =>
                    updateSetting("cancellationNotifications", value)
                  }
                />

                <NotificationToggle
                  title="Customer Updates"
                  description="Enable notifications about customer information changes."
                  checked={settings.customerNotifications}
                  onChange={(value) =>
                    updateSetting("customerNotifications", value)
                  }
                />

                <NotificationToggle
                  title="Marketing Updates"
                  description="Enable optional announcements and marketing updates."
                  checked={settings.marketingNotifications}
                  onChange={(value) =>
                    updateSetting("marketingNotifications", value)
                  }
                />
              </SectionCard>

              <SaveButton />
            </form>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <SectionCard
                icon={LockKeyhole}
                title="Change Password"
                description="Enter your current password and choose a new password."
              >
                <div className="mb-5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle
                      size={18}
                      className="mt-0.5 shrink-0 text-amber-400"
                    />
                    <p className="text-xs leading-5 text-gray-400">
                      This is currently a frontend demo. Password changes will
                      not take effect until secure backend authentication is
                      implemented.
                    </p>
                  </div>
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
                      <label className={labelClass}>{field.label}</label>

                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`${inputClass} pr-12`}
                          placeholder={field.placeholder}
                          value={passwordForm[field.name]}
                          onChange={(e) => {
                            setPasswordForm((previous) => ({
                              ...previous,
                              [field.name]: e.target.value,
                            }));
                            setMessage("");
                          }}
                          autoComplete="new-password"
                          required
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? "Hide passwords" : "Show passwords"
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-[#D4AF37]"
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
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 font-semibold text-black transition hover:bg-[#e6c75b] sm:w-auto"
                >
                  <ShieldCheck size={18} />
                  Validate Password Form
                </button>
              </SectionCard>
            </form>
          )}

          {/* Demo information */}
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <p className="text-xs leading-5 text-gray-500">
              <span className="font-semibold text-[#D4AF37]">Demo mode:</span>{" "}
              These settings are stored in React state only. They reset when
              the page is refreshed. Database persistence and real account
              security will be added during backend integration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SaveButton() {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e6c75b] sm:w-auto"
      >
        <Save size={17} />
        Save Settings
      </button>
    </div>
  );
}
