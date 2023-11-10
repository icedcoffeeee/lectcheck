import axios from "axios";
import { JSDOM } from "jsdom";

export async function getLecturerInfo(tag: string) {
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

export type LecturerInfoType = NonNullable<
  Awaited<ReturnType<typeof getLecturerInfo>>
>;
