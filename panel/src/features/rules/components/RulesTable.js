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
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

export function RulesTable({ data = [], onEdit, onDelete }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('name')}</div>
        ),
      },
      {
        accessorKey: 'type',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => {
          const type = row.getValue('type');
          return (
            <Badge variant="outline">
              {type.toUpperCase()}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'match',
        header: 'Match Pattern',
        cell: ({ row }) => (
          <div className="max-w-[300px] truncate font-mono text-xs">
            {row.getValue('match')}
          </div>
        ),
      },
      {
        accessorKey: 'action',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Action" />
        ),
        cell: ({ row }) => {
          const action = row.getValue('action');
          const colors = {
            proxy: 'default',
            redirect: 'secondary',
            block: 'destructive',
          };
          return (
            <Badge variant={colors[action]}>
              {action}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'target',
        header: 'Target',
        cell: ({ row }) => (
          <div className="max-w-[200px] truncate text-sm">
            {row.getValue('target')}
          </div>
        ),
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const rule = row.original;

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
                <DropdownMenuItem onClick={() => onEdit(rule)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(rule._id)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [onEdit, onDelete]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="Search rules..."
    />
  );
}
