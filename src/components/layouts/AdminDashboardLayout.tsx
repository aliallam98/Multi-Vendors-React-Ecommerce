import AuthContextProvider from "@/contexts/AuthContextProvider";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
const AdminDashboardLayout = () => {
  return (
    <AuthContextProvider>
      <ReactQueryProvider>
        <Toaster position="top-center" />
        <section className="flex">
          <AdminSidebar />
          <main className="grow h-screen">
            <Outlet />
          </main>
        </section>
      </ReactQueryProvider>
    </AuthContextProvider>
  );
};

export default AdminDashboardLayout;
