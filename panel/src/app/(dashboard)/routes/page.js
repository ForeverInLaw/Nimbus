"use client"

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { RoutesTable, RouteForm } from '@/features/routes/components';
import {
  useRoutes,
  useCreateRoute,
  useUpdateRoute,
  useDeleteRoute,
} from '@/features/routes/hooks';

export default function RoutesPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);

  const { data: routes = [], isLoading } = useRoutes();
  const createMutation = useCreateRoute();
  const updateMutation = useUpdateRoute();
  const deleteMutation = useDeleteRoute();

  const handleCreate = () => {
    setEditingRoute(null);
    setShowDialog(true);
  };

  const handleEdit = (route) => {
    setEditingRoute(route);
    setShowDialog(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this route?')) return;
    deleteMutation.mutate(id);
  };

  const handleSubmit = async (data) => {
    if (editingRoute) {
      updateMutation.mutate(
        { id: editingRoute._id, data },
        {
          onSuccess: () => {
            setShowDialog(false);
            setEditingRoute(null);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setShowDialog(false);
        },
      });
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
    setEditingRoute(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Routes</h1>
          <p className="text-muted-foreground">
            Configure network routes and traffic flow
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Route
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <RoutesTable
            data={routes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRoute ? 'Edit Route' : 'Create New Route'}
            </DialogTitle>
            <DialogDescription>
              {editingRoute
                ? 'Update the route configuration below'
                : 'Fill in the details to create a new network route'}
            </DialogDescription>
          </DialogHeader>

          <RouteForm
            defaultValues={editingRoute}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
