"use client"

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UsersTable, UserForm } from '@/features/users/components';
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from '@/features/users/hooks';

export default function UsersPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUserId(user._id);
    }
  }, []);

  const { data: users = [], isLoading } = useUsers();
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  const handleCreate = () => {
    setEditingUser(null);
    setShowDialog(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowDialog(true);
  };

  const handleDelete = async (id) => {
    if (id === currentUserId) {
      toast.error("You cannot delete your own account!");
      return;
    }
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    deleteMutation.mutate(id);
  };

  const handleSubmit = async (data) => {
    if (editingUser) {
      updateMutation.mutate(
        { id: editingUser._id, data },
        {
          onSuccess: () => {
            setShowDialog(false);
            setEditingUser(null);
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
    setEditingUser(null);
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
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage user accounts and access control
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <UsersTable
            data={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentUserId={currentUserId}
          />
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingUser ? 'Edit User' : 'Create New User'}
            </DialogTitle>
            <DialogDescription>
              {editingUser
                ? 'Update the user account details below'
                : 'Fill in the details to create a new user account'}
            </DialogDescription>
          </DialogHeader>

          <UserForm
            defaultValues={editingUser}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={createMutation.isPending || updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
