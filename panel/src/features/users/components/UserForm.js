"use client"

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { FormInput, FormSelect, FormError } from '@/shared/components/forms';
import { createUserSchema, updateUserSchema, userRoles } from '@/shared/schemas';

export function UserForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const isEditing = !!defaultValues;
  
  const form = useForm({
    resolver: zodResolver(isEditing ? updateUserSchema : createUserSchema),
    mode: 'onChange',
    defaultValues: defaultValues || {
      username: '',
      password: '',
      role: 'user',
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    // Remove password if editing and it's empty
    if (isEditing && !data.password) {
      const { password, ...rest } = data;
      onSubmit(rest);
    } else {
      onSubmit(data);
    }
  });

  const roleOptions = userRoles.map((role) => ({
    value: role,
    label: role.charAt(0).toUpperCase() + role.slice(1),
  }));

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormError message={form.formState.errors.root?.message} />

        <FormInput
          name="username"
          label="Username"
          placeholder="Enter username"
          required
          description="3-50 characters, letters, numbers, hyphens, underscores"
        />

        <FormInput
          name="password"
          label={isEditing ? "New Password (leave empty to keep current)" : "Password"}
          type="password"
          placeholder="Enter password"
          required={!isEditing}
          description="Min 8 characters, must include uppercase, lowercase, and number"
        />

        <FormSelect
          name="role"
          label="Role"
          options={roleOptions}
          required
          description="Admin users have full access to all features"
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : defaultValues ? (
              'Update User'
            ) : (
              'Create User'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
