# Вертикальные видео-галереи для лендингов — универсальное руководство

Переносимый модуль из двух секций «телефонных» видео-галерей: горизонтальный
сторис-рэйл и видео-отзывы (сплит). Работает на плейсхолдерах, пока нет MP4.
Проверено в бою на лендинге PointCamp (Vite + React 18 + Tailwind v4).

---

## 1. Что это и когда брать

- **Секция 1 «Сторис-рэйл»** — горизонтальная лента телефонных рамок со
  scroll-snap. Играет та карточка, что ближе к центру. На десктопе — стрелки
  вперёд/назад, на мобиле — только свайп.
- **Секция 2 «Видео-отзывы» (сплит)** — на десктопе слева большая рамка с
  активным видео, справа кликабельный список. На мобиле рамка сверху, чипсы
  снизу.

Обе секции используют «телефонную» рамку на чистом CSS (без картинок) и общую
логику воспроизведения.

**Ключевые свойства (уже реализованы):**
- на всей странице играет **только одно** видео одновременно;
- **звук включён максимум у одного** ролика (включил один — остальные замьютились);
- автоплей только когда ролик виден ≥60% (IntersectionObserver), пауза при уходе
  из вьюпорта;
- уважает `prefers-reduced-motion` и `navigator.connection.saveData` — тогда без
  автоплея, показываем постер + кнопку play;
- размер рамки зарезервирован до загрузки (9:16) — **нет layout shift**;
- при первом воспроизведении шлёт в `dataLayer` событие `video_play`;
- нет новых npm-зависимостей (иконки — из уже стоящего `lucide-react`; можно
  заменить на inline-SVG, см. §7).

---

## 2. Требования к проекту

| Нужно | Зачем |
|---|---|
| React 18 (`useState/useEffect/useRef/createContext`) | компоненты |
| Tailwind (v4 `@theme` или v3 config) с токенами цветов | стили |
| `lucide-react` (опционально) | иконки play/mute/стрелки |
| Тип `Window.dataLayer` в d.ts | строгий TS + аналитика |

**Токены цветов**, на которые опирается код (Tailwind v4, файл `styles.css`):

```css
@theme {
  --color-bg: #f4f1ea;
  --color-paper: #f9f6ef;
  --color-card: #ffffff;
  --color-ink: #14140f;
  --color-ink-soft: #2a2a22;
  --color-ink-muted: #6b6b5e;
  --color-line: #1a1a14;
  --color-line-soft: #d8d2c2;
  --color-purple: #5a2d87;   /* бренд-фиолетовый */
  --color-purple-soft: #ede4f7;
  --color-yellow: #ffb800;   /* hot yellow */
  --color-mint: #00c897;     /* mint green */
  --color-mint-soft: #d6f5ea;
}
```

Если на другом лендинге токены называются иначе — либо заведи такие же имена,
либо разово поменяй классы (`bg-ink`, `text-purple`, `border-line-soft`, …) под
местные. Класс `.eyebrow` (моно-надпись капсом) тоже используется — заведи его
или замени на свой.

Тип для аналитики (`src/vite-env.d.ts` или любой `.d.ts`):

```ts
interface Window {
  dataLayer: Record<string, unknown>[];
}
```

---

## 3. Структура файлов

Всё складываем в одну папку — легко копировать между проектами:

```
src/components/video/
  videos.ts             // данные + типы
  VideoContext.tsx      // общий «стейдж»: кто играет / у кого звук
  PhoneFrame.tsx        // телефонная рамка (чистый CSS), размеры md|lg
  VideoCard.tsx         // видео/плейсхолдер + play/pause/mute + IO + аналитика
  StoriesRail.tsx       // Секция 1
  VideoTestimonials.tsx // Секция 2
```

---

## 4. Полный код

### 4.1 `videos.ts`

```ts
export type VideoItem = {
  id: string;
  title: string;
  caption?: string;
  src?: string;
  poster?: string;
};

export type VideoBlock = "rail" | "testimonials";

// Секция 1 — сторис-рэйл. Позже кладёшь MP4 в public/video/ и заполняешь src/poster.
export const RAIL_VIDEOS: VideoItem[] = [
  { id: "rail-croatia", title: "Хорватія" },
  { id: "rail-japan", title: "Японія" },
  { id: "rail-korea", title: "Корея" },
  { id: "rail-first-day", title: "Перший день" },
  { id: "rail-team", title: "Команда" },
];

// Секция 2 — видео-отзывы. Caption — плейсхолдеры.
export const TESTIMONIAL_VIDEOS: VideoItem[] = [
  { id: "review-mom", title: "Відгук мами", caption: "Ім'я, місто · напрям табору" },
  { id: "review-dad", title: "Відгук тата", caption: "Ім'я, місто · напрям табору" },
  { id: "review-teen", title: "Відгук учасника", caption: "Ім'я, місто · напрям табору" },
];
```

### 4.2 `VideoContext.tsx`

```tsx
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
    [playingId, unmutedId, play, pause, toggleMute]
  );

  return <VideoStageContext.Provider value={value}>{children}</VideoStageContext.Provider>;
}

export function useVideoStage(): VideoStage {
  const ctx = useContext(VideoStageContext);
  if (!ctx) throw new Error("useVideoStage must be used within a VideoProvider");
  return ctx;
}
```

### 4.3 `PhoneFrame.tsx`

```tsx
import type { ReactNode } from "react";

type PhoneFrameSize = "md" | "lg";

type PhoneFrameProps = {
  size?: PhoneFrameSize;
  children: ReactNode;
  className?: string;
};

const WIDTH: Record<PhoneFrameSize, string> = {
  md: "w-[200px] sm:w-[220px]",
  lg: "w-[248px] sm:w-[288px]",
};

export function PhoneFrame({ size = "md", children, className = "" }: PhoneFrameProps) {
  return (
    <div className={`${WIDTH[size]} ${className}`}>
      <div className="relative rounded-[32px] bg-ink p-[5px] shadow-[0_18px_44px_-14px_rgba(20,20,15,0.5)] md:rounded-[44px] md:p-[10px]">
        {/* Dynamic island — только десктоп (в lite-варианте скрыт) */}
        <div className="pointer-events-none absolute left-1/2 top-[14px] z-20 hidden h-[24px] w-[82px] -translate-x-1/2 rounded-full bg-ink md:block" />
        {/* Экран: строго 9:16, резервирует высоту до загрузки */}
        <div
          className="relative overflow-hidden rounded-[28px] bg-ink md:rounded-[36px]"
          style={{ aspectRatio: "9 / 16" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
```

### 4.4 `VideoCard.tsx`

```tsx
import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import type { VideoBlock, VideoItem } from "./videos";
import { useVideoStage } from "./VideoContext";

function computeCanAutoplay(): boolean {
  if (typeof window === "undefined") return false;
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
  active: boolean; // выбрана ли эта карточка своей секцией
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

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.6);
      },
      { threshold: [0, 0.6, 1] }
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
    if (willUnmute) play(item.id); // включение звука = жест пользователя → играем
  };

  return (
    <div ref={rootRef} className="relative h-full w-full bg-ink">
      {item.src ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={item.src}
          poster={item.poster}
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
        className="absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow"
      >
        {!playing && (
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink/55 text-white backdrop-blur-sm">
            <Play size={24} fill="currentColor" className="translate-x-[1px]" />
          </span>
        )}
      </button>

      <button
        type="button"
        onClick={onToggleMute}
        aria-pressed={unmuted}
        aria-label={unmuted ? `Вимкнути звук: ${item.title}` : `Увімкнути звук: ${item.title}`}
        className="absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-ink/55 text-white backdrop-blur-sm transition-colors hover:bg-ink/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
      >
        {unmuted ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
    </div>
  );
}

function Placeholder({ title, playing }: { title: string; playing: boolean }) {
  return (
    <div className="relative h-full w-full">
      <div className="phv-ph-bg absolute inset-0" />
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 px-4 text-center">
        <span className="font-display text-2xl leading-tight text-white drop-shadow-[0_1px_10px_rgba(20,20,15,0.4)]">
          {title}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/85">
          ▶ відео
        </span>
      </div>
      <div className="absolute inset-x-3 bottom-3 h-1 overflow-hidden rounded-full bg-white/25">
        <div
          className="phv-ph-progress h-full w-full origin-left rounded-full bg-white/85"
          style={{ animationPlayState: playing ? "running" : "paused" }}
        />
      </div>
      <style>{`
        .phv-ph-bg{
          background:linear-gradient(135deg,var(--color-purple) 0%,var(--color-mint) 48%,var(--color-yellow) 100%);
          background-size:220% 220%;
          animation:phvShift 16s ease-in-out infinite;
        }
        @keyframes phvShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .phv-ph-progress{transform:scaleX(0);animation:phvProgress 8s linear infinite;}
        @keyframes phvProgress{0%{transform:scaleX(0)}100%{transform:scaleX(1)}}
        @media (prefers-reduced-motion: reduce){.phv-ph-bg{animation:none}.phv-ph-progress{animation:none}}
      `}</style>
    </div>
  );
}
```

### 4.5 `StoriesRail.tsx`

```tsx
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhoneFrame } from "./PhoneFrame";
import { VideoCard } from "./VideoCard";
import { RAIL_VIDEOS } from "./videos";

export function StoriesRail() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let raf = 0;
    const update = () => {
      const rect = scroller.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const cards = Array.from(scroller.querySelectorAll<HTMLElement>("[data-rail-card]"));
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const dist = Math.abs(r.left + r.width / 2 - center);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      setActiveIdx(best);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => { scroller.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const scrollByCards = (dir: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-rail-card]");
    const amount = card ? card.offsetWidth + 16 : scroller.clientWidth * 0.8;
    scroller.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="relative bg-paper border-b border-line overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-5 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="eyebrow">відео · зсередини</div>
            <h2 className="mt-3 font-display text-4xl sm:text-6xl leading-[0.98] text-ink">
              Як це виглядає зсередини
            </h2>
            <p className="mt-5 text-ink-soft leading-relaxed">
              Короткі відео з наших таборів — без фільтрів і постановки.
            </p>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button type="button" onClick={() => scrollByCards(-1)} aria-label="Попередні відео"
              className="flex h-11 w-11 items-center justify-center border border-line-soft bg-card text-ink transition-colors hover:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-purple">
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => scrollByCards(1)} aria-label="Наступні відео"
              className="flex h-11 w-11 items-center justify-center border border-line-soft bg-card text-ink transition-colors hover:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-purple">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div ref={scrollerRef} className="phv-no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
          {RAIL_VIDEOS.map((item, i) => (
            <div key={item.id} data-rail-card className="shrink-0 snap-center">
              <PhoneFrame size="md">
                <VideoCard item={item} block="rail" active={i === activeIdx} />
              </PhoneFrame>
              <div className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">
                {item.title}
              </div>
            </div>
          ))}
        </div>
        <style>{`.phv-no-scrollbar{scrollbar-width:none;-ms-overflow-style:none}.phv-no-scrollbar::-webkit-scrollbar{display:none}`}</style>
      </div>
    </section>
  );
}
```

### 4.6 `VideoTestimonials.tsx`

```tsx
import { useState } from "react";
import { PhoneFrame } from "./PhoneFrame";
import { VideoCard } from "./VideoCard";
import { TESTIMONIAL_VIDEOS } from "./videos";

export function VideoTestimonials() {
  const [activeId, setActiveId] = useState(TESTIMONIAL_VIDEOS[0].id);
  const activeItem = TESTIMONIAL_VIDEOS.find((v) => v.id === activeId) ?? TESTIMONIAL_VIDEOS[0];

  return (
    <section className="relative bg-bg border-b border-line overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-5 py-24">
        <div className="max-w-2xl">
          <div className="eyebrow">відгуки · відео</div>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl leading-[0.98] text-ink">
            Батьки про Point Camp
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="flex justify-center md:justify-start">
            {/* key = activeItem.id: при переключении ремоунт → новый ролик автоплеит */}
            <PhoneFrame size="lg">
              <VideoCard key={activeItem.id} item={activeItem} block="testimonials" active />
            </PhoneFrame>
          </div>

          <ul className="phv-no-scrollbar flex gap-2 overflow-x-auto pb-2 md:flex-col md:gap-3 md:overflow-visible md:pb-0">
            {TESTIMONIAL_VIDEOS.map((item) => {
              const selected = item.id === activeItem.id;
              return (
                <li key={item.id} className="shrink-0 md:shrink">
                  <button type="button" onClick={() => setActiveId(item.id)} aria-pressed={selected}
                    aria-label={`Показати відгук: ${item.title}`}
                    className={`w-full border px-4 py-3 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-purple ${
                      selected ? "border-purple bg-purple-soft" : "border-line-soft bg-card hover:border-ink"
                    }`}>
                    <div className="font-display text-lg leading-tight text-ink">{item.title}</div>
                    {item.caption && <div className="mt-1 text-sm text-ink-muted">{item.caption}</div>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <style>{`.phv-no-scrollbar{scrollbar-width:none;-ms-overflow-style:none}.phv-no-scrollbar::-webkit-scrollbar{display:none}`}</style>
      </div>
    </section>
  );
}
```

---

## 5. Подключение (App)

Оберни страницу в `VideoProvider` (нужен один на всю страницу — так гарантируется
«играет только одно видео») и вставь секции туда, куда просит поток контента:

- **Сторис-рэйл** — сразу после блока с направлениями/программой.
- **Видео-отзывы** — рядом с блоком доверия/отзывов, выше формы.

```tsx
import { VideoProvider } from "./components/video/VideoContext";
import { StoriesRail } from "./components/video/StoriesRail";
import { VideoTestimonials } from "./components/video/VideoTestimonials";

export default function App() {
  return (
    <VideoProvider>
      <main className="min-h-screen bg-bg text-ink">
        {/* ...Hero, Destinations... */}
        <StoriesRail />
        {/* ...Bento, Gallery... */}
        <VideoTestimonials />
        {/* ...Speaker, Form, Footer... */}
      </main>
    </VideoProvider>
  );
}
```

---

## 6. Как заполнить реальными видео

1. Положи файлы в `public/video/` (напр. `japan.mp4`, `japan.jpg`).
2. Заполни `src`/`poster` в `videos.ts`:

```ts
{ id: "rail-japan", title: "Японія", src: "/video/japan.mp4", poster: "/video/japan.jpg" }
```

Как только `src` появился — плейсхолдер сам заменяется на `<video>`. Больше
ничего править не нужно.

**Рекомендации по видео:**
- вертикаль **9:16** (напр. 1080×1920), обрезка `object-cover`;
- H.264/AAC `.mp4` (или `.webm` рядом); держи вес ролика небольшим — грузится
  только когда виден (`preload="none"`);
- всегда клади `poster` — это первый кадр до автоплея и фолбэк при saveData/
  reduced-motion.

---

## 7. Кастомизация под другой лендинг

| Что | Где менять |
|---|---|
| Тексты заголовков/подзаголовков | `StoriesRail.tsx`, `VideoTestimonials.tsx` (JSX) |
| Список роликов, подписи | `videos.ts` |
| Порядок/выбор по умолчанию (отзывы) | первый элемент `TESTIMONIAL_VIDEOS` |
| Размер рамки | `PhoneFrame` → `WIDTH` (`md`/`lg`) |
| Радиус/безель/остров рамки | `PhoneFrame.tsx` (классы `rounded-*`, `p-*`) |
| Цвет градиента плейсхолдера | `.phv-ph-bg` в `VideoCard.tsx` |
| Фон секций | `bg-paper` / `bg-bg` на `<section>` |
| Порог видимости (сейчас 60%) | `>= 0.6` в `VideoCard.tsx` |
| Событие аналитики | `dataLayer.push({...})` в `VideoCard.tsx` |

**Без lucide-react:** замени `<Play/>`, `<Volume2/>`, `<VolumeX/>`,
`<ChevronLeft/>`, `<ChevronRight/>` на inline-SVG или текстовые глифы
(`▶`, `🔇`, `‹`, `›`) — логика не изменится.

**Другой дизайн-система токенов:** проще всего завести те же имена
(`--color-ink`, `--color-purple`, `--color-line-soft`, …) в своём `@theme`.
Иначе — заменить классы по месту.

---

## 8. Аналитика

При **первом** воспроизведении каждого ролика:

```js
window.dataLayer.push({
  event: "video_play",
  video_block: "rail" | "testimonials",
  video_id: "<id ролика>",
});
```

`dataLayer` инициализируется, если его нет. В GTM заведи триггер Custom Event
`video_play` и, при желании, тэги под нужные `video_id`/`video_block`.

---

## 9. Что уже учтено (не ломай при правках)

- **Один играет на странице** — за счёт единого `playingId` в контексте.
- **Один со звуком** — единый `unmutedId`.
- **IntersectionObserver ≥60%** — автоплей/пауза по видимости.
- **Reduced-motion / Data Saver** — без автоплея, постер + play.
- **Нет layout shift** — рамка 9:16 держит размер до загрузки, `preload="none"`.
- **Доступность** — все контролы это `<button>`, у каждого `aria-label`
  (укр.), у переключателей `aria-pressed`, видимый `focus-visible` ринг,
  тач-таргет 44px, полностью с клавиатуры.
- **TypeScript strict-clean** — компилируется без ошибок под `strict`.

---

## 10. Чеклист внедрения на новый лендинг

1. [ ] Скопировать папку `src/components/video/`.
2. [ ] Проверить токены цветов и класс `.eyebrow` (или подставить свои).
3. [ ] Добавить тип `Window.dataLayer` в `.d.ts`.
4. [ ] Убедиться, что стоит `lucide-react` (или заменить иконки).
5. [ ] Обернуть страницу в `<VideoProvider>`, вставить `<StoriesRail/>` и
       `<VideoTestimonials/>` в нужные места.
6. [ ] Поправить тексты в секциях и список в `videos.ts`.
7. [ ] `tsc --noEmit` + сборка — зелёные.
8. [ ] Позже: закинуть MP4 в `public/video/` и заполнить `src`/`poster`.
9. [ ] В GTM завести триггер `video_play`.

---

## 11. Как откатить

Всё лежит в одной папке + обёртка `VideoProvider` и две строки-секции в App.
Откат = удалить папку `src/components/video/`, убрать импорты и `<VideoProvider>`
+ обе секции из App. В git это один коммит — можно просто `git revert`.
