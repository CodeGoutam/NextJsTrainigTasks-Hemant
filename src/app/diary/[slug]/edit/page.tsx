import DiaryForm from "@/components/DiaryForm/DiaryForm";

export default function EditDiaryPage({ params }) {
  return <DiaryForm mode="edit" slug={params.slug} />;
}
