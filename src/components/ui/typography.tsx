export function HL({ children }: { children: string }) {
  return <span className="bg-red-700 px-1 rounded-md">{children}</span>;
}

export function UL({ children }: { children: string }) {
  return (
    <span className="underline-offset-4 underline decoration-yellow-500 decoration-2">
      {children}
    </span>
  );
}
export function Code({ children }: { children: string }) {
  return (
    <span className="font-mono bg-black/30 px-1 rounded-sm text-red-500">
      {children}
    </span>
  );
}

export function CallOut({
  children,
  emoji,
  color,
}: {
  children: string;
  emoji: string;
  color: string;
}) {
  return (
    <div
      className={"flex gap-3 my-2 p-2 bg-opacity-50 rounded shadow-md " + color}
    >
      <span>{emoji}</span>
      <span>{children}</span>
    </div>
  );
}
