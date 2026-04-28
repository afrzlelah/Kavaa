import { Button } from "@/components/shared/ui/Button";

export function DashboardBanner({ user }: { user?: any }) {
  const firstName = user?.user_metadata?.first_name || user?.email?.split("@")[0] || "there";

  return (
    <section className="relative w-full rounded-[24px] bg-[#2563eb] mb-8 p-8 md:px-12 md:py-10 text-white shadow-sm overflow-hidden">
      {/* Dekorasi Latar Belakang - Bintang/Sparkles */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
        {/* Bintang Atas Kiri */}
        <svg
          className="absolute top-[10%] right-[30%] w-24 h-24 text-white/[0.12]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
        </svg>
        {/* Bintang Besar Kanan Tengah */}
        <svg
          className="absolute top-[35%] -right-[5%] w-48 h-48 text-white/[0.12]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
        </svg>
        {/* Bintang Bawah */}
        <svg
          className="absolute bottom-[5%] right-[15%] w-28 h-28 text-white/[0.12]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl">
        <p className="text-[11px] md:text-[13px] font-semibold tracking-wide text-white/90 uppercase mb-3">
          WELCOME BACK, {firstName}!
        </p>
        <h1 className="text-[26px] md:text-[34px] font-bold mb-8 leading-[1.3] tracking-wide">
          Sharpen Your Skills With
          <br className="hidden md:block" />
          Professional Online Courses
        </h1>
        <Button 
          className="bg-[#1c1c1c] text-white pl-5 pr-1.5 py-1.5 rounded-full font-medium text-sm hover:bg-black"
          icon={
            <div className="bg-white w-7 h-7 rounded-full flex items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-[#1c1c1c] ml-0.5"
              >
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            </div>
          }
        >
          Explore Courses
        </Button>
      </div>
    </section>
  );
}

