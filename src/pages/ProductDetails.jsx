import clsx from 'clsx';
import { Github, Heart } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products }) => {
    const { name } = useParams();
    const decodedName = decodeURIComponent(name);

    const product = products.find((p) => p.name === decodedName)

    return (
        <div className="pt-6 min-h-screen">
            <div className='p-3 rounded-xl border border-neutral-200 dark:border-neutral-800'>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-cover rounded-xl mx-auto"
                />
            </div>

            <div className='mt-6 flex items-center justify-between'>
                <button
                    className={clsx("rounded-full m-1 p-2 text-sm",
                        "border border-neutral-200 dark:border-neutral-800 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    )}
                >
                    <Heart size={18} className='fill-red-500 stroke-red-500' />
                </button>

                <div
                    className="flex justify-end"
                >
                    <button
                        onClick={() => window.document.location.href === "https://github.com/ibhimwhar"}
                        className={clsx("rounded-full m-1 p-2 text-sm",
                            "border border-neutral-200 dark:border-neutral-800 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        )}
                    >
                        <Github size={18} />
                    </button>
                    <button
                        className={clsx("transition-colors bg-violet-800 hover:bg-violet-900 text-white",
                            "rounded-full m-1 p-1 px-6 text-sm")}
                    >
                        Add to cart
                    </button>
                </div>
            </div>

            {/* Product Title */}
            <h1 className="font-semibold text-3xl mt-6" >{product.name}</h1>

            {/* Product Category */}
            <div className="mt-3 flex justify-between items-center">
                <p className="text-xl">Price: ${product.price}</p>
                <p
                    className="text-sm w-fit rounded-full p-1 px-6 border border-neutral-200 dark:border-neutral-800"
                >
                    {product.category}
                </p>
            </div>
        </div>
    );
};

export default ProductDetails;