import { ButtonColorComponentsType } from "@/type";
import Link from "next/link";

export default function BtnFullWidthColorLink({
  name,
  href,
}: ButtonColorComponentsType) {
  return (
    <Link
      href={href}
      className="w-full py-3 text-center bg-primaryTint text-white rounded-xl text-sm font-semibold shadow-md "
    >
      {name}
    </Link>
  );
}
