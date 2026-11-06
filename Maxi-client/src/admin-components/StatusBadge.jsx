export default function StatusBadge({ status }) {
  return (
    <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-500">
      {status}
    </span>
  );
}