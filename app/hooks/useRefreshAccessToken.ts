import { useRef, useState } from "react";

export function useRefreshAccessToken() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const callCount = useRef(0);

  const refresh = async () => {
    if (callCount.current >= 5) {
      setError("인증 시도 횟수를 초과했습니다.");
      return false;
    }

    callCount.current += 1;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("토큰 재발급 실패");
      }

      await res.json();
      return true;
    } catch (err) {
      setError("로그인이 필요합니다.");
      console.error("Token refresh failed:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { refresh, loading, error };
}
