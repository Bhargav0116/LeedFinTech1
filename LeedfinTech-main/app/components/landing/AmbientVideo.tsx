"use client";

import { useEffect, useRef, useState } from "react";

type AmbientVideoProps = {
  className?: string;
  poster: string;
};

export default function AmbientVideo({ className = "", poster }: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    void video.play().then(
      () => setIsPlaying(true),
      () => setIsPlaying(false),
    );
  }, []);

  async function togglePlayback() {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setVideoError(false);
        setIsPlaying(true);
      } catch {
        setVideoError(true);
      }
      return;
    }

    video.pause();
    setIsPlaying(false);
  }

  return (
    <div className={`ambient-video ${className}`}>
      <video
        ref={videoRef}
        className="ambient-video-media"
        src="https://cdn.coverr.co/videos/coverr-aerial-view-of-the-city-of-paris-1579/1080p.mp4"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        onError={() => {
          setVideoError(true);
          setIsPlaying(false);
        }}
        aria-hidden="true"
      />
      <button
        className="ambient-video-toggle"
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause background video" : "Play background video"}
        title={isPlaying ? "Pause background video" : "Play background video"}
      >
        {isPlaying ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5h3v14H8zm5 0h3v14h-3z" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
        <span>{isPlaying ? "Pause film" : "Play film"}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {videoError ? "Background video is unavailable; the poster image is still displayed." : ""}
      </span>
    </div>
  );
}
