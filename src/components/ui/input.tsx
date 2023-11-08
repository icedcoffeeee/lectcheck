import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const TextInputClass =
  "w-full border-0 rounded-md px-3 text-black border-[1px] border-black";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={TextInputClass} {...props} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={TextInputClass} {...props} />;
}
