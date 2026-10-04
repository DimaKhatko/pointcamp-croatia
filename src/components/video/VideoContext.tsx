import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type VideoStage = {
  playingId: string | null;
  unmutedId: string | null;
  play: (id: string) => void;
  pause: (id: string) => void;
  toggleMute: (id: string) => void;
  isPlaying: (id: string) => boolean;
  isUnmuted: (id: string) => boolean;
};

const VideoStageContext = createContext<VideoStage | null>(null);

/**
 * One provider per area that shares playback: a single `playingId` means only one
 * video plays at a time, a single `unmutedId` means at most one has sound.
 */
export function VideoProvider({ children }: { children: ReactNode }) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [unmutedId, setUnmutedId] = useState<string | null>(null);

  const play = useCallback((id: string) => {
    setPlayingId((cur) => (cur === id ? cur : id));
  }, []);

  const pause = useCallback((id: string) => {
    setPlayingId((cur) => (cur === id ? null : cur));
  }, []);

  const toggleMute = useCallback((id: string) => {
    setUnmutedId((cur) => (cur === id ? null : id));
  }, []);

  const value = useMemo<VideoStage>(
    () => ({
      playingId,
      unmutedId,
      play,
      pause,
      toggleMute,
      isPlaying: (id: string) => playingId === id,
      isUnmuted: (id: string) => unmutedId === id,
    }),
    [playingId, unmutedId, play, pause, toggleMute],
  );

  return <VideoStageContext.Provider value={value}>{children}</VideoStageContext.Provider>;
}

export function useVideoStage(): VideoStage {
  const ctx = useContext(VideoStageContext);
  if (!ctx) throw new Error("useVideoStage must be used within a VideoProvider");
  return ctx;
}
