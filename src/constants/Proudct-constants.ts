export interface ISizes {
  label: string;
  value: string | number | (string | number)[];
}

export const sizes: readonly ISizes[] = [
  { label: "30-35", value: `${[30, 31, 32, 33, 34, 35]}` },
  { label: "36-40", value: `${[36, 37, 38, 39, 40]}` },
  { label: "40-45", value: `${[40, 41, 42, 43, 44, 45]}` },
  { label: "Small-Medium-Large", value: `${["Small", "Medium", "Large"]}` },
  { label: "Small", value: `${["Small"]}` },
  { label: "Medium", value: `${["Medium"]}` },
  { label: "Large", value: `${["Large"]}` },
  { label: "X-Large", value: `${["X-Large"]}` },
  { label: "Kilo", value: `${["Kilo"]}` },
];

export interface colourOption {
  value: string;
  label: string;
  color: string;
}

export const fashionColors: readonly colourOption[] = [
  { value: "Black", label: "Black", color: "#000000" },
  { value: "White", label: "White", color: "#FFFFFF" },
  { value: "Gray", label: "Gray", color: "#808080" },
  { value: "Navy", label: "Navy", color: "#000080" },
  { value: "Beige", label: "Beige", color: "#F5F5DC" },
  { value: "Camel", label: "Camel", color: "#C19A6B" },
  { value: "Red", label: "Red", color: "#FF0000" },
  { value: "Royal Blue", label: "Royal Blue", color: "#4169E1" },
  { value: "Emerald Green", label: "Emerald Green", color: "#006B75" },
  { value: "Mustard Yellow", label: "Mustard Yellow", color: "#FFCC00" },
  { value: "Fuchsia", label: "Fuchsia", color: "#FF00FF" },
  { value: "Hot Pink", label: "Hot Pink", color: "#FF69B4" },
  { value: "Mint Green", label: "Mint Green", color: "#98FB98" },
  { value: "Lavender", label: "Lavender", color: "#E6E6FA" },
  { value: "Coral", label: "Coral", color: "#FF7F50" },
  {
    value: "Tangerine",
    label: "Tangerine",
    color: "#F28080",
  },
  { value: "Plum", label: "Plum", color: "#83347B" },
  { value: "Aqua", label: "Aqua", color: "#00FFFF" },
];
