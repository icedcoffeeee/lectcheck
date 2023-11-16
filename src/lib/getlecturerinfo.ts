import { JSDOM } from "jsdom";

export const runtime = "edge";

async function getItemsFromResponse(res: Promise<Response>[]) {
  return res.map((resp) =>
    resp.then(async (r) => {
      const time = Number(new Date());
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
      console.log(Number(new Date()) - time);

      return items;
    })
  );
}

export async function getLecturerInfo(tag: string) {
  const items = await (
    await getItemsFromResponse([fetch("https://umexpert.um.edu.my/" + tag)])
  )[0];
  if (items === null) return null;

  const [imgSrc, name, department, faculty, email] = items;

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

export async function getLeaderboardInfo(tags: string[]) {
  return getItemsFromResponse(
    tags.map((tag) => fetch("https://umexpert.um.edu.my/" + tag))
  ).then((j) =>
    j.map((k) => k.then((i) => (!!i ? i : Array<string>(tags.length).fill(""))))
  );
}
