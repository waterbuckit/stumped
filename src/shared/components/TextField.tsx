import { FC, InputHTMLAttributes, ReactNode, useEffect, useRef } from "react";
import classNames from "classnames";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  id: string;
  error?: string;
};

const TextField: FC<TextFieldProps> = ({
  label,
  id,
  className,
  error,
  autoFocus,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus, inputRef.current]);

  return (
    <div className={className}>
      <div
        className={classNames(
          "w-full relative border text-white border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-amber-600 focus-within:border-amber-600",
          {
            "text-white border-gray-300": !error,
            "text-red-600 border-red-600": !!error,
          }
        )}
      >
        <label
          htmlFor={id}
          className="absolute -top-2 left-2 -mt-px inline-block px-1 text-xs font-semibold bg-black"
        >
          {label}
        </label>
        <input
          id={id}
          className="block w-full border-0 p-0 bg-transparent text-white placeholder-slate-500 focus:ring-0 sm:text-sm"
          aria-invalid={!!error}
          aria-describedby={`${id}-error`}
          ref={inputRef}
          {...props}
        />
      </div>
      <p
        className={classNames("mt-2 text-sm text-red-600", {
          hidden: !error,
          block: !!error,
        })}
        id={`${id}-error`}
      >
        {error}
      </p>
    </div>
  );
};

export default TextField;
