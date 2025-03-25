import React, { useState, useEffect } from "react";

type Product = {
  name: string;
  desc?: string;
};

const ProductsList = ({ products }: { products: Product[] }) => {
  const [visibleCount, setVisibleCount] = useState(0); // Number of visible products
  const [itemsPerRow, setItemsPerRow] = useState(0); // Products per row

  // Calculate items per row based on container width
  useEffect(() => {
    const calculateItemsPerRow = () => {
      const containerWidth =
        document.getElementById("products-grid")?.offsetWidth || 0;
      const itemWidth = 200; // Assume each item takes 200px (including margin)
      setItemsPerRow(Math.floor(containerWidth / itemWidth) || 1); // Ensure at least 1 item per row
    };

    calculateItemsPerRow(); // Initial calculation
    window.addEventListener("resize", calculateItemsPerRow); // Recalculate on window resize

    return () => {
      window.removeEventListener("resize", calculateItemsPerRow);
    };
  }, []);

  // Set initial visible products based on items per row
  useEffect(() => {
    setVisibleCount(itemsPerRow);
  }, [itemsPerRow]);

  // Handler to load more products
  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + itemsPerRow); // Load a full row of products
  };

  return (
    <div>
      <div id="products-grid" className="grid grid-cols-auto-fit gap-4">
        {products.slice(0, visibleCount).map((item: Product, index: number) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-md bg-white"
            style={{ minWidth: "200px" }} // Adjust width if necessary
          >
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">
              {(item.desc?.length || 0) > 25
                ? `${item.desc?.slice(0, 25) || ""}...`
                : item.desc || ""}
            </p>
          </div>
        ))}
      </div>
      {/* View More Button */}
      {visibleCount < products.length && (
        <div className="text-center mt-4">
          <button
            onClick={handleViewMore}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
