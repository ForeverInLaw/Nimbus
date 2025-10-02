"use client"

import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FormInput, FormSelect, FormError } from '@/shared/components/forms';
import { createRouteSchema, routeProtocols } from '@/shared/schemas';
import { useAgents } from '@/features/agents/hooks';

export function RouteForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const { data: agents = [] } = useAgents();
  
  const form = useForm({
    resolver: zodResolver(createRouteSchema),
    mode: 'onChange',
    defaultValues: defaultValues || {
      name: '',
      source: '',
      destination: '',
      protocol: 'http',
      agents: [],
      rules: [],
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  const protocolOptions = routeProtocols.map((protocol) => ({
    value: protocol,
    label: protocol.toUpperCase(),
  }));

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormError message={form.formState.errors.root?.message} />

        <FormInput
          name="name"
          label="Route Name"
          placeholder="Enter route name"
          required
          description="A unique name to identify this route"
        />

        <FormSelect
          name="protocol"
          label="Protocol"
          options={protocolOptions}
          required
        />

        <FormInput
          name="source"
          label="Source"
          placeholder="e.g., 0.0.0.0:8080 or :8080"
          required
          description="Source address and port"
        />

        <FormInput
          name="destination"
          label="Destination"
          placeholder="e.g., backend.example.com:8080"
          required
          description="Destination address and port"
        />

        <div className="space-y-3">
          <Label>
            Select Agents <span className="text-destructive">*</span>
          </Label>
          <p className="text-sm text-muted-foreground">
            Choose one or more agents to handle this route
          </p>
          <Controller
            name="agents"
            control={form.control}
            render={({ field }) => (
              <div className="space-y-2 rounded-md border p-4">
                {agents.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No agents available. Create an agent first.
                  </p>
                ) : (
                  agents.map((agent) => (
                    <div key={agent._id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`agent-${agent._id}`}
                        checked={field.value?.includes(agent._id)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(field.value || []), agent._id]
                            : field.value?.filter((id) => id !== agent._id);
                          field.onChange(newValue);
                        }}
                      />
                      <Label
                        htmlFor={`agent-${agent._id}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {agent.name} ({agent.ip}:{agent.port})
                      </Label>
                    </div>
                  ))
                )}
              </div>
            )}
          />
          {form.formState.errors.agents && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.agents.message}
            </p>
          )}
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
              'Update Route'
            ) : (
              'Create Route'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
