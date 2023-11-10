import { getLecturerInfo, LecturerInfoType } from "@/lib/getlecturerinfo";
import { User2 } from "lucide-react";
import Image from "next/image";

export async function LecturerInfo({ tag }: { tag: string }) {
  const lecturerData = await getLecturerInfo(tag);
  return lecturerData ? (
    <LectCard lecturerInfo={lecturerData} />
  ) : (
    <NotFoundCard />
  );
}

function LectCard({ lecturerInfo }: { lecturerInfo: LecturerInfoType }) {
  return (
    <div className="flex flex-col w-full h-fit p-5 rounded-md bg-white shadow-md items-center text-center text-black">
      <Image
        src={lecturerInfo.imgSrc}
        width={100}
        height={100}
        alt={lecturerInfo.name}
        className="object-cover border-2 border-gray-900 self-center mb-5 aspect-square w-[80px] h-[80px] rounded-full"
      />
      <p className="font-bold">{lecturerInfo.name}</p>
      <p>{lecturerInfo.faculty}</p>
      <p>{lecturerInfo.department}</p>
      <p className="text-sm">{lecturerInfo.email}</p>
    </div>
  );
}

function NotFoundCard() {
  return (
    <div className="flex flex-col gap-2 w-full h-fit p-5 rounded-md bg-white shadow-md text-black">
      <User2 className="object-cover self-center mb-5 aspect-square w-[80px] h-[80px] rounded-full" />
      <p>Lecturer not found. Check their UMExpert page again.</p>
    </div>
  );
}
