export interface IProducts {
  id: number;
  ean: number;
  name: string;
  price: number;
  qtd_promotion?: number;
  price_promotion?: number;
}
export interface IProductsSell extends IProducts {
  qtd: number;
  price_total: number;
  discount: number;
}
export type ProductContextType = {
  products: IProducts[];
  saveProduct: (todo: IProducts) => void;
  updateProduct: (id: number) => void;
};
