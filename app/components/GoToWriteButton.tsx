"use client";

import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";

export default function GoToWriteButton() {
  const router = useRouter();
  const currentPathName = usePathname();

  const handleClick = () => {
    router.push(`${currentPathName}/write`);
  };

  return (
    <button onClick={handleClick} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      글쓰기
    </button>
  );
}
