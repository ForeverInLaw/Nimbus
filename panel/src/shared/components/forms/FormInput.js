"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { FormField } from "./FormField"

/**
 * FormInput - Input component integrated with react-hook-form
 * 
 * @param {Object} props
 * @param {string} props.name - Field name (must match schema)
 * @param {string} props.label - Field label
 * @param {string} [props.description] - Optional description
 * @param {string} [props.type] - Input type (text, email, password, etc.)
 * @param {string} [props.placeholder] - Placeholder text
 * @param {boolean} [props.required] - Whether the field is required
 * @param {boolean} [props.disabled] - Whether the field is disabled
 * @param {string} [props.className] - Additional CSS classes for the wrapper
 */
export function FormInput({
  name,
  label,
  description,
  type = "text",
  placeholder,
  required,
  disabled,
  className,
  ...props
}) {
  const {
    register,
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
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name)}
        {...props}
      />
    </FormField>
  )
}
