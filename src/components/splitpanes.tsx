export const SPLIT = "max-w-4xl md:grid md:grid-cols-3 md:gap-5";
export const RIGHT = "gap-2 md:col-span-2";

import { ReactNode } from "react";
import { TagSearchBar } from "./tagsearchbar";
export function SplitPanes({
  leftpane,
  children,
}: {
  leftpane?: ReactNode[];
  children?: ReactNode[];
}) {
  return (
    <main className={SPLIT}>
      <div className="flex flex-col gap-2 mb-3">
        <TagSearchBar />
        {...leftpane ?? []}
      </div>
      <div className={RIGHT}>{...children ?? []}</div>
    </main>
  );
}
