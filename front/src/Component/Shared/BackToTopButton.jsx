import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed right-25 z-100 bottom-8 transition-all duration-300 ${
        isVisible ? "opacity-100 scale-90" : "opacity-0 scale-50"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-xl transition-all duration-300 hover:scale-115 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        aria-label="Back to top"
      >
        <ArrowUp size={28} className="transition-transform duration-300" />
      </button>
    </div>
  );
}
