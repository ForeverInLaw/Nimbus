import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { QUERY_KEYS } from '@/shared/constants';
import * as routesApi from '../api/routes.api';

export function useRoutes() {
  return useQuery({
    queryKey: [QUERY_KEYS.ROUTES],
    queryFn: routesApi.getRoutes,
    staleTime: 30000,
  });
}

export function useRoute(id) {
  return useQuery({
    queryKey: [QUERY_KEYS.ROUTES, id],
    queryFn: () => routesApi.getRoute(id),
    enabled: !!id,
  });
}

export function useCreateRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: routesApi.createRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROUTES] });
      toast.success('Route created successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create route');
    },
  });
}

export function useUpdateRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => routesApi.updateRoute(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROUTES] });
      toast.success('Route updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update route');
    },
  });
}

export function useDeleteRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: routesApi.deleteRoute,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ROUTES] });
      toast.success('Route deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete route');
    },
  });
}
