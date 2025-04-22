import { notFound } from "next/navigation";

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

const dummyPosts: Post[] = [
  {
    id: "1",
    title: "부활절 예배 안내",
    content: "2025년 부활절 예배는 오전 11시에 본당에서 드립니다.",
    author: "관리자",
    createdAt: "2025-03-30",
  },
  {
    id: "2",
    title: "2025년 봄소풍 공지",
    content: "4월 20일(주일) 예배 후 교회 전체 봄소풍이 있습니다.",
    author: "관리자",
    createdAt: "2025-03-22",
  },
];

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const post = dummyPosts.find((p) => p.id === params.id);

  if (!post) {
    return notFound(); // 404 페이지 처리
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        {post.author} · {new Date(post.createdAt).toLocaleDateString()}
      </div>
      <div className="text-base leading-relaxed whitespace-pre-wrap">{post.content}</div>
    </div>
  );
}
