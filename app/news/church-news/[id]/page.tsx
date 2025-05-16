"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";

type Post = {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: string;
};

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/church-news-boards/list/${id}`;
      const res = await fetch(url);

      if (!res.ok) {
        setLoading(false);
        setPost(null);
        console.error(`게시글을 가져오는 데 실패했습니다. 상태 코드: ${res.status}`);
        return notFound(); // 404 페이지 처리
      }

      const data = await res.json();
      setPost(data);

      setLoading(false);
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return <div> 로딩 중 ... </div>;
  }

  if (!post) {
    return notFound(); // 404 페이지 처리
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        작성자: {post.author} | {new Date(post.createdAt).toLocaleDateString()}
      </div>
      <div className="text-base leading-relaxed whitespace-pre-wrap">{post.content}</div>
    </div>
  );
}
