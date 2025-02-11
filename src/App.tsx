import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./components/landing/LandingPage";
import TemplatesPage from "./components/templates/TemplatesPage";
import routes from "tempo-routes";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/builder" element={<Home />} />
          <Route path="/templates" element={<TemplatesPage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Analytics />
      </>
    </Suspense>
  );
}

export default App;
