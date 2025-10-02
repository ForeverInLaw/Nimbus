"use client"

import { useFormContext } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { FormField } from "./FormField"

/**
 * FormTextarea - Textarea component integrated with react-hook-form
 * 
 * @param {Object} props
 * @param {string} props.name - Field name (must match schema)
 * @param {string} props.label - Field label
 * @param {string} [props.description] - Optional description
 * @param {string} [props.placeholder] - Placeholder text
 * @param {number} [props.rows] - Number of rows
 * @param {boolean} [props.required] - Whether the field is required
 * @param {boolean} [props.disabled] - Whether the field is disabled
 * @param {string} [props.className] - Additional CSS classes for the wrapper
 */
export function FormTextarea({
  name,
  label,
  description,
  placeholder,
  rows = 4,
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
      <Textarea
        id={name}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        {...register(name)}
        {...props}
      />
    </FormField>
  )
}
