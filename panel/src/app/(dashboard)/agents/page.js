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
import { AgentsTable, AgentForm } from '@/features/agents/components';
import {
  useAgents,
  useCreateAgent,
  useUpdateAgent,
  useDeleteAgent,
} from '@/features/agents/hooks';

export default function AgentsPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);

  // Queries and mutations
  const { data: agents = [], isLoading } = useAgents();
  const createMutation = useCreateAgent();
  const updateMutation = useUpdateAgent();
  const deleteMutation = useDeleteAgent();

  const handleCreate = () => {
    setEditingAgent(null);
    setShowDialog(true);
  };

  const handleEdit = (agent) => {
    setEditingAgent(agent);
    setShowDialog(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this agent?')) return;
    deleteMutation.mutate(id);
  };

  const handleSubmit = async (data) => {
    if (editingAgent) {
      updateMutation.mutate(
        { id: editingAgent._id, data },
        {
          onSuccess: () => {
            setShowDialog(false);
            setEditingAgent(null);
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
    setEditingAgent(null);
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agents</h1>
          <p className="text-muted-foreground">
            Manage your network agents and their configurations
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Agent
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <AgentsTable
            data={agents}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingAgent ? 'Edit Agent' : 'Create New Agent'}
            </DialogTitle>
            <DialogDescription>
              {editingAgent
                ? 'Update the agent configuration below'
                : 'Fill in the details to create a new agent'}
            </DialogDescription>
          </DialogHeader>

          <AgentForm
            defaultValues={editingAgent}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
