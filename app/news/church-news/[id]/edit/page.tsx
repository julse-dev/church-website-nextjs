"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import ChurchNewsForm from "@/app/components/ChurchNewsForm";

type Post = {
  id: string;
  title: string;
  content: string;
};

export default function EditPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/church-news-boards/list/${id}`);
        if (!res.ok) {
          throw new Error("게시글을 불러오는데 실패했습니다.");
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>게시글 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div>오류: {error}</div>;
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">교회소식 수정</h1>
      <ChurchNewsForm post={post} />
    </div>
  );
}
