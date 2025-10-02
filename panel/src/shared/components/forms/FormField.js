"use client"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

/**
 * FormField - Wrapper component for form fields
 * Provides consistent layout for label, input, and error message
 * 
 * @param {Object} props
 * @param {string} props.name - Field name
 * @param {string} props.label - Field label
 * @param {string} [props.description] - Optional field description
 * @param {string} [props.error] - Error message to display
 * @param {boolean} [props.required] - Whether the field is required
 * @param {React.ReactNode} props.children - Input component
 * @param {string} [props.className] - Additional CSS classes
 */
export function FormField({
  name,
  label,
  description,
  error,
  required,
  children,
  className
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={name} className="flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      
      {children}
      
      {error && (
        <p className="text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  )
}
