"use client"

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DataTable, DataTableColumnHeader } from '@/shared/components/data-table';
import { Search, Download, Filter, AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '@/shared/utils/format';
import { exportToCSV, exportToJSON } from '@/shared/utils/export';

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  // Mock audit logs data - replace with real API
  const allLogs = [
    {
      id: '1',
      timestamp: new Date('2025-02-10T04:51:23'),
      user: 'admin',
      action: 'agent.create',
      description: 'Created new agent "Web Server 1"',
      severity: 'info',
      ip: '192.168.1.100',
      details: { agentId: 'agent-001', name: 'Web Server 1' }
    },
    {
      id: '2',
      timestamp: new Date('2025-02-10T04:45:12'),
      user: 'admin',
      action: 'rule.update',
      description: 'Updated rule "HTTP Redirect"',
      severity: 'info',
      ip: '192.168.1.100',
      details: { ruleId: 'rule-003' }
    },
    {
      id: '3',
      timestamp: new Date('2025-02-10T04:38:45'),
      user: 'john.doe',
      action: 'user.login',
      description: 'User logged in successfully',
      severity: 'success',
      ip: '192.168.1.105',
      details: { userId: 'user-002' }
    },
    {
      id: '4',
      timestamp: new Date('2025-02-10T04:32:18'),
      user: 'system',
      action: 'agent.disconnect',
      description: 'Agent "Database Server" disconnected',
      severity: 'warning',
      ip: '192.168.1.50',
      details: { agentId: 'agent-005', reason: 'timeout' }
    },
    {
      id: '5',
      timestamp: new Date('2025-02-10T04:25:33'),
      user: 'admin',
      action: 'route.delete',
      description: 'Deleted route "Legacy API Route"',
      severity: 'warning',
      ip: '192.168.1.100',
      details: { routeId: 'route-012' }
    },
    {
      id: '6',
      timestamp: new Date('2025-02-10T04:18:09'),
      user: 'system',
      action: 'system.error',
      description: 'Failed to connect to database',
      severity: 'error',
      ip: '127.0.0.1',
      details: { error: 'Connection timeout', code: 'ETIMEDOUT' }
    },
    {
      id: '7',
      timestamp: new Date('2025-02-10T04:12:55'),
      user: 'admin',
      action: 'geodns.create',
      description: 'Created GeoDNS record for example.com',
      severity: 'info',
      ip: '192.168.1.100',
      details: { domain: 'example.com', type: 'A' }
    },
    {
      id: '8',
      timestamp: new Date('2025-02-10T04:05:22'),
      user: 'jane.smith',
      action: 'user.logout',
      description: 'User logged out',
      severity: 'info',
      ip: '192.168.1.108',
      details: { userId: 'user-003' }
    },
    {
      id: '9',
      timestamp: new Date('2025-02-10T03:58:41'),
      user: 'system',
      action: 'agent.connect',
      description: 'Agent "CDN Edge 2" connected',
      severity: 'success',
      ip: '192.168.1.75',
      details: { agentId: 'agent-008' }
    },
    {
      id: '10',
      timestamp: new Date('2025-02-10T03:45:15'),
      user: 'admin',
      action: 'settings.update',
      description: 'Updated system settings',
      severity: 'info',
      ip: '192.168.1.100',
      details: { section: 'notifications' }
    },
  ];

  // Filter logs
  const filteredLogs = useMemo(() => {
    return allLogs.filter(log => {
      const matchesSearch = 
        log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = filterType === 'all' || log.action.startsWith(filterType);
      const matchesSeverity = filterSeverity === 'all' || log.severity === filterSeverity;

      return matchesSearch && matchesType && matchesSeverity;
    });
  }, [searchQuery, filterType, filterSeverity, allLogs]);

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error':
        return <XCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getSeverityVariant = (severity) => {
    switch (severity) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'success':
        return 'default';
      default:
        return 'outline';
    }
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'timestamp',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Timestamp" />
      ),
      cell: ({ row }) => (
        <div className="text-sm">
          {formatDate(row.getValue('timestamp'), 'PPpp')}
        </div>
      ),
    },
    {
      accessorKey: 'severity',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Severity" />
      ),
      cell: ({ row }) => {
        const severity = row.getValue('severity');
        return (
          <Badge variant={getSeverityVariant(severity)} className="gap-1">
            {getSeverityIcon(severity)}
            {severity}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'user',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="User" />
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('user')}</div>
      ),
    },
    {
      accessorKey: 'action',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => (
        <code className="text-xs bg-muted px-2 py-1 rounded">
          {row.getValue('action')}
        </code>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <div className="max-w-md truncate">
          {row.getValue('description')}
        </div>
      ),
    },
    {
      accessorKey: 'ip',
      header: 'IP Address',
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.getValue('ip')}
        </div>
      ),
    },
  ], []);

  const handleExportCSV = () => {
    const data = filteredLogs.map(log => ({
      Timestamp: formatDate(log.timestamp, 'yyyy-MM-dd HH:mm:ss'),
      Severity: log.severity,
      User: log.user,
      Action: log.action,
      Description: log.description,
      IP: log.ip,
    }));
    exportToCSV(data, 'audit-logs');
  };

  const handleExportJSON = () => {
    exportToJSON(filteredLogs, 'audit-logs');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground">
          Complete system activity history and event tracking
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Action Type Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Action Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="rule">Rule</SelectItem>
                <SelectItem value="route">Route</SelectItem>
                <SelectItem value="geodns">GeoDNS</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="settings">Settings</SelectItem>
              </SelectContent>
            </Select>

            {/* Severity Filter */}
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportJSON}>
              <Download className="mr-2 h-4 w-4" />
              Export JSON
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={filteredLogs}
            searchPlaceholder="Search logs..."
          />
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{filteredLogs.length}</div>
            <p className="text-xs text-muted-foreground">Total Logs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">
              {filteredLogs.filter(l => l.severity === 'error').length}
            </div>
            <p className="text-xs text-muted-foreground">Errors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredLogs.filter(l => l.severity === 'warning').length}
            </div>
            <p className="text-xs text-muted-foreground">Warnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {filteredLogs.filter(l => l.severity === 'success').length}
            </div>
            <p className="text-xs text-muted-foreground">Success</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
