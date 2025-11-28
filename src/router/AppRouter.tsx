import { createBrowserRouter } from "react-router";
import { lazy, Suspense, type ReactNode } from "react";
import Loader from "../components/common/Loader";
const Home = lazy(() => import("../pages/home"));

const withSuspense = (Component: ReactNode) => (
  <Suspense fallback={<Loader size={35} fullscreen />}>{Component}</Suspense>
);

const router = createBrowserRouter([
  { path: "/", element: withSuspense(<Home />) },
]);

export default router;
