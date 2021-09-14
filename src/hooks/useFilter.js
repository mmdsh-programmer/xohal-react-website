import { useState, useEffect, useContext } from "react";
import { FilterContext } from "helpers/FilterContext";

export default function useFilter(products) {
  const { setFilter, filter } = useContext(FilterContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getSkuSize = (sku) => {
    return Number(sku.substr(5, 2));
  };

  const hasMaterial = (product, materials) => {
    return materials.some((material) => product.includes(material));
  };

  useEffect(() => {
    let filtered = [];
    if (typeof filter !== "undefined") {
      if (filter.materials.length > 0 && typeof filter.size !== "undefined") {
        filtered = products.filter((product) => {
          return (
            getSkuSize(product.sku) === filter.size &&
            hasMaterial(product.name, filter.materials)
          );
        });
      } else if (
        filter.materials.length > 0 &&
        typeof filter.size === "undefined"
      ) {
        filtered = products.filter((product) => {
          return hasMaterial(product.name, filter.materials);
        });
      } else if (
        filter.materials.length === 0 &&
        typeof filter.size !== "undefined"
      ) {
        filtered = products.filter((product) => {
          return getSkuSize(product.sku) === filter.size;
        });
      }
    }

    filtered.length > 0
      ? setFilteredProducts(filtered)
      : setFilteredProducts(products);
  }, [filter]);

  return [filter, setFilter, filteredProducts];
}
