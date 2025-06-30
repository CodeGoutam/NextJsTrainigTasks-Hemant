"use client";
import ImageModal from "@/components/ImageModal/ImageModal";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Gallery = ({ initialImages }: { initialImages: [] }) => {
  const [imageData, setImagesData] = useState(initialImages);
  const [currentPage, setCurrentPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [modalState, setModalState] = useState({ open: false, link: "" });

  const fetchImages = async (page: number) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=20`
      );
      const res = await response.json();
      if (res) {
        res?.length == 0 ? setHasMore(false) : setHasMore(true);
        setImagesData((prev) => [...prev, ...res]);
        setCurrentPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Failed to fetch images", err);
    } finally {
      setLoading(false);
    }
  };

  // const debounce = (func: Function, delay: number) => {
  //   let timeId;
  //   return (...args: any) => {
  //     clearTimeout(timeId);
  //     timeId = setTimeout(() => func(args), delay);
  //   };
  // };

  useEffect(() => {
    const handleScroll = () => {
      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200;

      if (reachedBottom && !loading && hasMore) {
        fetchImages(currentPage);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div
      style={{
        // padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <p
        style={{
          position: "fixed",
          fontSize: "20px",
          fontWeight: "bold",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          background: "rgb(0,0,0,0.5  )",
          color: "white",
        }}
      >
        Image Gallery
      </p>
      <div
        style={{
          marginTop: "80px",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {imageData?.map((data: any, index: number) => (
          <Image
            key={data?.id + "" + data?.author + "" + index}
            src={data?.download_url}
            alt={data?.author}
            height={250}
            width={250}
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              width: "250px",
              height: "250px",
              cursor: "pointer",
            }}
            onClick={() => {
              setModalState({ open: true, link: data?.download_url });
            }}
          />
        ))}
      </div>

      {loading && (
        <div style={{ height: "300px" }}>
          <p style={{ textAlign: "center" }}>Loading more images...</p>
        </div>
      )}
      {modalState.link && (
        <ImageModal
          modalState={modalState.open}
          setModalState={setModalState}
          link={modalState?.link}
        />
      )}
    </div>
  );
};

export default Gallery;
