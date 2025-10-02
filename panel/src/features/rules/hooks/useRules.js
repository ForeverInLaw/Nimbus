import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/shared/constants';
import * as rulesApi from '../api/rules.api';

export function useRules() {
  return useQuery({
    queryKey: [QUERY_KEYS.RULES],
    queryFn: rulesApi.getRules,
    staleTime: 30000,
  });
}

export function useRule(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.RULES, id],
    queryFn: () => rulesApi.getRule(id),
    enabled: !!id,
  });
}

export function useCreateRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rulesApi.createRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RULES] });
      toast.success('Rule created successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create rule');
    },
  });
}

export function useUpdateRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => rulesApi.updateRule(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RULES] });
      toast.success('Rule updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update rule');
    },
  });
}

export function useDeleteRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rulesApi.deleteRule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RULES] });
      toast.success('Rule deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete rule');
    },
  });
}
