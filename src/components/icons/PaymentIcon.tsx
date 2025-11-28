import type { FC } from "react";
import type { IconProps } from "./IconProps";

const BankIcon: FC<IconProps> = ({
  color = "var(--color-primary)",
  size = "16px",
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    fill={color}
    viewBox="0 0 16 16"
  >
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1" />
  </svg>
);

export default BankIcon;
