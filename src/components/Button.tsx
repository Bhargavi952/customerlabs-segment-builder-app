import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary";
}

const getStyles = (variant: "primary" | "secondary" | "tertiary") => {
  switch (variant) {
    case "primary":
      return "bg-[#44b596] hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition-colors";
    case "secondary":
      return "text-gray-200 border border-gray-300 font-semibold py-2 px-4 rounded transition-colors";
    case "tertiary":
      return "text-red-500 hover:text-red-700 py-2 px-4 bg-white transition-colors";
    default:
      return "bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition-colors";
  }
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const styles = getStyles(variant);
  return (
    <button className={`${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};
export default Button;
