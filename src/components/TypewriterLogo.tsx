import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TypewriterLogo = () => {
  const baseName = "JGS";
  const [text, setText] = useState(baseName);
  const [isTyping, setIsTyping] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const fullText = "joegsuero";
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isTyping) {
      const currentLength = text === baseName ? 0 : text.length;

      if (currentLength < fullText.length) {
        timeoutRef.current = setTimeout(() => {
          setText(fullText.substring(0, currentLength + 1));
        }, 100);
      } else {
        setIsTyping(false);

        if (!isHovering) {
          timeoutRef.current = setTimeout(() => {
            setText(baseName);
          }, 500);
        }
      }
    }
  }, [text, isTyping, isHovering, fullText]);

  const handleMouseEnter = () => {
    setIsHovering(true);

    if (!isTyping && text === baseName) {
      setIsTyping(true);
      setText("");
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);

    if (!isTyping && text === fullText) {
      timeoutRef.current = setTimeout(() => {
        setText("JGS");
      }, 1000);
    }
  };

  return (
    <span
      className="bg-blue-900 px-2 py-1 rounded cursor-pointer inline-block min-w-[3rem]"
      onClick={() => {
        if (pathname.includes("projects")) {
          navigate("/");
        } else {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
};

export default TypewriterLogo;
