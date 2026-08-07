import { motion } from "framer-motion";

/** Famous classical works (Wikimedia) — same collage as the Artiq loading screen */
export const classicalArtworks = [
  {
    id: 1,
    name: "Mona Lisa",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
  },
  {
    id: 2,
    name: "Starry Night",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  },
  {
    id: 3,
    name: "The Great Wave",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg",
  },
  {
    id: 4,
    name: "Girl with a Pearl Earring",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg",
  },
  {
    id: 5,
    name: "The Birth of Venus",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
  },
  {
    id: 6,
    name: "The Persistence of Memory",
    url: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
  },
  {
    id: 7,
    name: "The Creation of Adam",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1280px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
  },
  {
    id: 8,
    name: "The Scream",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/800px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
  },
  {
    id: 9,
    name: "Water Lilies",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Claude_Monet_-_Water_Lilies_-_1906%2C_Ryerson.jpg",
  },
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
        className="h-full w-full object-cover"
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

/** GTA-style classical art wall used on the Artiq loading screen */
export default function ArtBackground({ opacity = 55 }: ArtBackgroundProps) {
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

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, rgba(28, 28, 26, 0.55) 45%, rgba(28, 28, 26, 0.92) 100%),
            linear-gradient(180deg, rgba(28, 28, 26, 0.35) 0%, rgba(28, 28, 26, 0.55) 45%, rgba(28, 28, 26, 0.92) 100%)
          `,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 180px 80px rgba(0, 0, 0, 0.75)" }}
      />
    </div>
  );
}
