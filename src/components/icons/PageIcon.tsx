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
    <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z" />
  </svg>
);

export default BankIcon;
