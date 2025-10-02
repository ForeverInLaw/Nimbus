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
import { formatDate } from '@/shared/utils/format';

/**
 * AgentsTable - Advanced table for displaying agents
 * Uses DataTable with sorting, filtering, and pagination
 */
export function AgentsTable({ data = [], onEdit, onDelete, onBulkDelete }) {
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
        accessorKey: 'ip',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="IP Address" />
        ),
        cell: ({ row }) => {
          const ip = row.getValue('ip');
          const port = row.original.port;
          return (
            <div className="text-sm">
              {ip}:{port}
            </div>
          );
        },
      },
      {
        accessorKey: 'status',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.getValue('status');
          return (
            <Badge variant={status === 'connected' ? 'default' : 'destructive'}>
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'capabilities',
        header: 'Capabilities',
        cell: ({ row }) => {
          const capabilities = row.getValue('capabilities');
          const enabled = Object.entries(capabilities)
            .filter(([, value]) => value)
            .map(([key]) => key);

          return (
            <div className="flex flex-wrap gap-1">
              {enabled.map((cap) => (
                <Badge key={cap} variant="secondary" className="text-xs">
                  {cap.toUpperCase()}
                </Badge>
              ))}
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: 'lastHeartbeat',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Last Heartbeat" />
        ),
        cell: ({ row }) => {
          const date = row.getValue('lastHeartbeat');
          return (
            <div className="text-sm text-muted-foreground">
              {formatDate(date)}
            </div>
          );
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const agent = row.original;

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
                <DropdownMenuItem onClick={() => onEdit(agent)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(agent._id)}
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
      enableRowSelection={true}
      searchPlaceholder="Search agents..."
    />
  );
}
