import Link from "next/link";

const dummyPosts = [
  {
    id: "1",
    title: "부활절 예배 안내",
    author: "관리자",
    createdAt: "2025-03-30",
  },
  {
    id: "2",
    title: "2025년 봄소풍 공지",
    author: "관리자",
    createdAt: "2025-03-22",
  },
];

export default function PostList() {
  return (
    <ul className="space-y-4">
      {dummyPosts.map((post) => (
        <li key={post.id} className="border-b pb-2">
          <Link href={`/news/church-news/${post.id}`} className="text-lg font-semibold text-blue-600 hover:underline">
            {post.title}
          </Link>
          <div className="text-sm text-gray-500">
            {post.author} · {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </li>
      ))}
    </ul>
  );
}
