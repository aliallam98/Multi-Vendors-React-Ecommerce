import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, X } from "lucide-react";
import queryString from "query-string";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query) return;

    const url = queryString.stringifyUrl(
      {
        url: "/search",
        query: { query: query },
      },
      { skipEmptyString: true }
    );

    navigate(url);
  };

  return (
    <form
      className="relative flex items-center w-full md:w-[400px] "
      onSubmit={onSubmitHandler}
    >
      {query && (
        <X
          className="absolute right-14 w-5 h-5 text-muted-foreground
            cursor-pointer hover:opacity-75"
          onClick={() => setQuery("")}
        />
      )}
      <Input
        className="border-r-none"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        className="border-l-none"
        size={"sm"}
        variant={"ghost"}
        type="submit"
      >
        <SearchIcon size={16} className="text-muted-foreground" />
      </Button>
    </form>
  );
};

export default SearchBar;
