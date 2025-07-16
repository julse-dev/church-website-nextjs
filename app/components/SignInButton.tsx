"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useRefreshAccessToken } from "../hooks/useRefreshAccessToken";

export default function SignInButton() {
  const router = useRouter();
  const { refresh } = useRefreshAccessToken();

  const handleSignin = async (e: React.MouseEvent) => {
    e.preventDefault();

    const ok = await refresh();

    if (ok) {
      alert("로그인 되었습니다.");
      router.refresh();
    } else {
      router.push("/signin");
    }
  };

  return (
    <button onClick={handleSignin} className="text-white-800 hover:underline">
      로그인
    </button>
  );
}
