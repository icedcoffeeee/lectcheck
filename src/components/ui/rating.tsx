import { Rating, RatingProps } from "@mui/material";
import { Star } from "@mui/icons-material";

const sizes: ["small" | "medium" | "large", string][] = [
  ["small", "text-sm"],
  ["medium", ""],
  ["large", "text-xl"],
];

interface CustomRatingProps {
  label: string;
  value: number;
  sizeInd?: number;
  editable?: boolean;
  className?: string;
}
export function CustomRating({
  label,
  value,
  sizeInd,
  editable,
  className,
  ...props
}: CustomRatingProps & RatingProps) {
  let [ratingSize, textSize] = sizes[sizeInd ?? 1];
  return (
    <div className={"grid grid-cols-2 w-full " + className ?? ""}>
      <p className={"col-span-2 " + textSize}>{label}</p>
      <Rating
        readOnly={!editable ?? true}
        value={value}
        sx={{ stroke: "white" }}
        size={ratingSize}
        emptyIcon={<Star sx={{ stroke: "white" }} fontSize="inherit" />}
        {...props}
      />
      <p>{Math.round(value * 100) / 100} / 5</p>
    </div>
  );
}

export function CustomRatingSingle({
  label: name,
  value,
  sizeInd: size,
}: CustomRatingProps) {
  let [ratingSize, textSize] = sizes[size ?? 1];
  return (
    <div className="flex justify-between w-full">
      <p className={textSize}>{name}</p>
      <div className="flex items-center gap-2">
        <Star sx={{ stroke: "white", fill: "orange" }} fontSize={ratingSize} />
        <p>{value} / 5</p>
      </div>
    </div>
  );
}
