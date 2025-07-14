"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useRefreshAccessToken } from "../hooks/useRefreshAccessToken";
import { useEffect, useState } from "react";

export default function GoToWriteButton() {
  const router = useRouter();
  const currentPathName = usePathname();
  const { refresh } = useRefreshAccessToken();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const ok = await refresh();
      setIsAuthenticated(ok);
    };
    checkAuth();
  }, [refresh]);

  const handleClick = () => {
    router.push(`${currentPathName}/write`);
  };

  if (!isAuthenticated) return null;

  return (
    <button onClick={handleClick} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      글쓰기
    </button>
  );
}
