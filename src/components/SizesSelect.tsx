/* eslint-disable @typescript-eslint/no-explicit-any */
import CreatableSelect from "react-select/creatable";
import {  sizes } from "@/constants/Proudct-constants";

interface IProps {
  value: any;
  onChangeHandler: () => void;
  disabled: boolean;
}
const SizesSelect = ({ value, onChangeHandler, disabled }: IProps) => {
  return (
    <>
      <CreatableSelect
        isDisabled={disabled}
        className="relative"
        closeMenuOnSelect={false}
        isMulti
        options={sizes}
        value={value}
        onChange={onChangeHandler}
        hideSelectedOptions={true}
      />
    </>
  );
};

export default SizesSelect;
