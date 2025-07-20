import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Hamburger, Moon, Sun, SunMoon } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ setTheme, currentTheme }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const themes = [
        { title: "light", icon: Sun },
        { title: "dark", icon: Moon },
        { title: "system", icon: SunMoon },
    ];

    const current = themes.find((t) => t.title === currentTheme) || themes[0];

    useEffect(() => {

        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header
            className={clsx(
                "fixed w-full flex justify-between items-center p-4 border-b border-neutral-100 dark:border-neutral-900",
                "bg-white/80 backdrop-blur-sm dark:bg-neutral-950/80 text-neutral-800 dark:text-white z-50"
            )}
        >
            <Link to={"/"}>
                <h1 className="flex items-center gap-1 text-xl font-bold relative before:content-[''] before:absolute before:-left-6 before:top-1/2 before:w-4 before:h-0.5 before:bg-violet-800 after:content-[''] after:absolute after:-right-6 after:top-1/2 after:w-4 after:h-0.5 after:bg-violet-800">
                    <Hamburger size={20} />FastFoodie
                </h1>
            </Link>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={clsx(
                        "capitalize flex items-center gap-2 rounded px-2 pr-4 py-1",
                        "border border-neutral-200 dark:border-neutral-800 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    )}
                >
                    <current.icon size={18} />
                    {current.title}
                </button>

                <ul
                    className={clsx(
                        dropdownOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
                        "transform origin-top transition-all duration-200 ease-out",
                        "absolute z-50 right-0 mt-2 w-32 grid gap-2 border border-neutral-200 dark:border-neutral-800 p-1 rounded bg-white dark:bg-neutral-950"
                    )}
                >
                    {themes.map(({ title, icon: Icon }, idx) => (
                        <li key={idx}>
                            <button
                                onClick={() => {
                                    setTheme(title);
                                    setDropdownOpen(false);
                                }}
                                className={clsx(
                                    "capitalize flex items-center gap-2 w-full px-2 py-1 rounded",
                                    "border border-neutral-200 dark:border-neutral-800 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900",
                                    currentTheme === title &&
                                    "text-violet-600 dark:text-violet-400 font-semibold"
                                )}
                            >
                                <Icon size={18} />
                                {title}
                            </button>
                        </li>
                    ))}
                </ul>

            </div>
        </header>
    );
};

export default Header;
