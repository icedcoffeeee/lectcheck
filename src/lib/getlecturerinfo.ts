import axios from "axios";
import { JSDOM } from "jsdom";

async function getLecturerInfoUMExpert(tag: string) {
  return axios.get("https://umexpert.um.edu.my/" + tag).then(({ data }) => {
    const parent = new JSDOM(data).window.document.querySelector(
      ".profile-upper"
    );
    if (parent === null) return null;
    const children = parent.children;
    if (children === null) return null;

    let items: string[] = [];
    items.push(children.item(0)?.getAttribute("src") ?? "");
    for (var i = 1; i < children.length; i++) {
      items.push(children.item(i)?.textContent ?? "");
    }

    return items;
  });
}

export async function getLecturerInfo(tag: string) {
  const items = await getLecturerInfoUMExpert(tag);
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
  let promises: Promise<string[]>[] = [];
  for (var tag in tags) {
    promises.push(
      getLecturerInfoUMExpert(tag).then((info) => {
        if (info === null) return [""];
        return info;
      })
    );
  }
  return Promise.all(promises);
}
