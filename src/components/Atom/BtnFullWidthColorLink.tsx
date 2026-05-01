import { TipeKomponenTombolWarna } from "@/types";
import Link from "next/link";

export default function BtnFullWidthColorLink({
  name,
  href,
}: TipeKomponenTombolWarna) {
  return (
    <Link
      href={href}
      className="w-full py-3 text-center bg-primaryTint text-white rounded-xl text-sm font-semibold shadow-md "
    >
      {name}
    </Link>
  );
}
