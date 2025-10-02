"use client"

import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * FormError - Displays a general form error message
 * Used for displaying API errors or form-level validation errors
 * 
 * @param {Object} props
 * @param {string} [props.message] - Error message to display
 * @param {string} [props.className] - Additional CSS classes
 */
export function FormError({ message, className }) {
  if (!message) return null

  return (
    <div
      className={cn(
        "flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive",
        className
      )}
    >
      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
      <p>{message}</p>
    </div>
  )
}
