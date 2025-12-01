import { createBrowserRouter } from "react-router";
import { lazy, Suspense, type ReactNode } from "react";
import Loader from "../components/common/Loader";
import MainLayout from "./MainLayout";
const Home = lazy(() => import("../pages/home"));
const DummyPage1 = lazy(() => import("../pages/dummyPage1"));
const DummyPage2 = lazy(() => import("../pages/dummyPage2"));
const DummyPage3 = lazy(() => import("../pages/dummyPage3"));

const withSuspense = (Component: ReactNode) => (
  <Suspense fallback={<Loader size={35} fullscreen />}>{Component}</Suspense>
);

const router = createBrowserRouter([
  {
    element: withSuspense(<MainLayout />),
    children: [
      { path: "/", element: withSuspense(<Home />) },
      { path: "/dummy-1", element: withSuspense(<DummyPage1 />) },
      { path: "/dummy-2", element: withSuspense(<DummyPage2 />) },
      { path: "/dummy-3", element: withSuspense(<DummyPage3 />) },
    ],
  },
]);

export default router;
