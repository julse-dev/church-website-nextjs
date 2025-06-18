"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChurchNewsForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: ``,
    content: ``,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/church-news-boards/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ...formData,
      }),
    });

    if (response.ok) {
      alert(`게시글이 성공적으로 등록되었습니다.`);
      router.push("/news/church-news");
    } else {
      const error = await response.json();
      alert(`게시글 등록에 실패했습니다. 오류는: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        placeholder="제목"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <textarea
        name="content"
        placeholder="내용"
        value={formData.content}
        onChange={handleChange}
        className="border p-2 w-full h-40"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        게시글 등록
      </button>
    </form>
  );
}
