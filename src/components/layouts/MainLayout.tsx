import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { Toaster } from "sonner";
import AuthContextProvider from "@/contexts/AuthContextProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const MainLayout = () => {
  return (
    <>
      <AuthContextProvider>
        <ReactQueryProvider>
          <Navbar />
          <main className="min-h-screen">
            <Toaster />
            <Outlet />
          </main>
          <Footer />
        </ReactQueryProvider>
      </AuthContextProvider>
    </>
  );
};

export default MainLayout;
