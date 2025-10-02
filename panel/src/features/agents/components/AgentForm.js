"use client"

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  FormInput,
  FormSelect,
  FormCheckbox,
  FormError,
} from '@/shared/components/forms';
import { createAgentSchema } from '@/shared/schemas';

/**
 * AgentForm - Form for creating/editing agents
 * Uses react-hook-form with Zod validation
 * 
 * @param {Object} props
 * @param {Object} [props.defaultValues] - Default form values for editing
 * @param {Function} props.onSubmit - Submit handler
 * @param {Function} props.onCancel - Cancel handler
 * @param {boolean} [props.isSubmitting] - Loading state
 */
export function AgentForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const form = useForm({
    resolver: zodResolver(createAgentSchema),
    mode: 'onChange', // Validate on every change
    defaultValues: defaultValues || {
      name: '',
      ip: '',
      port: 8080,
      capabilities: {
        http: false,
        https: false,
        tcp: false,
        udp: false,
        dns: false,
      },
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormError message={form.formState.errors.root?.message} />

        <FormInput
          name="name"
          label="Agent Name"
          placeholder="Enter agent name"
          required
          description="A unique name to identify this agent"
        />

        <FormInput
          name="ip"
          label="IP Address"
          placeholder="192.168.1.100"
          required
          description="The IP address of the agent server"
        />

        <FormInput
          name="port"
          label="Port"
          type="number"
          placeholder="8080"
          required
          description="Port number (1-65535)"
        />

        <div className="space-y-3">
          <label className="text-sm font-medium">Capabilities</label>
          <p className="text-sm text-muted-foreground">
            Select the protocols this agent can handle
          </p>
          <div className="grid grid-cols-2 gap-4">
            <FormCheckbox
              name="capabilities.http"
              label="HTTP"
              description="Handle HTTP traffic"
            />
            <FormCheckbox
              name="capabilities.https"
              label="HTTPS"
              description="Handle HTTPS traffic"
            />
            <FormCheckbox
              name="capabilities.tcp"
              label="TCP"
              description="Handle TCP connections"
            />
            <FormCheckbox
              name="capabilities.udp"
              label="UDP"
              description="Handle UDP packets"
            />
            <FormCheckbox
              name="capabilities.dns"
              label="DNS"
              description="Handle DNS queries"
            />
          </div>
        </div>

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
              'Update Agent'
            ) : (
              'Create Agent'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
