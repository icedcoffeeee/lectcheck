import { JSDOM } from "jsdom";
import prisma from "./db";

export async function getItemsFromTag(tag: string) {
  return fetch("https://umexpert.um.edu.my/" + tag, { cache: "no-cache" }).then(
    async (res) => {
      const parent = new JSDOM(await res.text()).window.document.querySelector(
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
    }
  );
}

export async function getLecturerInfo(tag: string) {
  const items = await getItemsFromTag(tag);
  if (items === null) return null;

  const [imgSrc, name, department, faculty, email] = items;

  const res = await getLectDB(tag);
  if (res === null) {
    await prisma.lect.create({
      data: { tag: tag, name: name, imgSrc: imgSrc },
    });
  }

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

export function getLectDB(tag: string) {
  return prisma.lect.findFirst({ where: { tag: tag } });
}
