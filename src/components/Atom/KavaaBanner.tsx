import Image from "next/image";

export default function KavaaBanner({
  color = "primaryTint",
  src,
}: {
  color?: string;
  src: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-12">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div
            className={`w-12 h-12 bg-${color} rounded-md flex items-center justify-center font-bold text-white`}
          >
            <Image
              src={src}
              alt="Logo Kavaa"
              width={48}
              height={48}
              className="w-full h-full object-cover rounded-md"
              priority
            />
          </div>
          <span
            className={`text-6xl  font-extrabold text-${color} tracking-tighter`}
          >
            Kavaa
          </span>
        </div>
        <span className={`text-[10px] text-${color} font-medium ml-1`}>
          Where Learning Meets Evolution
        </span>
      </div>
    </div>
  );
}
