import { motion } from "framer-motion";
import starryNight from "@/assets/classical/01-starry-night.jpg";
import greatWave from "@/assets/classical/02-great-wave.jpg";
import impression from "@/assets/classical/03-impression.jpg";
import wanderer from "@/assets/classical/04-wanderer.jpg";
import picasso from "@/assets/classical/05-picasso.jpg";
import scroll from "@/assets/classical/06-scroll.jpg";
import oxbow from "@/assets/classical/07-oxbow.jpg";
import storm from "@/assets/classical/08-storm.jpg";
import winter from "@/assets/classical/09-winter.jpg";

/** Classical wall — same masterpiece set as the Artiq app splash */
export const classicalArtworks = [
  { id: 1, name: "Starry Night", url: starryNight },
  { id: 2, name: "The Great Wave", url: greatWave },
  { id: 3, name: "Impression seascape", url: impression },
  { id: 4, name: "Wanderer", url: wanderer },
  { id: 5, name: "Cubist portrait", url: picasso },
  { id: 6, name: "Dead Sea Scrolls", url: scroll },
  { id: 7, name: "The Oxbow", url: oxbow },
  { id: 8, name: "Storm sky", url: storm },
  { id: 9, name: "Winter landscape", url: winter },
];

const kenBurns = [
  { scale: [1, 1.15], x: [0, -10], y: [0, -10] },
  { scale: [1.1, 1], x: [-5, 5], y: [-5, 5] },
  { scale: [1, 1.12], x: [0, 8], y: [0, -8] },
  { scale: [1.08, 1], x: [5, -5], y: [5, -5] },
];

function ArtworkTile({
  artwork,
  index,
  totalTiles,
}: {
  artwork: (typeof classicalArtworks)[0];
  index: number;
  totalTiles: number;
}) {
  const delay = (index / totalTiles) * 2;
  const direction = kenBurns[index % kenBurns.length];

  return (
    <motion.div
      className="relative overflow-hidden bg-charcoal-deep"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: delay * 0.25 }}
    >
      <motion.img
        src={artwork.url}
        alt=""
        className="h-full w-full scale-110 object-cover"
        animate={direction}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay,
        }}
      />
    </motion.div>
  );
}

interface ArtBackgroundProps {
  /** Mosaic brightness before scrim (0–100). Default matches the app splash. */
  opacity?: number;
}

/** GTA-style classical art wall — every cell filled; scrim keeps copy readable */
export default function ArtBackground({ opacity = 70 }: ArtBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5"
        style={{ opacity: opacity / 100 }}
      >
        {classicalArtworks.map((artwork, index) => (
          <ArtworkTile
            key={artwork.id}
            artwork={artwork}
            index={index}
            totalTiles={classicalArtworks.length}
          />
        ))}
      </div>

      {/* Directional scrim: heavier on the copy side, lighter so art still reads in every cell */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(90deg, rgba(28, 28, 26, 0.82) 0%, rgba(28, 28, 26, 0.45) 38%, rgba(28, 28, 26, 0.28) 100%),
            linear-gradient(180deg, rgba(28, 28, 26, 0.4) 0%, rgba(28, 28, 26, 0.25) 42%, rgba(28, 28, 26, 0.55) 100%)
          `,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 140px 50px rgba(0, 0, 0, 0.45)" }}
      />
    </div>
  );
}
