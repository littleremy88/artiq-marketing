import { motion } from "framer-motion";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";
import artwork5 from "@/assets/artwork-5.jpg";

const slides = [artwork1, artwork2, artwork3, artwork4, artwork5];
/** Duplicate first slide at end for a seamless loop */
const loopSlides = [...slides, slides[0]];

/**
 * Phone-framed mock of the Artiq vertical feed, auto-scrolling like the app.
 */
export default function FeedScrollPreview() {
  return (
    <div className="mx-auto w-full max-w-[280px]">
      <div
        className="relative overflow-hidden rounded-[2rem] border border-ivory/20 bg-charcoal-deep shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
        style={{ aspectRatio: "9 / 19.5" }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-charcoal" />

        {/* Scrolling feed */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="flex h-full flex-col"
            animate={{ y: ["0%", `-${(slides.length / loopSlides.length) * 100}%`] }}
            transition={{
              duration: slides.length * 3.2,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
            style={{ height: `${loopSlides.length * 100}%` }}
          >
            {loopSlides.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative w-full shrink-0"
                style={{ height: `${100 / loopSlides.length}%` }}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(28,28,26,0.75) 0%, transparent 45%)",
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Soft edge fade so the phone feels inset */}
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-ivory/10" />
      </div>
    </div>
  );
}
