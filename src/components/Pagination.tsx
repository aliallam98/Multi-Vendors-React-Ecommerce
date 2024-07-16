import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "./ui/button";
import { formUrlQuery } from "@/lib/utils";

interface IProps {
  page: string | number;
  totalPages: string | number;
}

const Pagination = ({ page, totalPages }: IProps) => {
  const navigate = useNavigate();
  const searchParams = useSearchParams();

  const onClickHandler = (value: string) => {
    const pageValue = value === "prev" ? Number(page) - 1 : Number(page) + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: pageValue.toString(),
    });
    navigate(newUrl);
  };
  return (
    <div className="flex justify-center items-center gap-x-10 mt-10">
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => onClickHandler("prev")}
        disabled={Number(page) <= 1}
      >
        Prev
      </Button>
      <p>{`${page}/${totalPages}`}</p>
      <Button
        variant={"outline"}
        size={"sm"}
        onClick={() => onClickHandler("next")}
        disabled={Number(page) >= Number(totalPages)}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
