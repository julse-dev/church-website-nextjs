"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include", // 쿠키 기반 인증
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.message || "Login failed");
        return;
      }

      // 로그인 성공 시, 메인 페이지로 리다이렉트
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(`서버와 연결할 수 없습니다: ${err}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>

      <input
        type="email"
        name="email"
        placeholder="이메일"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        로그인
      </button>

      <p className="mt-4 text-center">
        계정이 없으신가요?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          회원가입
        </a>
      </p>
    </form>
  );
}
