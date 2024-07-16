// import path from "path";

// import { z } from "zod";

import { useQuery } from "react-query";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
// import { taskSchema } from "./data/schema";
// import { useEffect, useState } from "react";

import { useAuthContext } from "@/contexts/AuthContextProvider";
import { fetcher } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  title: "Wish-List",
  description: "A task and issue tracker build using Tanstack Table.",
};

export default function WishListTable() {
  const { authUser } = useAuthContext();

  const { data } = useQuery({
    queryKey: ["User-Wish-List", authUser?.id],
    queryFn: () => fetcher("/api/user/wish-list"),
    refetchOnWindowFocus: false,
  });

  console.log(data);

  if (!data) return <p>Loading ....</p>;

  return (
    <>
      <div className=" h-full flex-1 flex-col space-y-8 p-8 md:flex ">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">My Wishlist</h2>
            <p className="text-muted-foreground">
              There are {data?.length} products in this wishlist.
            </p>
          </div>
        </div>
        {data.length > 0 ? (
          <DataTable data={data} columns={columns} />
        ) : (
          <div className="flex flex-col w-full items-center  gap-y-8">
            <p className="font-semibold text-">
              Your Wish List Is Empty Discover Our Products Now{" "}
            </p>
            <Button asChild className="max-w-lg w-full">
              <Link to={"/products"}>Discover</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
