import type { CSSProperties } from "react";

interface LoaderProps {
  size?: number;
  color?: string;
  className?: string;
  fullscreen?: boolean; // new prop to make it full screen
}

const Loader = ({
  size = 20,
  color = "var(--color-primary)",
  className = "",
  fullscreen = false,
}: LoaderProps) => {
  const style: CSSProperties = {
    width: size,
    height: size,
    borderColor: color,
    borderTopColor: "transparent",
    borderStyle: "solid",
    borderWidth: 3,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  if (fullscreen) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "rgba(255,255,255,0.8)",
          zIndex: 9999,
        }}
      >
        <span className={`loader ${className}`} style={style}></span>
      </div>
    );
  }

  return <span className={`loader ${className}`} style={style}></span>;
};

export default Loader;
