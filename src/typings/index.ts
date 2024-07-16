import { StringifyOptions } from "querystring";

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export interface IImage {
  secure_url: string;
  public_id: string;
}

export interface IUser {
  fullName: string;
  address: string;
  age: string;
  email: string;
  profileImage: IImage;
  phone: string;
}
export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: IImage;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISubCategory {
  _id: string;
  name: string;
  slug: string;
  image: IImage;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  image: IImage;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  original: any;
  _id: string;
  name: string;
  slug: string;
  description: string;
  stock: number;
  price: number;
  discount: number;
  discountByPercent: number;
  discountByAmount: number;
  paymentPrice: string;
  colors: string[];
  sizes: string[];
  image: IImage;
  images: IImage[];
  categoryId: { name: string };
  subCategoryId: { name: string };
  brandId: { name: string };
  avgRate: number;
  ratesNumbers: number;
  soldItems: number;
  createdBy: string;
  wishList: string[];
  quantity: string;
  size: string;
}

export interface ICartItem {
  productId: ICartItem;
  _id: string;
  name: string;
  image: IImage;
  images: IImage[];
  paymentPrice: string;
  quantity: StringifyOptions;
  size: string;
}
