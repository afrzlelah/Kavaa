import { ButtonColorComponentsType } from "@/type";
import Link from "next/link";

export default function ButtonNonColorLink({
  name,
  href,
}: ButtonColorComponentsType) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
    >
      {name}
    </Link>
  );
}
