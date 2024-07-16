import AuthContextProvider from "@/contexts/AuthContextProvider";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const AuthLayout = () => {
  return (
    <AuthContextProvider>
      <main className="relative h-screen grid lg:grid-cols-2 ">
        <div className="hidden lg:block relative bg-cover bg-center bg-no-repeat h-full bg-black rotate-45 -top-[55%] rounded-3xl" />
        <div className="flex  items-center justify-center">
          <Toaster position="top-center" />
          <Outlet />
        </div>
      </main>
    </AuthContextProvider>
  );
};

export default AuthLayout;
