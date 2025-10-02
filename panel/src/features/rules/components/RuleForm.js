"use client"

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { FormInput, FormSelect, FormError, FormTextarea } from '@/shared/components/forms';
import { createRuleSchema, ruleTypes, ruleActions } from '@/shared/schemas';
import { useAgents } from '@/features/agents/hooks';

export function RuleForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const { data: agents = [] } = useAgents();
  
  const form = useForm({
    resolver: zodResolver(createRuleSchema),
    mode: 'onChange',
    defaultValues: defaultValues || {
      name: '',
      type: 'http',
      match: '',
      action: 'proxy',
      target: '',
      agent: '',
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  const typeOptions = ruleTypes.map((type) => ({
    value: type,
    label: type.toUpperCase(),
  }));

  const actionOptions = ruleActions.map((action) => ({
    value: action,
    label: action.charAt(0).toUpperCase() + action.slice(1),
  }));

  const agentOptions = agents.map((agent) => ({
    value: agent._id,
    label: `${agent.name} (${agent.ip}:${agent.port})`,
  }));

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormError message={form.formState.errors.root?.message} />

        <FormInput
          name="name"
          label="Rule Name"
          placeholder="Enter rule name"
          required
          description="A unique name to identify this rule"
        />

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            name="type"
            label="Protocol Type"
            options={typeOptions}
            required
          />

          <FormSelect
            name="action"
            label="Action"
            options={actionOptions}
            required
          />
        </div>

        <FormTextarea
          name="match"
          label="Match Pattern"
          placeholder="e.g., example.com or *.example.com"
          required
          rows={3}
          description="Pattern to match incoming requests"
        />

        <FormInput
          name="target"
          label="Target"
          placeholder="e.g., backend.example.com:8080"
          required
          description="Destination for matched requests"
        />

        <FormSelect
          name="agent"
          label="Agent"
          options={agentOptions}
          placeholder="Select an agent"
          required
          description="The agent that will handle this rule"
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
              'Update Rule'
            ) : (
              'Create Rule'
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
