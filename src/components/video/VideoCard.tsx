import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { withBase } from "./videos";
import type { VideoBlock, VideoItem } from "./videos";
import { useVideoStage } from "./VideoContext";

/**
 * Autoplay is off for Data Saver and reduced-motion users. Evaluated once on the
 * client; on the server (prerender) it is false. It only drives effects, never
 * markup, so SSR and hydration stay identical.
 */
function computeCanAutoplay(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  const mm =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
  if (mm?.matches) return false;
  return true;
}

type VideoCardProps = {
  item: VideoItem;
  block: VideoBlock;
  /** Whether this card is the one its section currently selects for autoplay. */
  active: boolean;
};

export function VideoCard({ item, block, active }: VideoCardProps) {
  const { play, pause, toggleMute, isPlaying, isUnmuted } = useVideoStage();
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const firedRef = useRef(false);
  const [visible, setVisible] = useState(false);
  const [canAutoplay] = useState(computeCanAutoplay);

  const playing = isPlaying(item.id);
  const unmuted = isUnmuted(item.id);

  // Visible >= 60% => eligible for autoplay; leaving the viewport pauses.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.6);
      },
      { threshold: [0, 0.6, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (canAutoplay && active && visible) play(item.id);
  }, [canAutoplay, active, visible, item.id, play]);

  useEffect(() => {
    if (!visible) pause(item.id);
  }, [visible, item.id, pause]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !unmuted;
    if (playing) {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      v.pause();
    }
  }, [playing, unmuted]);

  // First play of each video => one analytics event.
  useEffect(() => {
    if (playing && !firedRef.current) {
      firedRef.current = true;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "video_play", video_block: block, video_id: item.id });
    }
  }, [playing, block, item.id]);

  const onTogglePlay = () => {
    if (playing) pause(item.id);
    else play(item.id);
  };

  const onToggleMute = () => {
    const willUnmute = !unmuted;
    toggleMute(item.id);
    if (willUnmute) play(item.id); // unmuting is a user gesture, so playing is allowed
  };

  const src = withBase(item.src);

  return (
    <div ref={rootRef} className="relative h-full w-full bg-foreground">
      {src ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={withBase(item.poster)}
          muted={!unmuted}
          playsInline
          loop
          preload="none"
        />
      ) : (
        <Placeholder title={item.title} playing={playing} />
      )}

      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={playing ? `Призупинити відео: ${item.title}` : `Відтворити відео: ${item.title}`}
        className="absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sun"
      >
        {!playing && (
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-foreground/55 text-white backdrop-blur-sm">
            <Play size={24} fill="currentColor" className="translate-x-[1px]" aria-hidden />
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={onToggleMute}
        aria-pressed={unmuted}
        aria-label={unmuted ? `Вимкнути звук: ${item.title}` : `Увімкнути звук: ${item.title}`}
        className="absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-foreground/55 text-white backdrop-blur-sm transition-colors hover:bg-foreground/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-sun"
      >
        {unmuted ? <Volume2 size={18} aria-hidden /> : <VolumeX size={18} aria-hidden />}
      </button>
    </div>
  );
}

/** Shown while `src` is empty: animated brand gradient, title and a "video" tag. */
function Placeholder({ title, playing }: { title: string; playing: boolean }) {
  return (
    <div className="relative h-full w-full">
      <div className="video-ph-bg absolute inset-0" />
      <div className="relative flex h-full w-full flex-col items-center justify-start px-3 pt-4 text-center md:pt-6">
        {/* Dark glass behind the text keeps white-on-yellow/mint readable. It sits in
            the upper part so the centred play button never covers it. */}
        <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-foreground/55 px-3 py-2 backdrop-blur-sm md:gap-2 md:px-4 md:py-3">
          <span className="font-display text-lg leading-tight text-white md:text-2xl">{title}</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/90">
            ▶ відео
          </span>
        </div>
      </div>
      <div className="absolute bottom-4 left-3 right-16 h-1 overflow-hidden rounded-full bg-white/25">
        <div
          className="video-ph-progress h-full w-full origin-left rounded-full bg-white/85"
          style={{ animationPlayState: playing ? "running" : "paused" }}
        />
      </div>
    </div>
  );
}
