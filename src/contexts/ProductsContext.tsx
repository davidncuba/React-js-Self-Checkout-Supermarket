import * as React from "react";
import { IProducts, ProductContextType } from "../@types/products";
import { productsAPI } from "../api/products";

export const ProductContext = React.createContext<ProductContextType | null>(
  null
);
interface Props {
  children: React.ReactNode;
}

const ProductProvider: React.FC<Props> = ({ children }) => {
  const [products, setProducts] = React.useState<IProducts[]>(productsAPI);

  const saveProduct = (product: IProducts) => {
    const newProduct: IProducts = {
      id: Math.random(),
      name: product.name,
      price: product.price,
      ean: product.ean,
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: number) => {
    products.filter((product: IProducts) => {
      if (product.id === id) {
        setProducts([...products]);
      }
    });
  };
  return (
    <ProductContext.Provider value={{ products, saveProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductProvider;
