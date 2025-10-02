import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/shared/constants';
import * as geodnsApi from '../api/geodns.api';

export function useGeoDNSRecords() {
  return useQuery({
    queryKey: [QUERY_KEYS.GEODNS],
    queryFn: geodnsApi.getGeoDNSRecords,
    staleTime: 30000,
  });
}

export function useGeoDNSRecord(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.GEODNS, id],
    queryFn: () => geodnsApi.getGeoDNSRecord(id),
    enabled: !!id,
  });
}

export function useCreateGeoDNSRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: geodnsApi.createGeoDNSRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GEODNS] });
      toast.success('DNS record created successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create DNS record');
    },
  });
}

export function useUpdateGeoDNSRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => geodnsApi.updateGeoDNSRecord(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GEODNS] });
      toast.success('DNS record updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update DNS record');
    },
  });
}

export function useDeleteGeoDNSRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: geodnsApi.deleteGeoDNSRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GEODNS] });
      toast.success('DNS record deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete DNS record');
    },
  });
}
