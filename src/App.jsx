import { useEffect, useState } from "react";
import RouteComponents from "./Routes";
import Header from "./components/Header";
import { Hamburger } from "lucide-react";
import { Link } from "react-router-dom";

const App = () => {
  // Mode can be "light", "dark", or "system"
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = () => {
      let useDark;

      if (mode === "system") {
        useDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      } else {
        useDark = mode === "dark";
      }

      if (useDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme();
    localStorage.setItem("theme", mode);

    // Watch for system change only in system mode
    if (mode === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme();
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, [mode]);

  return (
    <div className="transition-colors bg-white dark:bg-neutral-950 text-neutral-800 dark:text-white">
      <Header
        setTheme={setMode}
        currentTheme={mode}
      />

      <main className="pt-24 p-3 max-w-3xl mx-auto">
        <RouteComponents />
      </main>

      <footer className="max-w-3xl mx-auto border-t border-neutral-200 dark:border-neutral-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <Link to={"/"}>
              <h1 className="flex items-center gap-1 text-xl font-bold relative before:content-[''] before:absolute before:-left-3 before:top-1/2 before:w-2 before:h-0.5 before:bg-violet-800 after:content-[''] after:absolute after:-right-6 after:top-1/2 after:w-4 after:h-0.5 after:bg-violet-800">
                <Hamburger size={20} />FastFoodie
              </h1>
            </Link>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Contact</a>
            </div>
          </div>
          <p className="text-xs mt-6 text-center text-neutral-400 dark:text-neutral-500">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default App;