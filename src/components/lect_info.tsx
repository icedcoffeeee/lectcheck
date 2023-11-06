import Image from "next/image";
import axios from "axios";
import { JSDOM } from "jsdom";
import { Avatar } from "@mui/material";

interface LectInfoProps {
  lect_tag: string;
}

export async function LectInfo({ lect_tag }: LectInfoProps) {
  let lectData = await getLectData(lect_tag);
  return lectData ? <LectCard lectData={lectData} /> : <NotFoundCard />;
}

interface LectData {
  name: string;
  email: string;
  faculty: string;
  department: string;
  imgSrc: string;
}

async function getLectData(tag: string): Promise<LectData | null> {
  const { data } = await axios.get<string>("https://umexpert.um.edu.my/" + tag);
  const dom = new JSDOM(data);
  const parent = dom.window.document.querySelector(".profile-upper");

  if (parent === null) return null;

  const imgSrc = parent?.children.item(0)?.getAttribute("src") || "";
  const name = parent?.children.item(1)?.textContent || "";
  const department = parent?.children.item(2)?.textContent || "";
  const faculty = parent?.children.item(3)?.textContent || "";
  const email = parent?.children.item(4)?.textContent || "";

  return {
    name: name,
    email: email,
    faculty: faculty,
    department: department,
    imgSrc: imgSrc,
  };
}

function LectCard({ lectData }: { lectData: LectData }) {
  return (
    <div className="flex flex-col w-full h-fit p-5 rounded-md bg-white shadow-md items-center text-center">
      <Image
        src={lectData.imgSrc}
        width={100}
        height={100}
        alt={lectData.name}
        className="object-cover border-2 border-gray-900 self-center mb-5 aspect-square w-[80px] h-[80px] rounded-full"
      />
      <p className="font-bold">{lectData.name}</p>
      <p>{lectData.faculty}</p>
      <p>{lectData.department}</p>
      <p className="text-sm">{lectData.email}</p>
    </div>
  );
}

function NotFoundCard() {
  return (
    <div className="flex flex-col gap-2 w-full h-fit p-5 rounded-md bg-white shadow-md">
      <Avatar className="object-cover self-center mb-5 aspect-square w-[80px] h-[80px] rounded-full" />
      <p>Lecturer not found. Check their UMExpert page again.</p>
    </div>
  );
}
