"use client";

import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

type DynamicIconProps = {
  name: string;
} & LucideProps;

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // Convert kebab-case or snake_case to PascalCase for Lucide
  const iconName = name
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;

  return <IconComponent {...props} />;
}
