import App from "@/App";
import AuthLayout from "@/components/layouts/AuthLayout";
import MainLayout from "@/components/layouts/MainLayout";
import SignUpPage from "@/pages/auth/SignUp";
import { createBrowserRouter } from "react-router-dom";
import SignInPage from "@/pages/auth/SignIn";
import AdminDashboardLayout from "@/components/layouts/AdminDashboardLayout";
import DashboardBrandPage from "@/components/dashboard/admin/main-sections/brand/brand-table/page";
import CreateCategoryPage from "@/components/dashboard/admin/main-sections/category/CreateCategoryPage";
import UpdateCategoryPage from "@/components/dashboard/admin/main-sections/category/UpdateCategoryPage";
import ForgetPasswordPage from "@/pages/auth/ForgetPassword";
import CreateBrandPage from "@/components/dashboard/admin/main-sections/brand/CreateBrandPage";
import UpdateBrandPage from "@/components/dashboard/admin/main-sections/brand/UpdateBrandPage";
import CreateSubCategoryPage from "@/components/dashboard/admin/main-sections/sub-category/CreateSubCategoryPage";
import UpdateSubCategoryPage from "@/components/dashboard/admin/main-sections/sub-category/UpdateSubCategoryPage";
import CreateProductPage from "@/components/dashboard/admin/main-sections/product/CreateProductPage";
import UpdateProductPage from "@/components/dashboard/admin/main-sections/product/UpdateProductPage";
import WishListPage from "@/components/wish-list/list-wish-table/page";
import SearchPage from "@/pages/search/SearchPage";
import AdminProductsPage from "@/components/dashboard/admin/main-sections/product/products-table/page";
import MainCategoryPage from "@/pages/category/MainCategoryPage";
import MainBrandPage from "@/pages/brand/MainBrandPage";
import AdminCategoryPage from "@/components/dashboard/admin/main-sections/category/category-table/page";
import AdminSubCategoryPage from "@/components/dashboard/admin/main-sections/sub-category/sub-category-table/page";
import MainProductsPage from "@/pages/products/MainProductsPage";
import MainUserProfilePage from "@/pages/profile/MainUserProfilePage";
import CheckOutPage from "@/pages/check-out/CheckOutPage";
import ProductPage from "@/components/product/ProductPage";
import CategoryPage from "@/pages/category/CategoryPage";
import BrandPage from "@/pages/brand/BrandPage";
import CheckOutOneProduct from "@/pages/check-out/CheckOutOneProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/profile",
        element: <MainUserProfilePage />,
      },
      {
        path: "/category",
        element: <MainCategoryPage />,
      },
      {
        path: "/category/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "/brands",
        element: <MainBrandPage />,
      },
      {
        path: "/brands/:brandName",
        element: <BrandPage />,
      },
      {
        path: "/products",
        element: <MainProductsPage />,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
      },
      {
        path: "/wish-list",
        element: <WishListPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/check-out",
        element: <CheckOutPage />,
      },
      {
        path: "/check-out/:productId",
        element: <CheckOutOneProduct />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/log-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/forget-password",
        element: <ForgetPasswordPage />,
      },
    ],
  },
  //Start Dashboard
  {
    path: "/dashboard/admin/",
    element: <AdminDashboardLayout />,
    children: [
      {
        path: "/dashboard/admin/category",
        element: <AdminCategoryPage />,
      },
      {
        path: "/dashboard/admin/category/create",
        element: <CreateCategoryPage />,
      },
      {
        path: "/dashboard/admin/category/:id/update",
        element: <UpdateCategoryPage />,
      },
      {
        path: "/dashboard/admin/sub-category",
        element: <AdminSubCategoryPage />,
      },
      {
        path: "/dashboard/admin/sub-category/create",
        element: <CreateSubCategoryPage />,
      },
      {
        path: "/dashboard/admin/sub-category/:id/update",
        element: <UpdateSubCategoryPage />,
      },
      {
        path: "/dashboard/admin/brand",
        element: <DashboardBrandPage />,
      },
      {
        path: "/dashboard/admin/brand/create",
        element: <CreateBrandPage />,
      },
      {
        path: "/dashboard/admin/brand/:id/update",
        element: <UpdateBrandPage />,
      },
      {
        path: "/dashboard/admin/products",
        element: <AdminProductsPage />,
      },
      {
        path: "/dashboard/admin/products/create",
        element: <CreateProductPage />,
      },
      {
        path: "/dashboard/admin/product/:id/update",
        element: <UpdateProductPage />,
      },
    ],
  },
]);

export default router;
