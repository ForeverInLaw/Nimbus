import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/shared/constants';
import * as agentsApi from '../api/agents.api';

/**
 * Custom hooks for agents management
 * Handles TanStack Query integration with optimistic updates
 */

/**
 * Get all agents
 */
export function useAgents() {
  return useQuery({
    queryKey: [QUERY_KEYS.AGENTS],
    queryFn: agentsApi.getAgents,
    staleTime: 30000, // 30 seconds
  });
}

/**
 * Get single agent by ID
 * @param {string} id - Agent ID
 */
export function useAgent(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.AGENTS, id],
    queryFn: () => agentsApi.getAgent(id),
    enabled: !!id,
  });
}

/**
 * Create new agent
 */
export function useCreateAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: agentsApi.createAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AGENTS] });
      toast.success('Agent created successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create agent');
    },
  });
}

/**
 * Update existing agent
 */
export function useUpdateAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => agentsApi.updateAgent(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.AGENTS, id] });

      // Snapshot the previous value
      const previousAgent = queryClient.getQueryData([QUERY_KEYS.AGENTS, id]);

      // Optimistically update to the new value
      queryClient.setQueryData([QUERY_KEYS.AGENTS, id], (old) => ({
        ...old,
        ...data,
      }));

      return { previousAgent };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousAgent) {
        queryClient.setQueryData(
          [QUERY_KEYS.AGENTS, variables.id],
          context.previousAgent
        );
      }
      toast.error(err.message || 'Failed to update agent');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AGENTS] });
      toast.success('Agent updated successfully!');
    },
  });
}

/**
 * Delete agent
 */
export function useDeleteAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: agentsApi.deleteAgent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AGENTS] });
      toast.success('Agent deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete agent');
    },
  });
}

/**
 * Bulk delete agents
 */
export function useBulkDeleteAgents() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: agentsApi.bulkDeleteAgents,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AGENTS] });
      toast.success(`${variables.ids.length} agent(s) deleted successfully!`);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete agents');
    },
  });
}

/**
 * Toggle agent status (enable/disable)
 */
export function useToggleAgentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, enabled }) => agentsApi.toggleAgentStatus(id, enabled),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AGENTS] });
      toast.success(
        `Agent ${variables.enabled ? 'enabled' : 'disabled'} successfully!`
      );
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to toggle agent status');
    },
  });
}
