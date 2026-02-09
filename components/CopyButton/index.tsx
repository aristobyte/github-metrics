import * as React from "react";
import { type IconPropsType, Icons } from "@aristobyte-ui/utils";

type CopyButtonProps = {
  label?: string;
  active?: boolean;
  icon: (props: IconPropsType) => React.JSX.Element;
  onClick: () => void;
  variant?: "icon" | "action";
};

export function CopyButton({
  label,
  active,
  icon: Icon,
  onClick,
  variant = "action",
}: CopyButtonProps) {
  const className = [
    "copy-button",
    variant === "icon" ? "copy-button--icon" : "",
    active ? "copy-button--active" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button type="button" className={className} onClick={onClick}>
      {active ? (
        <span className="copy-button__check">
          <Icons.Success size={variant === "icon" ? 16 : 14} />
        </span>
      ) : (
        <Icon size={variant === "icon" ? 16 : 14} />
      )}
      {label && <span className="copy-button__label">{label}</span>}
    </button>
  );
}
