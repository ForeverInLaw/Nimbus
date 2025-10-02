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

export function RoutesTable({ data = [], onEdit, onDelete }) {
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
        accessorKey: 'protocol',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Protocol" />
        ),
        cell: ({ row }) => {
          const protocol = row.getValue('protocol');
          return (
            <Badge variant="outline">
              {protocol.toUpperCase()}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'source',
        header: 'Source',
        cell: ({ row }) => (
          <div className="max-w-[250px] truncate font-mono text-xs">
            {row.getValue('source')}
          </div>
        ),
      },
      {
        accessorKey: 'destination',
        header: 'Destination',
        cell: ({ row }) => (
          <div className="max-w-[250px] truncate font-mono text-xs">
            {row.getValue('destination')}
          </div>
        ),
      },
      {
        accessorKey: 'agents',
        header: 'Agents',
        cell: ({ row }) => {
          const agents = row.getValue('agents');
          return (
            <div className="flex items-center gap-1">
              <Badge variant="secondary">
                {agents?.length || 0} agent{agents?.length !== 1 ? 's' : ''}
              </Badge>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const route = row.original;

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
                <DropdownMenuItem onClick={() => onEdit(route)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(route._id)}
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
      searchPlaceholder="Search routes..."
    />
  );
}
