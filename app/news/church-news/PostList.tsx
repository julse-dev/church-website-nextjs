"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  author: string;
  createdAt: string;
};

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/church-news-boards/list`);
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
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
  );
}
