import { ButtonColorComponentsType } from "@/types";
import Link from "next/link";

export default function ButtonNonColorLink({
  name,
  href,
}: ButtonColorComponentsType) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold text-slate-600 hover:text-primaryTint transition-colors"
    >
      {name}
    </Link>
  );
}
