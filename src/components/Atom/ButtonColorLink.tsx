import { ButtonColorComponentsType } from "@/types";
import Link from "next/link";

export default function ButtonColorLink({
  name,
  href,
}: ButtonColorComponentsType) {
  return (
    <Link
      href={href}
      className="bg-primaryTint hover:bg-primaryTint  text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:-translate-y-0.5 transition-all"
    >
      {name}
    </Link>
  );
}
