export type VideoItem = {
  id: string;
  title: string;
  caption?: string;
  /** Empty/undefined => a branded placeholder is rendered instead of a <video>. */
  src?: string;
  poster?: string;
};

export type VideoBlock = "moments";

/**
 * Turns "/video/x.mp4" into a base-path-safe URL (import.meta.env.BASE_URL is "/"
 * today). Absolute https URLs and already-relative paths are returned unchanged.
 */
export function withBase(path: string | undefined): string | undefined {
  if (!path) return undefined;
  return path.startsWith("/") && !path.startsWith("//")
    ? `${import.meta.env.BASE_URL}${path.slice(1)}`
    : path;
}

/**
 * "Моменти" gallery videos (vertical 9:16). Drop the files into public/video/
 * and fill src/poster — nothing else needs to change, e.g.
 *   { id: "moments-sea", title: "Стрибок у море",
 *     src: "/video/moments-sea.mp4", poster: "/video/moments-sea.jpg" }
 */
export const MOMENTS_VIDEOS: VideoItem[] = [
  { id: "moments-sea", title: "Стрибок у море", src: "", poster: "" },
  { id: "moments-duck", title: "Де сьогодні качка?", src: "", poster: "" },
];
