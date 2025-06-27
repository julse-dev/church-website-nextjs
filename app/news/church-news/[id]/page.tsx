"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";

type Post = {
  id: string;
  title: string;
  author: string;
  content: string;
  createdAt: string;
};

type User = {
  id: number;
  username: string;
};

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // 현재 로그인한 사용자 정보를 가져옵니다.
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include", // 쿠키를 포함하여 요청
        });
        if (res.ok) {
          const userData = await res.json();
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error("현재 사용자 정보를 가져오는데 실패했습니다.", error);
      }
    };

    const fetchPost = async () => {
      setLoading(true);

      const url = `${process.env.NEXT_PUBLIC_API_URL}/church-news-boards/list/${id}`;
      const res = await fetch(url);

      if (!res.ok) {
        setLoading(false);
        setPost(null);
        console.error(`게시글을 가져오는 데 실패했습니다. 상태 코드: ${res.status}`);
        return notFound();
      }

      const data = await res.json();
      setPost(data);

      setLoading(false);
    };
    fetchPost();
    fetchCurrentUser();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/church-news-boards/${id}`, {
        method: "DELETE",
        credentials: "include", // 인증을 위해 쿠키 포함
      });

      if (res.ok) {
        alert("게시글이 삭제되었습니다.");
        router.push("/news/church-news");
        router.refresh(); // 목록 페이지 새로고침
      } else {
        const errorData = await res.json();
        alert(`삭제에 실패했습니다: ${errorData.message}`);
      }
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      alert("삭제 처리 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <div> 로딩 중 ... </div>;
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        작성자: {post.author} | {new Date(post.createdAt).toLocaleDateString()}
      </div>
      <div className="text-base leading-relaxed whitespace-pre-wrap">{post.content}</div>

      {/* 현재 사용자가 게시글 작성자일 경우에만 수정/삭제 버튼 표시 */}
      {currentUser && currentUser.username === post.author && (
        <div className="mt-8 flex justify-end space-x-2">
          <Link
            href={`/news/church-news/${id}/edit`}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            수정
          </Link>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
