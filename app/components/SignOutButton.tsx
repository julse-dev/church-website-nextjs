"use client";

import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signout`, {
        method: "POST",
        credentials: "include", // 💡 쿠키 포함 필수!
      });

      if (res.ok) {
        alert("로그아웃 성공");
        router.refresh();
      } else {
        alert("로그아웃 실패");
      }
    } catch (err) {
      console.error("로그아웃 오류:", err);
    }
  };

  return (
    <button onClick={handleSignout} className="text-red-600 font-semibold hover:underline">
      로그아웃
    </button>
  );
}
