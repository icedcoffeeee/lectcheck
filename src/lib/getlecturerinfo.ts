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
  let res = await getLectDB(tag);
  if (res === null) {
    const items = await getItemsFromTag(tag);
    if (items === null) return null; // not found

    const [imgSrc, name, department, faculty, email] = items;

    res ??= await prisma.lect.create({
      data: { tag, name, imgSrc, faculty, department, email },
    });
  }
  return res;
}

export type LecturerInfoType = NonNullable<
  Awaited<ReturnType<typeof getLecturerInfo>>
>;

export function getLectDB(tag: string) {
  return prisma.lect.findFirst({ where: { tag: tag } });
}
