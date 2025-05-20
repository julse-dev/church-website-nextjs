"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // 에러 메시지 초기화
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "회원가입 실패");
        return;
      }

      alert("회원가입이 완료되었습니다.");
      router.push("/signin");
    } catch (err) {
      console.error(err);
      setError("서버와 통신에 실패했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-semibold mb-4">회원가입</h2>

      <input
        name="email"
        type="email"
        placeholder="이메일"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded mb-3"
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded mb-3"
      />
      <input
        name="username"
        type="username"
        placeholder="이름"
        value={form.username}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded mb-3"
      />
      <input
        name="phone"
        type="phone"
        placeholder="휴대전화번호"
        value={form.phone}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded mb-3"
      />

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        가입하기
      </button>
    </form>
  );
}
