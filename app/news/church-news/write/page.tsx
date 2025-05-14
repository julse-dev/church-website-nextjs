import ChurchNewsForm from "@/app/components/ChurchNewsForm";

export default function WritePostPage() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">교회소식 작성</h1>
      <ChurchNewsForm />
    </div>
  );
}
