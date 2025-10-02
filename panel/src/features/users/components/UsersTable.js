"use client"

import { useMemo } from 'react';
import { DataTable, DataTableColumnHeader } from '@/shared/components/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2, Key } from 'lucide-react';
import { formatDate } from '@/shared/utils/format';

export function UsersTable({ data = [], onEdit, onDelete, currentUserId }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'username',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Username" />
        ),
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('username')}</div>
        ),
      },
      {
        accessorKey: 'role',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Role" />
        ),
        cell: ({ row }) => {
          const role = row.getValue('role');
          return (
            <Badge variant={role === 'admin' ? 'default' : 'secondary'}>
              {role}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'apiKey',
        header: 'API Key',
        cell: ({ row }) => {
          const apiKey = row.getValue('apiKey');
          return (
            <div className="flex items-center gap-2">
              <Key className="h-3 w-3 text-muted-foreground" />
              <code className="text-xs font-mono">
                {apiKey ? `${apiKey.substring(0, 8)}...` : 'Not set'}
              </code>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created" />
        ),
        cell: ({ row }) => {
          const date = row.getValue('createdAt');
          return date ? (
            <div className="text-sm text-muted-foreground">
              {formatDate(date)}
            </div>
          ) : null;
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const user = row.original;
          const isCurrentUser = user._id === currentUserId;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onEdit(user)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                {!isCurrentUser && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(user._id)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [onEdit, onDelete, currentUserId]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="Search users..."
    />
  );
}
