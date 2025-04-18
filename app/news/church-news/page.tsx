import PostList from "./PostList";

export default function ChurchNewsPages() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">교회소식 게시판</h1>
      <PostList />
    </div>
  );
}
