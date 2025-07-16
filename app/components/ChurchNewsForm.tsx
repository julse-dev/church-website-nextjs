"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRefreshAccessToken } from "../hooks/useRefreshAccessToken";

type Post = {
  id: string;
  title: string;
  content: string;
};

interface ChurchNewsFormProps {
  post?: Post;
}

export default function ChurchNewsForm({ post }: ChurchNewsFormProps) {
  const router = useRouter();
  const isEditing = !!post;
  const { refresh, loading, error: refreshError } = useRefreshAccessToken();

  const [formData, setFormData] = useState({
    title: post?.title || ``,
    content: post?.content || ``,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
      });
    }
  }, [post]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await refresh();
    if (!ok) {
      alert(refreshError || "로그인이 필요합니다.");
      if (refreshError) router.push("/signin");
      return;
    }

    const url = isEditing
      ? `${process.env.NEXT_PUBLIC_API_URL}/church-news-boards/${post?.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/church-news-boards/create`;

    const method = isEditing ? "PATCH" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ...formData,
      }),
    });

    if (response.ok) {
      alert(`게시글이 성공적으로 ${isEditing ? "수정" : "등록"}되었습니다.`);
      const destination = isEditing ? `/news/church-news/${post.id}` : "/news/church-news";
      router.push(destination);
      router.refresh();
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
      <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-400">
        {loading ? "처리 중..." : isEditing ? "게시글 수정" : "게시글 등록"}
      </button>
      {refreshError && <p className="text-red-500">{refreshError}</p>}
    </form>
  );
}
