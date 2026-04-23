import { Apple } from "lucide-react";

export default function LoginWith({
  name,
  icons,
}: {
  name: string;
  icons?: React.ReactNode;
}) {
  return (
    <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
      {icons && (
        <span className="flex items-center justify-center">{icons}</span>
      )}
      Sign in with {name}
    </button>
  );
}
