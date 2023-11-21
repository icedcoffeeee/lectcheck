import { JSDOM } from "jsdom";

export const runtime = "edge";

export async function getItemsFromResponse(res: Promise<Response>) {
  return res.then(async (r) => {
    const parent = new JSDOM(await r.text()).window.document.querySelector(
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
  const items = await getItemsFromResponse(
    fetch("https://umexpert.um.edu.my/" + tag)
  );
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
