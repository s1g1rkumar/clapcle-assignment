import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import Header from "../components/header";

const MainLayout: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateContentHeight = () => {
      if (headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight;

        document.documentElement.style.setProperty(
          "--header-height",
          `${headerHeight}px`
        );
      }
    };

    updateContentHeight();
    window.addEventListener("resize", updateContentHeight);
    return () => window.removeEventListener("resize", updateContentHeight);
  }, []);

  return (
    <>
      <Header ref={headerRef}/>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
