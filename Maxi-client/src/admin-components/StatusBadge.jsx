
import { CheckCircle2, Clock3, XCircle, CarFront } from "lucide-react";

const statusConfig = {
  Pending: {
    label: "Pending",
    icon: Clock3,
    styles: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    dot: "bg-amber-400",
  },

  Confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    styles: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    dot: "bg-blue-400",
  },

  Completed: {
    label: "Completed",
    icon: CheckCircle2,
    styles: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dot: "bg-emerald-400",
  },

  Cancelled: {
    label: "Cancelled",
    icon: XCircle,
    styles: "bg-red-500/10 text-red-400 border-red-500/20",
    dot: "bg-red-400",
  },
};

export default function StatusBadge({ status, showIcon = false }) {
  const config = statusConfig[status] || {
    label: status || "Unknown",
    icon: CarFront,
    styles: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    dot: "bg-gray-400",
  };

  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium ${config.styles}`}
    >
      {showIcon ? (
        <Icon size={14} />
      ) : (
        <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      )}

      {config.label}
    </span>
  );
}
