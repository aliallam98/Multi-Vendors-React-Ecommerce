import { cn, fetcher } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { ICategory } from "@/typings";

export function NavMenu() {
  const { data: categories } = useQuery({
    queryKey: "All-Categories",
    queryFn: () => fetcher("/api/category/all"),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
  const { data: brands } = useQuery({
    queryKey: "All-Brands",
    queryFn: () => fetcher("/api/brand/all"),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  if (!categories) {
    return <p>Loading</p>;
  }

  if (!brands) {
    return <p>Loading</p>;
  }

  return (
    <NavigationMenu className="mt-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent className="p-10 h-[400px]">
            <ul className="flex flex-col md:flex-row h-full">
              {/* Main Link */}
              <li className="flex flex-col justify-center h-full min-w-[300px]">
                <NavigationMenuLink asChild>
                  <Link
                    to={"/"}
                    className="flex flex-col items-center justify-center gap-2"
                  >
                    <img
                      src="/images/cart.png"
                      alt="Logo"
                      width={250}
                      className="shrink-0 mr-10 md:mr-0"
                    />
                    <h3 className="hidden  md:block text-xl font-semibold mt-4">
                      City Mart
                    </h3>
                  </Link>
                </NavigationMenuLink>
              </li>
              {/* The Rest Links */}
              <ul className="flex flex-col flex-wrap flex-1">
                {categories.map((item: ICategory, i: number) => (
                  <li key={i}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={`/category/${item.name}`}
                        className={cn(
                          "flex gap-4 mr-10  items-center select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                      >
                        <img
                          src={item.image.secure_url}
                          alt="image"
                          className="w-10 h-10 object-contain object-center"
                        />
                        <div className="text-sm font-medium leading-none">
                          {item.name}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Brands</NavigationMenuTrigger>
          <NavigationMenuContent className="p-10 h-[400px]">
            <ul className="flex flex-col md:flex-row h-full">
              {/* The Rest Links */}
              <ul className="flex flex-col flex-wrap grow ">
                {brands.map((item: ICategory, i: number) => (
                  <li key={i}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={`/brands/${item.name}`}
                        className={cn(
                          "flex gap-4 mr-10  items-center select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                      >
                        <img
                          src={item.image.secure_url}
                          alt="image"
                          className="w-10 h-10 object-contain object-center"
                        />
                        <div className="text-sm font-medium leading-none">
                          {item.name}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
              {/* Main Link */}
              <li className="flex flex-col justify-center h-full min-w-[300px]">
                <NavigationMenuLink asChild>
                  <Link
                    to={"/"}
                    className="flex flex-col items-center justify-center gap-2"
                  >
                    <img
                      src="/images/brands.jpg"
                      alt="Logo"
                      width={400}
                      className="shrink-0 mr-10 md:mr-0 h-full"
                    />
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/products">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Products
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
