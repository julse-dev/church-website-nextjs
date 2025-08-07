"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function MyPageButton() {
  const router = useRouter();

  const handleMyPage = () => {
    router.push("/mypage");
  };

  return (
    <button onClick={handleMyPage} className="text-blue-600 hover:underline mr-4">
      마이페이지
    </button>
  );
}
