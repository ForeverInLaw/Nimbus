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
import { RulesTable, RuleForm } from '@/features/rules/components';
import {
  useRules,
  useCreateRule,
  useUpdateRule,
  useDeleteRule,
} from '@/features/rules/hooks';

export default function RulesPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingRule, setEditingRule] = useState(null);

  const { data: rules = [], isLoading } = useRules();
  const createMutation = useCreateRule();
  const updateMutation = useUpdateRule();
  const deleteMutation = useDeleteRule();

  const handleCreate = () => {
    setEditingRule(null);
    setShowDialog(true);
  };

  const handleEdit = (rule) => {
    setEditingRule(rule);
    setShowDialog(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this rule?')) return;
    deleteMutation.mutate(id);
  };

  const handleSubmit = async (data) => {
    if (editingRule) {
      updateMutation.mutate(
        { id: editingRule._id, data },
        {
          onSuccess: () => {
            setShowDialog(false);
            setEditingRule(null);
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
    setEditingRule(null);
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
          <h1 className="text-3xl font-bold tracking-tight">Rules</h1>
          <p className="text-muted-foreground">
            Define traffic routing rules and policies
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Rule
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <RulesTable
            data={rules}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingRule ? 'Edit Rule' : 'Create New Rule'}
            </DialogTitle>
            <DialogDescription>
              {editingRule
                ? 'Update the rule configuration below'
                : 'Fill in the details to create a new routing rule'}
            </DialogDescription>
          </DialogHeader>

          <RuleForm
            defaultValues={editingRule}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
