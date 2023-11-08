import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function Button({
  children,
  ...props
}: { children?: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  return (
    <button
      className={
        "w-full p-2 bg-black rounded-md disabled:bg-green-500 text-white flex justify-center"
      }
      disabled={pending}
      {...props}
    >
      {pending ? <Loader2 className="animate-spin" /> : children}
    </button>
  );
}
