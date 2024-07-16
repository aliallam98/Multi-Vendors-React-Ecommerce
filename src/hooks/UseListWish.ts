import { create } from "zustand";

interface wishListStore {
  wishList: string[];
  setWishList: (v: string[]) => void;
}

const UseWishList = create<wishListStore>((set) => ({
  wishList: [],
  setWishList: (v) =>
    set(() => ({
      wishList: v  ,
    })),
}));

export default UseWishList;
