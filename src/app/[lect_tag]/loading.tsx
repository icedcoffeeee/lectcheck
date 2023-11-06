import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-[100lvh] -mt-10 flex text-white gap-2 justify-center items-center">
      <Loader2 className="animate-spin" color="white" />
      <p>Loading...</p>
    </div>
  );
}
