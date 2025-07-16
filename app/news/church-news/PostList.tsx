"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  author: string;
  createdAt: string;
};

type PostListResponse = {
  posts: Post[];
  totalCount: number;
};

const POSTS_PER_PAGE = 10;

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/church-news-boards/list?page=${currentPage}&limit=${POSTS_PER_PAGE}`
      );
      const data: PostListResponse = await res.json();
      setPosts(data.posts);
      setTotalCount(data.totalCount);
    };

    fetchPosts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <div>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-2">
            <Link href={`/news/church-news/${post.id}`} className="text-lg font-semibold text-blue-600 hover:underline">
              {post.title}
            </Link>
            <div className="text-sm text-gray-600">
              {post.author} | {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          이전
        </button>
        <span className="px-3 py-1">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>
    </div>
  );
}
