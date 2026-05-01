import { Card } from "@/components/Bersama/ui/Card";
import { Button } from "@/components/Bersama/ui/Button";
import Image from "next/image";

export function BagianUmpanBalik({ feedback = [] }: { feedback?: { comment?: string; users?: { first_name?: string } }[] }) {
  // Use fallback data if feedback is empty so it matches the screenshot visually
  const displayFeedback =
    feedback.length > 0
      ? feedback
      : [
          {
            comment: "Tinjauan Draf Desain Portfolio Alice siap Peers 1",
            users: { first_name: "Alice" },
          },
          {
            comment: "Tinjauan Draf Desain Portfolio Alice siap Peers 2",
            users: { first_name: "Alice" },
          },
          {
            comment: "Tinjauan Draf Desain Portfolio Alice siap Peers 3",
            users: { first_name: "Alice" },
          },
        ];

  return (
    <Card className="h-full border border-slate-100 shadow-sm p-6 lg:p-8 rounded-[2rem] flex flex-col justify-between">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        {/* Kolom Kiri */}
        <div className="flex flex-col h-full justify-between md:pr-4 md:border-r border-slate-100">
          <div>
            <h4 className="text-[13px] font-black text-slate-900 leading-tight mb-4">
              Feedback
              <br />
              Belajar
              <br />
              Lintas Peran
            </h4>

            <div className="flex -space-x-2 mb-4">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden bg-slate-200 relative"
                >
                  <Image
                    src={`https://ui-avatars.com/api/?name=User+${i}&background=random`}
                    alt="user"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <p className="text-[10px] font-bold text-slate-500 mb-4 leading-tight">
              Feedback Belajar
              <br />
              Lintas Peran
            </p>

            <div className="flex gap-1.5 mb-6">
              <div className="bg-slate-800 w-6 h-10 rounded-md shadow-inner border border-slate-700"></div>
              <div className="bg-slate-800 w-6 h-10 rounded-md shadow-inner border border-slate-700"></div>
              <div className="bg-slate-800 w-6 h-10 rounded-md shadow-inner border border-slate-700"></div>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full  rounded-md text-[10px]  border-slate-200 text-slate-500 hover:bg-slate-50 shadow-sm transition-all  mt-auto "
          >
            <p className="font-normal">Tinjauan Ulasan</p>
          </Button>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-4 md:pl-2 overflow-y-auto">
          {displayFeedback.map((f, idx) => (
            <div
              key={idx}
              className="flex gap-2.5 items-start group cursor-pointer"
            >
              <div className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0 group-hover:bg-primary transition-colors"></div>
              <p className="text-[11px]  text-slate-500 leading-relaxed group-hover:text-slate-800 transition-colors">
                {f.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
