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
import { MoreHorizontal, Pencil, Trash2, Globe } from 'lucide-react';

export function GeoDNSTable({ data = [], onEdit, onDelete }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'domain',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Domain" />
        ),
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue('domain')}</div>
        ),
      },
      {
        accessorKey: 'recordType',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => {
          const type = row.getValue('recordType');
          return <Badge variant="outline">{type}</Badge>;
        },
      },
      {
        accessorKey: 'target',
        header: 'Target',
        cell: ({ row }) => (
          <div className="max-w-[250px] truncate font-mono text-xs">
            {row.getValue('target')}
          </div>
        ),
      },
      {
        accessorKey: 'location',
        header: 'Location',
        cell: ({ row }) => {
          const location = row.getValue('location');
          return (
            <div className="flex items-center gap-1">
              <Globe className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm">
                {location?.city}, {location?.country}
              </span>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: 'anycast',
        header: 'Anycast',
        cell: ({ row }) => {
          const anycast = row.getValue('anycast');
          return anycast ? (
            <Badge variant="secondary">Enabled</Badge>
          ) : (
            <Badge variant="outline">Disabled</Badge>
          );
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const record = row.original;

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
                <DropdownMenuItem onClick={() => onEdit(record)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDelete(record._id)}
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
      searchPlaceholder="Search DNS records..."
    />
  );
}
