import CreatableSelect from "react-select/creatable";
import { fashionColors } from "@/constants/Proudct-constants";

interface IProps {
  value: {
    label: string;
    color: string;
    value: string;
  }[];
  onChangeHandler: () => void;
  disabled: boolean;
}
const ColorSelect = ({ value, onChangeHandler, disabled }: IProps) => {
  const formatOptionLabel = ({
    label,
    color,
  }: {
    label: string;
    color: string;
  }) => (
    <div className="flex items-center justify-between">
      <div>{label}</div>
      <span
        className="block w-5 h-5 gap-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );

  return (
    <>
      <CreatableSelect
        isDisabled={disabled}
        className="relative"
        closeMenuOnSelect={false}
        isMulti
        options={fashionColors}
        formatOptionLabel={formatOptionLabel}
        value={value} // Set the initial selected values
        onChange={onChangeHandler} // Handle value changes
      />
    </>
  );
};

export default ColorSelect;

/* eslint-disable @typescript-eslint/no-unused-vars */
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // import {
// //   AlertDialog,
// //   AlertDialogAction,
// //   AlertDialogCancel,
// //   AlertDialogContent,
// //   AlertDialogDescription,
// //   AlertDialogFooter,
// //   AlertDialogHeader,
// //   AlertDialogTitle,
// //   AlertDialogTrigger,
// // } from "@/components/ui/alert-dialog";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// const sizesSchema = z.object({
//   sizes: z.array(z.string()),
// });
// import { sizes } from "@/constants/Proudct-constants";

// const SizesSelect = ({ value, onChangeHandler }: any) => {
//   const form = useForm<z.infer<typeof sizesSchema>>({
//     resolver: zodResolver(sizesSchema),
//     defaultValues: {
//       sizes: [],
//     },
//   });

//   async function onSubmit(values: z.infer<typeof sizesSchema>) {
//     console.log(values);
//   }

//   return (
//     <Select onValueChange={onChangeHandler} defaultValue={value}>
//       <SelectTrigger className="w-full">
//         <SelectValue placeholder="Category" />
//       </SelectTrigger>
//       <SelectContent>
//         {sizes.map((c, i) => (
//           <SelectItem key={i} value={`${c.individualSizes}`}>
//             {c.range}
//           </SelectItem>
//         ))}
//         <Form {...form}>
//           <form className="space-y-8" onSubmit={() => onSubmit}>
//             <FormField
//               control={form.control}
//               name="sizes"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input placeholder="Enter A sizes" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </form>
//         </Form>
//       </SelectContent>
//     </Select>
//   );
// };

// export default SizesSelect;
