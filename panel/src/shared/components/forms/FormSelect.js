"use client"

import { useFormContext, Controller } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormField } from "./FormField"

/**
 * FormSelect - Select component integrated with react-hook-form
 * 
 * @param {Object} props
 * @param {string} props.name - Field name (must match schema)
 * @param {string} props.label - Field label
 * @param {string} [props.description] - Optional description
 * @param {string} [props.placeholder] - Placeholder text
 * @param {Array<{value: string, label: string}>} props.options - Select options
 * @param {boolean} [props.required] - Whether the field is required
 * @param {boolean} [props.disabled] - Whether the field is disabled
 * @param {string} [props.className] - Additional CSS classes for the wrapper
 */
export function FormSelect({
  name,
  label,
  description,
  placeholder = "Select an option",
  options = [],
  required,
  disabled,
  className,
}) {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  const error = errors[name]?.message

  return (
    <FormField
      name={name}
      label={label}
      description={description}
      error={error}
      required={required}
      className={className}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={disabled}
          >
            <SelectTrigger id={name}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </FormField>
  )
}
