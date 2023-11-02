import Image from "next/image";
import axios from "axios";
import { JSDOM } from "jsdom";

interface LectInfoProps {
  tag: string;
}

export default async function LectInfo({ tag }: LectInfoProps) {
  let lectData = await getLectData(tag);

  return lectData ? <LectCard lectData={lectData} /> : <></>;
}

interface LectData {
  name: string;
  email: string;
  faculty: string;
  department: string;
  imgSrc: string;
}

async function getLectData(tag: string): Promise<LectData | null> {
  try {
    const { data } = await axios.get<string>(
      "https://umexpert.um.edu.my/" + tag
    );
    const dom = new JSDOM(data);
    const parent = dom.window.document.querySelector(".profile-upper");

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
  } catch (e) {
    return null;
  }
}

function LectCard({ lectData }: { lectData: LectData }) {
  return (
    <div className="flex flex-col w-full h-fit p-5 rounded-md bg-white shadow-md">
      <Image
        src={lectData.imgSrc}
        width={100}
        height={100}
        alt={lectData.name}
        className="object-cover self-center mb-5 aspect-square w-[80px] h-[80px] rounded-full"
      />
      <p className="font-bold">{lectData.name}</p>
      <p>{lectData.faculty}</p>
      <p>{lectData.department}</p>
      <p>{lectData.email}</p>
    </div>
  );
}
