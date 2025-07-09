import Gallery from "@/ui/Gallery/page";

const Page = async () => {
  const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=20`);
  const res = await response.json();

  return (
    <>
      <Gallery initialImages={res} />
    </>
  );
};

export default Page;
