"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function DiaryList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("/api/diaries", { credentials: "include" })
      .then((res) => res.json())
      .then(setList);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "20px",
        }}
      >
        <p
          style={{
            fontSize: "36px",
            fontWeight: "bold",
          }}
        >
          Diary List
        </p>
        <Link
          href={"/diary/new"}
          style={{
            color: "white",
            background: "blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px",
            borderRadius: "8px",
            height: "fit-content",
          }}
        >
          New
        </Link>
      </div>
      <div className="w-[100%] grid md:grid-cols-2 lg:grid-cols-3 gap-6 pl-10 pr-10">
        {list.map((d) => (
          <div key={d._id} className="border p-4 rounded">
            <img
              src={d.coverImage}
              alt={d.title}
              className="h-48 w-full object-cover rounded"
            />
            <h3 className="mt-2 font-bold">{d.title}</h3>
            <p className="text-sm text-gray-500">{d.location}</p>
            <p className="mt-2 text-gray-700">{d.content.slice(0, 100)}...</p>
            <p className="mt-1 text-xs text-gray-400">
              {new Date(d.createdAt).toLocaleDateString()}
            </p>
            <p className="mt-1 text-xs">{d.isPublic ? "Public" : "Private"}</p>
            <div className="flex gap-2 mt-2">
              <Link href={`/diary/${d.slug}/edit`} className="text-blue-500">
                Edit
              </Link>
              <Link href={`/diary/${d.slug}`} className="text-blue-500">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
