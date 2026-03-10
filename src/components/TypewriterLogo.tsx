/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type State =
  | "IDLE"
  | "TYPING_FULL"
  | "ERASING_FULL"
  | "TYPING_SHORT"
  | "ERASING_SHORT";

const TypewriterLogo = () => {
  const baseName = "JGS";
  const fullText = "joegsuero";

  const [displayText, setDisplayText] = useState(baseName);
  const [state, setState] = useState<State>("IDLE");
  const [isHovering, setIsHovering] = useState(false);

  const timeoutRef = useRef<any>(null);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  // Limpiar timeouts en desmontaje
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Función que calcula el siguiente estado y texto
  const calculateNextState = (
    currentState: State,
    currentText: string,
    hovering: boolean,
  ): [State, string] => {
    const nextState = currentState;
    let nextText = currentText;

    // ESTADO: IDLE
    // Esperando hover para comenzar
    if (currentState === "IDLE") {
      if (hovering) {
        return ["TYPING_FULL", ""];
      }
      return [nextState, nextText];
    }

    // ESTADO: TYPING_FULL
    // Escribiendo "joegsuero"
    if (currentState === "TYPING_FULL") {
      if (currentText.length < fullText.length) {
        // Aún hay caracteres por escribir
        nextText = fullText.substring(0, currentText.length + 1);
        return [nextState, nextText];
      } else {
        // Terminó de escribir el nombre completo
        if (!hovering) {
          // Si no está en hover, cambiar a borrado
          return ["ERASING_FULL", nextText];
        }
        // Si sigue en hover, quedarse esperando (no hacer nada)
        return [nextState, nextText];
      }
    }

    // ESTADO: ERASING_FULL
    // Borrando "joegsuero"
    if (currentState === "ERASING_FULL") {
      if (hovering) {
        // Si vuelve a entrar en hover mientras está borrando, volver a escribir
        return ["TYPING_FULL", ""];
      }

      if (currentText.length > 0) {
        // Aún hay caracteres por borrar
        nextText = fullText.substring(0, currentText.length - 1);
        return [nextState, nextText];
      } else {
        // Terminó de borrar, ahora escribir "JGS"
        return ["TYPING_SHORT", ""];
      }
    }

    // ESTADO: TYPING_SHORT
    // Escribiendo "JGS"
    if (currentState === "TYPING_SHORT") {
      if (currentText.length < baseName.length) {
        // Aún hay caracteres por escribir
        nextText = baseName.substring(0, currentText.length + 1);
        return [nextState, nextText];
      } else {
        // Terminó de escribir "JGS"
        if (hovering) {
          // Si entra en hover, volver a escribir el nombre completo
          return ["TYPING_FULL", ""];
        }
        // Si no hay hover, volver a IDLE
        return ["IDLE", nextText];
      }
    }

    // ESTADO: ERASING_SHORT
    // Borrando "JGS"
    if (currentState === "ERASING_SHORT") {
      if (hovering) {
        // Si entra en hover mientras borra, volver a escribir el nombre completo
        return ["TYPING_FULL", ""];
      }

      if (currentText.length > 0) {
        // Aún hay caracteres por borrar
        nextText = baseName.substring(0, currentText.length - 1);
        return [nextState, nextText];
      } else {
        // Terminó de borrar "JGS", ahora escribir el nombre completo
        return ["TYPING_FULL", ""];
      }
    }

    return [nextState, nextText];
  };

  // Loop principal de animación
  useEffect(() => {
    const timer = setTimeout(() => {
      const [nextState, nextText] = calculateNextState(
        state,
        displayText,
        isHovering,
      );

      // Aplicar cambios si hay
      if (nextText !== displayText) {
        setDisplayText(nextText);
      }
      if (nextState !== state) {
        setState(nextState);
      }
    }, 100);

    timeoutRef.current = timer;
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [state, displayText, isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const isTyping = state === "TYPING_FULL" || state === "TYPING_SHORT";

  return (
    <span
      className="bg-blue-900 px-2 py-1 rounded cursor-pointer inline-block min-w-[3rem] hover:bg-blue-800 transition-colors"
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
      title="Click para ir a inicio"
    >
      {displayText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
};

export default TypewriterLogo;
