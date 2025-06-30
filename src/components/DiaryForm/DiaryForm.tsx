"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DiaryForm({ mode, slug }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slugField, setSlugField] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(mode === "edit");

  useEffect(() => {
    if (mode === "edit" && slug) {
      setLoading(true);
      fetch(`/api/diaries?slug=${slug}`)
        .then((res) => res.json())
        .then((data) => {
          const diary = Array.isArray(data) ? data[0] : data;
          if (diary) {
            setTitle(diary.title || "");
            setSlugField(diary.slug || "");
            setContent(diary.content || "");
            setCoverImage(diary.coverImage || "");
            setImages(diary.images || []);
            setLocation(diary.location || "");
            setIsPublic(diary.isPublic ?? true);
          } else {
            console.warn("Diary not found for slug:", slug);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [mode, slug]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = {
      title,
      slug: slugField,
      content,
      coverImage,
      images,
      location,
      isPublic,
    };
    const res = await fetch(
      mode === "new" ? "/api/diaries" : `/api/diaries/${slugField}`,
      {
        method: mode === "new" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    if (res.ok) router.push("/diary");
  }

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          Loading diary...
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl w-full max-w-2xl p-8 space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">
              {mode === "new" ? "Create New Diary" : "Edit Diary"}
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Slug
              </label>
              <input
                value={slugField}
                onChange={(e) => setSlugField(e.target.value)}
                placeholder="Slug"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                required
                rows={5}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover Image URL
              </label>
              <input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional Image URLs
              </label>
              <input
                value={images.join(",")}
                onChange={(e) => setImages(e.target.value.split(","))}
                placeholder="Separate multiple URLs with commas"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or Place"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700">
                Make this diary public
              </label>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <Link
                href="/diary"
                className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700 transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                {mode === "new" ? "Create Diary" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
