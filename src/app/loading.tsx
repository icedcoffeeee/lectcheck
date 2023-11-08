import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed gap-2 top-0 left-0 -z-10 h-screen w-screen flex justify-center items-center">
      <Loader2 className="animate-spin" />
      <span>Loading...</span>
    </div>
  );
}
