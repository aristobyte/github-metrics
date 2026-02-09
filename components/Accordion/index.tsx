"use client";

import { Icons } from "@aristobyte-ui/utils";
import type { ReactNode } from "react";

type IconName = keyof typeof Icons;

type AccordionProps = {
  id: string;
  title: string;
  description?: string;
  iconName?: IconName;
  iconColor?: string;
  open?: boolean;
  onToggle?: (id: string) => void;
  children: ReactNode;
};

export function Accordion({
  id,
  title,
  description,
  iconName,
  iconColor,
  open,
  onToggle,
  children,
}: AccordionProps) {
  const Icon = iconName ? Icons[iconName] : null;
  return (
    <section
      className={`accordion ${open ? "accordion--open" : "accordion--closed"}`}
    >
      <button
        type="button"
        className="accordion__head"
        onClick={() => onToggle?.(id)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
      >
        <div className="accordion__title">
          {Icon ? (
            <span className="accordion__icon" style={{ color: iconColor }}>
              <Icon size={22} color={iconColor} />
            </span>
          ) : null}
          <h3 className="accordion__text">{title}</h3>
        </div>
        <span className="accordion__chevron">
          <Icons.ArrowRight size={16} />
        </span>
      </button>
      <div id={`${id}-panel`} className="accordion__panel" aria-hidden={!open}>
        <div className="accordion__body">
          {description ? (
            <p className="accordion__desc">{description}</p>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
