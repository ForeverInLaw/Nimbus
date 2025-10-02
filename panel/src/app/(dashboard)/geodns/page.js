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
import { GeoDNSTable, GeoDNSForm } from '@/features/geodns/components';
import {
  useGeoDNSRecords,
  useCreateGeoDNSRecord,
  useUpdateGeoDNSRecord,
  useDeleteGeoDNSRecord,
} from '@/features/geodns/hooks';

export default function GeoDNSPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const { data: records = [], isLoading } = useGeoDNSRecords();
  const createMutation = useCreateGeoDNSRecord();
  const updateMutation = useUpdateGeoDNSRecord();
  const deleteMutation = useDeleteGeoDNSRecord();

  const handleCreate = () => {
    setEditingRecord(null);
    setShowDialog(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setShowDialog(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this DNS record?')) return;
    deleteMutation.mutate(id);
  };

  const handleSubmit = async (data) => {
    if (editingRecord) {
      updateMutation.mutate(
        { id: editingRecord._id, data },
        {
          onSuccess: () => {
            setShowDialog(false);
            setEditingRecord(null);
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
    setEditingRecord(null);
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
          <h1 className="text-3xl font-bold tracking-tight">GeoDNS</h1>
          <p className="text-muted-foreground">
            Manage geographic DNS records and routing
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add DNS Record
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <GeoDNSTable
            data={records}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingRecord ? 'Edit DNS Record' : 'Create DNS Record'}
            </DialogTitle>
            <DialogDescription>
              {editingRecord
                ? 'Update the DNS record configuration below'
                : 'Fill in the details to create a new GeoDNS record'}
            </DialogDescription>
          </DialogHeader>

          <GeoDNSForm
            defaultValues={editingRecord}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
