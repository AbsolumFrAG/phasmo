import { Button, Image } from "@chakra-ui/react";

type EvidenceButtonProps<T> = {
  label: string;
  imgSrc: string;
  value: T;
  onClick: (label: T) => void;
  disabled?: boolean;
  isSelected: boolean;
  isEliminated: boolean;
};

export default function EvidenceButton<T>({
  label,
  imgSrc,
  onClick,
  disabled,
  value,
  isSelected,
  isEliminated,
}: EvidenceButtonProps<T>) {
  const handleClick = () => {
    onClick(value);
  };
  const buttonVariant = isEliminated
    ? "outline"
    : isSelected
    ? "solid"
    : !disabled
    ? "solid"
    : "outline";

  const buttonScheme = isEliminated ? "red" : isSelected ? "blue" : "gray";

  return (
    <Button
      onClick={handleClick}
      disabled={disabled || false}
      variant={buttonVariant}
      colorScheme={buttonScheme}
      sx={isEliminated ? { textDecoration: "line-strength" } : {}}
      leftIcon={
        <Image src={imgSrc} alt={label} sx={{ imageRendering: "pixelated" }} />
      }
    >
      {label}
    </Button>
  );
}
