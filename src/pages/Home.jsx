import clsx from "clsx";
import { ChevronLeft, ChevronRight, Heart, Menu, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = ({ products }) => {
    const [active, setActive] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    // Get unique categories
    const categories = [...new Set(products.map((p) => p.category))];

    // Filtered products
    const filteredProducts = products.filter((p) => {
        const matchesCategory = active === "All" || p.category === active;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });



    // State to track favorites (can be expanded to global state or backend)
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
        );
    };

    return (
        <div className="p-4">

            <h3 className="text-[12px] text-neutral-300 dark:text-neutral-500">Welcome!</h3>
            <h1 className="text-2xl md:text-3xl font-bold">
                Find Your Food
            </h1>

            {/* Search Bar */}
            <div
                className={clsx(
                    "transition-all focus-within:ring-2",
                    "ring-violet-800 bg-neutral-50 dark:bg-neutral-900",
                    "my-6 flex items-center p-2 rounded-full",
                    "border border-neutral-200 dark:border-neutral-800"
                )}
            >
                <Search className="mx-2" />
                <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    type="text"
                    placeholder="Search food..."
                    className="flex-1 outline-none bg-transparent placeholder:text-sm placeholder:text-black dark:placeholder:text-white"
                />
            </div>

            {/* Category Filter Buttons */}
            <>
                <div className={clsx("border rounded-full border-neutral-100 dark:border-neutral-800",
                    "flex overflow-x-auto hide-scrollbar")}>
                    {["All", ...categories].map((category, idx) => {
                        const isActive = active === category;

                        return (
                            <button
                                key={idx}
                                onClick={() => setActive(category)}
                                className={clsx(
                                    isActive
                                        ? "bg-violet-800 text-white"
                                        : "border border-neutral-200 dark:border-neutral-800 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900",
                                    "rounded-full whitespace-nowrap m-1 p-1 px-6 text-sm"
                                )}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>
                <div className="flex justify-center p-2 animate-pulse text-neutral-100 dark:text-neutral-800">
                    <ChevronLeft size={13} />
                    <ChevronRight size={13} />
                </div>
            </>

            {/* Products */}

            {filteredProducts.length === 0 ? <p className="min-h-screen mt-6 text-center text-neutral-400 dark:text-neutral-500">Product not found from search "<span className="text-current">{searchTerm.trim()}</span>"</p> : (
                <div className="mt-6 grid md:grid-cols-2 gap-3">
                    {filteredProducts.map((item, idx) => (
                        <div
                            key={idx}
                            className={clsx(
                                "p-3 rounded-3xl bg-white dark:bg-neutral-950",
                                "border border-neutral-200 dark:border-neutral-800",
                                "transition-all duration-300 hover:shadow-md shadow-neutral-50 dark:shadow-neutral-900",
                            )}
                        >
                            {/* Product Image */}
                            <div className="flex justify-between items-end mb-3">
                                <div className="relative">
                                    <button
                                        onClick={() => toggleFavorite(item.id)}
                                        className="absolute right-0 top-0 m-1 p-1.5 rounded-full bg-white dark:bg-neutral-900"
                                    >
                                        <Heart
                                            size={14}
                                            className={clsx(
                                                " transition-all duration-300",
                                                favorites.includes(item.id)
                                                    ? "fill-red-500 stroke-red-500"
                                                    : "fill-none stroke-red-500"
                                            )}
                                        />
                                    </button>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-48 h-36 object-cover rounded-xl mx-auto"
                                    />
                                </div>
                                <div
                                    className="ml-2"
                                >
                                    <button
                                        className={clsx("rounded-full m-1 p-1 w-full text-sm",
                                            "border border-neutral-200 dark:border-neutral-800 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
                                        )}
                                    >
                                        View
                                    </button>
                                    <Link to={`/product/${encodeURIComponent(item.name)}`}>
                                        <button
                                            className={clsx("transition-colors bg-violet-800 hover:bg-violet-900 text-white",
                                                "rounded-full m-1 p-1 w-full text-sm")}
                                        >
                                            Add to cart
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Product Title */}
                            < h2 className="font-semibold text-sm sm:text-base line-clamp-1" >{item.name}</h2>

                            {/* Product Category */}
                            <div className="mt-3 flex justify-between items-center">
                                <p className="text-sm">Cost: ${item.price.toFixed(2)}</p>
                                <p
                                    className="text-xs w-fit rounded-full p-1 px-6 border border-neutral-200 dark:border-neutral-800"
                                >
                                    {item.category}
                                </p>
                            </div>
                        </div>

                    ))}
                </div>

            )}
        </div>
    );
};

export default HomePage;
