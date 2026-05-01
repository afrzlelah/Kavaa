import { TipeKomponenTombolWarna } from "@/types";
import Link from "next/link";

export default function BtnFullWidthNonColorLink({
  name,
  href,
}: TipeKomponenTombolWarna) {
  return (
    <Link
      href={href}
      className="w-full py-3 text-center text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50"
    >
      {name}
    </Link>
  );
}
