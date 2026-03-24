import { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({ children, variant = "primary" }: ButtonProps) {
  const variantClass = variant === "primary" ? styles.primary : styles.secondary;

  return <button className={`${styles.button} ${variantClass}`}>{children}</button>;
}
