"use client"

import { useFormContext, Controller } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

/**
 * FormCheckbox - Checkbox component integrated with react-hook-form
 * 
 * @param {Object} props
 * @param {string} props.name - Field name (must match schema)
 * @param {string} props.label - Field label
 * @param {string} [props.description] - Optional description
 * @param {boolean} [props.disabled] - Whether the field is disabled
 * @param {string} [props.className] - Additional CSS classes for the wrapper
 */
export function FormCheckbox({
  name,
  label,
  description,
  disabled,
  className,
}) {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  const error = errors[name]?.message

  return (
    <div className={cn("space-y-2", className)}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex items-start space-x-3">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
            <div className="space-y-1 leading-none">
              <Label
                htmlFor={name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </Label>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
        )}
      />
      {error && (
        <p className="text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  )
}
