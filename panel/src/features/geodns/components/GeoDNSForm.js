"use client"

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { FormInput, FormSelect, FormCheckbox, FormError } from '@/shared/components/forms';
import { createGeoDnsSchema, dnsRecordTypes } from '@/shared/schemas';

export function GeoDNSForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const form = useForm({
    resolver: zodResolver(createGeoDnsSchema),
    mode: 'onChange',
    defaultValues: defaultValues || {
      domain: '',
      recordType: 'A',
      target: '',
      location: {
        country: '',
        region: '',
        city: '',
      },
      anycast: false,
      routes: [],
      agents: [],
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  const recordTypeOptions = dnsRecordTypes.map((type) => ({
    value: type,
    label: type,
  }));

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormError message={form.formState.errors.root?.message} />

        <FormInput
          name="domain"
          label="Domain"
          placeholder="example.com"
          required
          description="Fully qualified domain name"
        />

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            name="recordType"
            label="Record Type"
            options={recordTypeOptions}
            required
          />

          <FormInput
            name="target"
            label="Target"
            placeholder="192.0.2.1 or target.example.com"
            required
            description="IP address or hostname"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Location</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <FormInput
              name="location.country"
              label="Country Code"
              placeholder="US"
              required
              description="2-letter code"
            />

            <FormInput
              name="location.region"
              label="Region"
              placeholder="California"
              required
            />

            <FormInput
              name="location.city"
              label="City"
              placeholder="San Francisco"
              required
            />
          </div>
        </div>

        <FormCheckbox
          name="anycast"
          label="Enable Anycast"
          description="Route to nearest server automatically"
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
              'Update Record'
            ) : (
              'Create Record'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
