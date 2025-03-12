import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

export function Select({ children, ...props }: SelectPrimitive.SelectProps) {
  return <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>;
}

export function SelectTrigger({ className, ...props }: SelectPrimitive.SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      className={`flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${className}`}
      {...props}
    >
      <SelectPrimitive.Value />
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="w-4 h-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectValue(props: SelectPrimitive.SelectValueProps) {
  return <SelectPrimitive.Value {...props} />;
}

export function SelectContent({ className, ...props }: SelectPrimitive.SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={`bg-white border border-gray-300 rounded-md shadow-md p-2 ${className}`}
        {...props}
      />
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({ className, children, ...props }: SelectPrimitive.SelectItemProps) {
  return (
    <SelectPrimitive.Item
      className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 rounded-md focus:bg-purple-200 ${className}`}
      {...props}
    >
      {children}
    </SelectPrimitive.Item>
  );
}
