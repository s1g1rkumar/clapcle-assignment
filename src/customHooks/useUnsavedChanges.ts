import { useEffect, useState } from "react";
import { useBlocker } from "react-router";

export function useUnsavedNavigation(isDirty: boolean) {
  const blocker = useBlocker(isDirty);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!isDirty) return;

    const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; 
    };

    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, [isDirty]);

  useEffect(() => {
    let timer: number | undefined = undefined;
    timer = window.setTimeout(() => {
      setShowPrompt(blocker.state === "blocked");
    }, 0);

    return () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    };
  }, [blocker.state]);

  const stay = () => {
    setShowPrompt(false);
    blocker.reset?.();
  };

  const leave = () => {
    setShowPrompt(false);
    blocker.proceed?.();
  };

  return {
    showPrompt,
    stay,
    leave,
  };
}
