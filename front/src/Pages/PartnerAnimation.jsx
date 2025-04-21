import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EnhancedCinematicPartnerAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("partners-section");
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on component mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const partners = [
    { name: "Nabil", image: "../../src/assets/pic/نبيل.jpeg" },
    { name: "Tamam", image: "../../src/assets/pic/تمام.jpg" },
    { name: "Al-Ezz", image: "../../src/assets/pic/العز.png" },
    { name: "Al-Jazeera", image: "../../src/assets/pic/الجزيرة.png" },
    { name: "Siniora", image: "../../src/assets/pic/سنيورة.png" },
    { name: "Al-Wataniya", image: "../../src/assets/pic/الوطنية.jpeg" },
  ];

  // Enhanced positions for a wider, more spaced orbital effect
  // Increased the x and z values to create more spacing between elements
const positions = [
  { x: -500, y: 40, z: -300, scale: 0.7 },
  { x: -300, y: -40, z: -100, scale: 0.8 },
  { x: -100, y: -80, z: 200, scale: 1 },
  { x: 100, y: -80, z: 200, scale: 1 },
  { x: 300, y: -40, z: -100, scale: 0.8 },
  { x: 500, y: 40, z: -300, scale: 0.7 },
];

  return (
    <section id="partners-section" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-gray-600 font-semibold text-sm uppercase tracking-wider"
          >
            Trusted By
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-gray-800 mt-2"
          >
            Our Partners & Suppliers
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 w-24 bg-blue-600 mx-auto mt-6"
          />
        </div>

        {/* Enhanced 3D Cinematic Orbit Animation */}
        <div className="relative h-96 perspective-1000 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1, rotateY: 360 } : {}}
            transition={{
              opacity: { duration: 1 },
              rotateY: { duration: 60, repeat: Infinity, ease: "linear" },
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {partners.map((partner, index) => {
              // Calculate initial position based on index
              const initialPos = positions[index % positions.length];

              return (
                <motion.div
                  key={index}
                  className="absolute w-48 h-32 bg-white rounded-xl shadow-xl flex items-center justify-center overflow-hidden"
                  initial={{
                    x: initialPos.x,
                    y: initialPos.y,
                    z: initialPos.z,
                    scale: initialPos.scale,
                    opacity: initialPos.z > 0 ? 1 : 0.6,
                    rotateY: index % 2 === 0 ? 10 : -10,
                  }}
                  animate={
                    isVisible
                      ? {
                          x: [
                            initialPos.x,
                            ...Array(partners.length - 1)
                              .fill(0)
                              .map((_, i) => {
                                const newIndex =
                                  (index + i + 1) % partners.length;
                                return positions[newIndex % positions.length].x;
                              }),
                            initialPos.x,
                          ],
                          y: [
                            initialPos.y,
                            ...Array(partners.length - 1)
                              .fill(0)
                              .map((_, i) => {
                                const newIndex =
                                  (index + i + 1) % partners.length;
                                return positions[newIndex % positions.length].y;
                              }),
                            initialPos.y,
                          ],
                          z: [
                            initialPos.z,
                            ...Array(partners.length - 1)
                              .fill(0)
                              .map((_, i) => {
                                const newIndex =
                                  (index + i + 1) % partners.length;
                                return positions[newIndex % positions.length].z;
                              }),
                            initialPos.z,
                          ],
                          scale: [
                            initialPos.scale,
                            ...Array(partners.length - 1)
                              .fill(0)
                              .map((_, i) => {
                                const newIndex =
                                  (index + i + 1) % partners.length;
                                return positions[newIndex % positions.length]
                                  .scale;
                              }),
                            initialPos.scale,
                          ],
                          opacity: [
                            initialPos.z > 0 ? 1 : 0.6,
                            ...Array(partners.length - 1)
                              .fill(0)
                              .map((_, i) => {
                                const newIndex =
                                  (index + i + 1) % partners.length;
                                return positions[newIndex % positions.length]
                                  .z > 0
                                  ? 1
                                  : 0.6;
                              }),
                            initialPos.z > 0 ? 1 : 0.6,
                          ],
                          rotateY: [
                            index % 2 === 0 ? 10 : -10,
                            index % 2 === 0 ? -10 : 10,
                            index % 2 === 0 ? 10 : -10,
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 1,
                    rotateY: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatType: "reverse",
                    },
                  }}
                  style={{
                    zIndex: isVisible
                      ? hoveredIndex === index
                        ? 100
                        : Math.round(initialPos.z + 100)
                      : 0,
                    filter:
                      initialPos.z < 0
                        ? `blur(${Math.abs(initialPos.z) / 100}px)`
                        : "none",
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{
                    scale: initialPos.scale * 1.2,
                    zIndex: 100,
                    filter: "none",
                    boxShadow: "0px 15px 35px rgba(0,0,0,0.2)",
                    rotateY: 0,
                    transition: {
                      duration: 0.4,
                      type: "spring",
                      stiffness: 300,
                    },
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <motion.div
                    className="w-full h-full p-4 flex items-center justify-center bg-white"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-center"
                  >
                    <span className="text-white text-base font-medium">
                      {partner.name}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Subtle floating decorative elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-blue-100"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full bg-blue-100"
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />

        {/* Control buttons with improved styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center mt-16 gap-6"
        >
     
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedCinematicPartnerAnimation;
