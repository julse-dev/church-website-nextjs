"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export default function MyPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyPosts = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me/posts`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/signin");
          return;
        }
        throw new Error("작성한 글을 불러올 수 없습니다.");
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  const handleDeletePost = async (postId: number) => {
    if (!confirm("정말로 이 글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("글 삭제에 실패했습니다.");
      }

      alert("글이 삭제되었습니다.");
      // 목록 새로고침
      fetchMyPosts();
    } catch (err) {
      alert(err instanceof Error ? err.message : "오류가 발생했습니다.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">내가 작성한 글</h1>
          <Link
            href="/mypage"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            마이페이지로 돌아가기
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg mb-4">작성한 글이 없습니다.</p>
            <Link
              href="/news/church-news/write"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              첫 글 작성하기
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800 flex-1">
                    <button
                      onClick={() => router.push(`/news/church-news/${post.id}`)}
                      className="hover:text-blue-600 transition-colors text-left"
                    >
                      {post.title}
                    </button>
                  </h3>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => router.push(`/news/church-news/${post.id}/edit`)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition duration-200"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition duration-200"
                    >
                      삭제
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mb-3 line-clamp-3">
                  {post.content.substring(0, 150)}
                  {post.content.length > 150 && "..."}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>작성일: {formatDate(post.createdAt)}</span>
                  {post.updatedAt !== post.createdAt && <span>수정일: {formatDate(post.updatedAt)}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
