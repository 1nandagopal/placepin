import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Places from "./routes/Places";
const MyPlaces = lazy(() => import("./routes/MyPlaces"));
const NewPlace = lazy(() => import("./routes/NewPlace"));
const Auth = lazy(() => import("./routes/Auth"));

function App() {
  return (
    <main className="bg-gray-900 h-screen text-white p-8 overflow-auto">
      <Routes>
        <Route path="/" element={<Places />} />
        <Route
          path="/new"
          element={
            <Suspense fallback="Loading...">
              <NewPlace />
            </Suspense>
          }
        />
        <Route
          path="/myplaces"
          element={
            <Suspense fallback="Loading...">
              <MyPlaces />
            </Suspense>
          }
        />
        <Route
          path="/auth"
          element={
            <Suspense fallback="Loading...">
              <Auth />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
