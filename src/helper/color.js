const colors= [
  {value:"berry_red",code: "#b8256f",label:"Berry Red"},
  {value:"light_blue",code: "#96c3eb",label:"Light Blue"},
  {value:"red",code: "#db4035",label:"Red"},
  {value:"blue",code: "#4073ff",label:"Blue"},
  {value:"orange",code: "#ff9933",label:"Orange"},
  {value:"grape",code: "#884dff",label:"Grape"},
  {value:"yellow",code: "#fad000",label:"Yellow"},
  {value:"violet",code: "#af38eb",label:"Violet"},
  {value:"olive_green",code: "#afb83b",label:"Olive Green"},
  {value:"lavender",code: "#eb96eb",label:"Lavender"},
  {value:"lime_green",code: "#7ecc49",label:"Lime Green"},
  {value:"magenta",code: "#e05194",label:"Magenta"},
  {value:"green",code: "#299438",label:"Green"},
  {value:"salmon",code: "#ff8d85",label:"Salmon"},
  {value:"mint_green",code: "#6accbc",label:"Mint Green"},
  {value:"charcoal",code: "#808080",label:"Charcoal"},
  {value:"teal",code: "#158fad",label:"Teal"},
  {value:"grey",code: "#b8b8b8",label:"Grey"},
  {value:"sky_blue",code: "#14aaf5",label:"Sky Blue"},
  {value:"taupe",code: "#ccac93",label:"Taupe"},
];

export const getColorCode = (value) => {
  const color = colors.find((color) => color.value === value);
  return color ? color.code : null;
};

export default colors;