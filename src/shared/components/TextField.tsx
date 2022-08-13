import { FC, InputHTMLAttributes, ReactNode } from "react";
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
  ...props
}) => (
  <div className={className}>
    <div
      className={classNames(
        "w-full relative border-2 text-white border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-blue-600 focus-within:border-blue-600",
        {
          "text-white border-gray-300": !error,
          "text-red-600 border-red-600": !!error,
        }
      )}
    >
      <label
        htmlFor={id}
        className="absolute -top-2 left-2 -mt-px inline-block px-1 text-xs font-semibold bg-slate-900"
      >
        {label}
      </label>
      <input
        id={id}
        className="block w-full border-0 p-0  bg-slate-900 text-white placeholder-gray-500 focus:ring-0 sm:text-sm"
        aria-invalid={!!error}
        aria-describedby={`${id}-error`}
        {...props}
      />
    </div>
    {!!error && (
      <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
        {error}
      </p>
    )}
  </div>
);

export default TextField;
