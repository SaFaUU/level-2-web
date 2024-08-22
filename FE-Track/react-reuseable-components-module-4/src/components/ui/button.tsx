import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";
import cn from "../../utils/cn";

type TRef = HTMLButtonElement;

type TVariant = "outline" | "ghost" | "solid";

type TButton = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: TVariant;
  className?: string;
  children: ReactNode;
};

const Button = forwardRef<TRef, TButton>(
  ({ variant = "solid", className, children, ...rest }, ref) => {
    const getVariant = (variant: TVariant) => {
      switch (variant) {
        case "outline":
          return "btn-outline";
        case "ghost":
          return "btn-ghost";
        default:
          return "btn-solid";
      }
    };
    return (
      <button
        className={cn("btn", getVariant(variant), className)}
        {...rest}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
