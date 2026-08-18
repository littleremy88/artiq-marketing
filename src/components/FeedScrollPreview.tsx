import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Bookmark,
  Heart,
  Home,
  MessageCircle,
  Search,
  Share2,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  User,
} from "lucide-react";
import verdantFold from "@/assets/feed/01-verdant-fold.png";
import duskMeridian from "@/assets/feed/02-dusk-meridian.png";
import rueInTheRain from "@/assets/feed/03-rue-in-the-rain.png";
import alpineBloom from "@/assets/feed/04-alpine-bloom.png";

/**
 * The phone interior is laid out at the app's real logical viewport, then scaled
 * down as a whole, so every value below matches the shipped app one-for-one.
 */
const PHONE_WIDTH = 390;
const PHONE_HEIGHT = 845;

type Slide = {
  image: string;
  title: string;
  price: string;
  artist: string;
  initials: string;
  medium: string;
  year: number;
  likes: string;
  comments: number;
  shares: string;
  liked?: boolean;
  saved?: boolean;
};

const slides: Slide[] = [
  {
    image: verdantFold,
    title: "Verdant Fold",
    price: "$1,850",
    artist: "Mara Ellison",
    initials: "ME",
    medium: "Acrylic on canvas",
    year: 2025,
    likes: "1.2k",
    comments: 34,
    shares: "210",
    liked: true,
  },
  {
    image: duskMeridian,
    title: "Dusk Meridian",
    price: "$3,200",
    artist: "Noor Haddad",
    initials: "NH",
    medium: "Oil on linen",
    year: 2024,
    likes: "4.8k",
    comments: 96,
    shares: "612",
    saved: true,
  },
  {
    image: rueInTheRain,
    title: "Rue in the Rain",
    price: "$4,600",
    artist: "Dmitri Savin",
    initials: "DS",
    medium: "Palette knife oil",
    year: 2024,
    likes: "9.1k",
    comments: 218,
    shares: "1.4k",
    liked: true,
  },
  {
    image: alpineBloom,
    title: "Alpine Bloom",
    price: "$2,400",
    artist: "Lena Fischer",
    initials: "LF",
    medium: "Impasto oil",
    year: 2025,
    likes: "2.7k",
    comments: 61,
    shares: "384",
  },
];

/** Duplicate the first slide at the end so the loop wraps invisibly */
const loopSlides = [...slides, slides[0]];

const HOLD_SECONDS = 2.8;
const TRAVEL_SECONDS = 0.55;

/** Builds a hold-then-swipe keyframe track instead of a constant crawl */
function buildSwipeTimeline(frameCount: number) {
  const step = 100 / frameCount;
  const keyframes: string[] = [];
  const stamps: number[] = [];
  let elapsed = 0;

  for (let i = 0; i < frameCount; i++) {
    const y = `-${i * step}%`;
    keyframes.push(y, y);
    stamps.push(elapsed, elapsed + HOLD_SECONDS);
    elapsed += HOLD_SECONDS + (i < frameCount - 1 ? TRAVEL_SECONDS : 0);
  }

  return {
    keyframes,
    duration: elapsed,
    times: stamps.map((stamp) => stamp / elapsed),
  };
}

const timeline = buildSwipeTimeline(loopSlides.length);

const navTabs = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: Heart, label: "Saved" },
  { icon: MessageCircle, label: "Messages" },
  { icon: User, label: "Profile" },
];

const GOLD = "#B89A5A";
const LIKE = "#C46F77";

function RailAction({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
        {children}
      </div>
      <span
        className="text-[11px] font-medium text-white/85"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * Phone-framed mock of the Artiq feed screen, matching the app's interaction
 * rail, artwork overlay and bottom navigation.
 */
export default function FeedScrollPreview() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="mx-auto [--phone-scale:0.62] sm:[--phone-scale:0.74]"
      style={{
        width: `calc(${PHONE_WIDTH}px * var(--phone-scale))`,
        height: `calc(${PHONE_HEIGHT}px * var(--phone-scale))`,
      }}
    >
      <div
        className="origin-top-left"
        style={{
          width: PHONE_WIDTH,
          height: PHONE_HEIGHT,
          transform: "scale(var(--phone-scale))",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[3rem] border border-ivory/20 bg-charcoal-deep shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          {/* Dynamic island */}
          <div className="absolute left-1/2 top-3 z-[70] h-7 w-28 -translate-x-1/2 rounded-full bg-black" />

          {/* Scrolling feed */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="flex w-full flex-col"
              style={{ height: `${loopSlides.length * 100}%` }}
              animate={reduceMotion ? { y: "0%" } : { y: timeline.keyframes }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: timeline.duration,
                      times: timeline.times,
                      ease: [0.22, 1, 0.36, 1],
                      repeat: Infinity,
                      repeatType: "loop",
                    }
              }
            >
              {loopSlides.map((slide, index) => (
                <div
                  key={`${slide.title}-${index}`}
                  className="relative w-full shrink-0 overflow-hidden"
                  style={{ height: `${100 / loopSlides.length}%` }}
                >
                  <img
                    src={slide.image}
                    alt={`${slide.title} by ${slide.artist}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                  />

                  {/* Vignette */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
                    }}
                  />

                  {/* Bottom scrim */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-80"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
                    }}
                  />

                  {/* Right scrim — keeps the rail readable over pale gallery walls */}
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 w-32"
                    style={{
                      background:
                        "linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 100%)",
                    }}
                  />

                  {/* Interaction rail */}
                  <div className="absolute bottom-40 right-3 z-20 flex flex-col items-center gap-4">
                    <RailAction label={slide.likes}>
                      <Heart
                        className="h-6 w-6"
                        strokeWidth={2}
                        style={{
                          color: slide.liked ? LIKE : "#FFFFFF",
                          fill: slide.liked ? LIKE : "transparent",
                        }}
                      />
                    </RailAction>

                    <RailAction label={String(slide.comments)}>
                      <MessageCircle
                        className="h-6 w-6 text-white"
                        strokeWidth={2}
                      />
                    </RailAction>

                    <RailAction label="Save">
                      <Bookmark
                        className="h-6 w-6"
                        strokeWidth={2}
                        style={{
                          color: slide.saved ? GOLD : "#FFFFFF",
                          fill: slide.saved ? GOLD : "transparent",
                        }}
                      />
                    </RailAction>

                    <RailAction label={slide.shares}>
                      <Share2 className="h-6 w-6 text-white" strokeWidth={2} />
                    </RailAction>

                    {/* Purchase */}
                    <div className="relative mt-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gold-soft via-gold to-gold-soft shadow-[0_0_20px_rgba(184,154,90,0.35)]">
                      <ShoppingBag
                        className="relative z-10 h-5 w-5 text-charcoal"
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  {/* Artwork info */}
                  <div className="absolute bottom-28 left-0 right-16 z-10 px-4">
                    <h3 className="mb-2 font-display text-2xl font-medium leading-tight tracking-wide text-white">
                      {slide.title}
                    </h3>
                    <div className="mb-3 text-xl font-semibold" style={{ color: GOLD }}>
                      {slide.price}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-charcoal-lift to-charcoal text-[11px] font-medium tracking-wide text-ivory/90 ring-1 ring-white/25">
                          {slide.initials}
                        </div>
                        <div
                          className="absolute -bottom-0.5 -right-0.5 rounded-full p-0.5"
                          style={{ background: GOLD }}
                        >
                          <BadgeCheck className="h-3 w-3 text-charcoal" />
                        </div>
                      </div>
                      <div>
                        <span className="block text-sm font-medium tracking-wide text-white">
                          {slide.artist}
                        </span>
                        <span className="text-xs text-white/75">
                          {slide.medium} · {slide.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Header — sits above the feed, like the app */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30">
            <div
              className="absolute inset-x-0 top-0 h-32"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
              }}
            />
            <div className="relative flex items-center justify-center px-4 pb-3 pt-12">
              <div className="absolute left-2 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full">
                <SlidersHorizontal className="h-5 w-5 text-ivory drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" />
              </div>
              <span
                className="font-brand text-[1.75rem] font-medium leading-none tracking-[-0.01em] text-ivory"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
              >
                Artiq
              </span>
            </div>
          </div>

          {/* Bottom navigation */}
          <div className="absolute inset-x-0 bottom-0 z-[60]">
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="relative bg-charcoal/90 pb-5 backdrop-blur-2xl">
              <div className="relative flex items-center justify-around px-2 py-2">
                {/* Active tab pill */}
                <div
                  className="absolute h-10 rounded-2xl bg-gradient-to-r from-gold/20 to-gold-soft/20"
                  style={{ left: 4, top: "50%", marginTop: -20, width: "calc(20% - 8px)" }}
                />
                {/* Active tab glow */}
                <div
                  className="absolute bottom-0 h-1 w-12 rounded-full opacity-60 blur-md"
                  style={{
                    left: "calc(10% - 24px)",
                    background: `linear-gradient(90deg, ${GOLD}, #C9B07A)`,
                  }}
                />

                {navTabs.map(({ icon: Icon, label }, index) => {
                  const isActive = index === 0;
                  return (
                    <div
                      key={label}
                      className="relative z-10 flex flex-col items-center gap-1 px-5 py-2"
                    >
                      <div className="relative">
                        <Icon
                          className={
                            isActive
                              ? "h-5 w-5 text-gold drop-shadow-[0_0_8px_rgba(184,154,90,0.5)]"
                              : "h-5 w-5 text-ivory/40"
                          }
                          strokeWidth={isActive ? 2.5 : 1.5}
                        />
                        {isActive && (
                          <Sparkles className="absolute -right-1 -top-1 h-2.5 w-2.5 text-gold" />
                        )}
                      </div>
                      <span
                        className={`text-[10px] tracking-wide ${
                          isActive ? "font-medium text-gold" : "text-ivory/40"
                        }`}
                      >
                        {label}
                      </span>
                      {isActive && (
                        <div className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-gold" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Inset ring so the phone reads as glass */}
          <div className="pointer-events-none absolute inset-0 z-[80] rounded-[3rem] ring-1 ring-inset ring-ivory/10" />
        </div>
      </div>
    </div>
  );
}
