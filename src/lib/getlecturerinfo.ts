import axios from "axios";
import { JSDOM } from "jsdom";

export const runtime = "edge";

export async function getItemsFromTag(tag: string) {
  return axios
    .get<string>("https://umexpert.um.edu.my/" + tag)
    .then(async ({ data }) => {
      const parent = new JSDOM(data).window.document.querySelector(
        ".profile-upper"
      );
      if (parent === null) return null;
      const children = parent.children;

      let items: string[] = [];
      items.push(children.item(0)?.getAttribute("src") ?? "");
      for (var i = 1; i < parent.children.length; i++) {
        items.push(children.item(i)?.textContent ?? "");
      }

      return items;
    });
}

export async function getLecturerInfo(tag: string) {
  const time = Number(new Date());
  const items = await getItemsFromTag(tag);
  if (items === null) return null;

  const [imgSrc, name, department, faculty, email] = items;
  console.log(Number(new Date()) - time, tag);

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
