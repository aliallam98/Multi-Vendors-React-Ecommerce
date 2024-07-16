import {
  Fullscreen,
  Users,
  ClipboardList,
  LayoutList,
  Store,
  ShoppingCart,
} from "lucide-react";

export const adminRoutes = [
  {
    label: "Categories",
    path: `/dashboard/admin/category`,
    icon: ClipboardList,
  },
  {
    label: "Sub Categories",
    path: `/dashboard/admin/sub-category`,
    icon: LayoutList,
  },
  {
    label: "Brands",
    path: `/dashboard/admin/brand`,
    icon: Fullscreen,
  },
  {
    label: "Products",
    path: `/dashboard/admin/products`,
    icon: Store,
  },
  {
    label: "Orders",
    path: `/dashboard/admin/orders`,
    icon: ShoppingCart,
  },
  {
    label: "Customers",
    path: `/dashboard/admin/customers`,
    icon: Users,
  },
];
