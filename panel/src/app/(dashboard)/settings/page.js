"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Settings, User, Bell, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import { useThemeStore } from '@/lib/store';

export default function SettingsPage() {
  const { theme, setTheme } = useThemeStore();
  const [settings, setSettings] = useState({
    // System settings
    systemName: 'Nimbus Control Panel',
    apiTimeout: 30,
    maxConnections: 1000,
    
    // User preferences
    timezone: 'UTC',
    dateFormat: 'YYYY-MM-DD',
    itemsPerPage: 10,
    
    // Notifications
    emailNotifications: true,
    desktopNotifications: false,
    notifyOnAgentStatus: true,
    notifyOnErrors: true,
    notifyOnUpdates: false,
  });

  const handleSave = (section) => {
    toast.success(`${section} settings saved successfully`);
  };

  const handleReset = (section) => {
    toast.success(`${section} settings reset to defaults`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage system configuration and preferences
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="system" className="space-y-4">
        <TabsList>
          <TabsTrigger value="system" className="gap-2">
            <Settings className="h-4 w-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <User className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* System Settings */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>
                Configure global system settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="systemName">System Name</Label>
                <Input
                  id="systemName"
                  value={settings.systemName}
                  onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
                  placeholder="Enter system name"
                />
                <p className="text-sm text-muted-foreground">
                  Display name shown in the header
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiTimeout">API Timeout (seconds)</Label>
                <Input
                  id="apiTimeout"
                  type="number"
                  value={settings.apiTimeout}
                  onChange={(e) => setSettings({ ...settings, apiTimeout: parseInt(e.target.value) })}
                  min="5"
                  max="120"
                />
                <p className="text-sm text-muted-foreground">
                  Maximum time to wait for API responses
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxConnections">Max Concurrent Connections</Label>
                <Input
                  id="maxConnections"
                  type="number"
                  value={settings.maxConnections}
                  onChange={(e) => setSettings({ ...settings, maxConnections: parseInt(e.target.value) })}
                  min="100"
                  max="10000"
                />
                <p className="text-sm text-muted-foreground">
                  Maximum number of simultaneous connections
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleSave('System')}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => handleReset('System')}>
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Preferences */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>User Preferences</CardTitle>
              <CardDescription>
                Customize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger id="theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred color scheme
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select 
                  value={settings.timezone} 
                  onValueChange={(value) => setSettings({ ...settings, timezone: value })}
                >
                  <SelectTrigger id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">America/New York</SelectItem>
                    <SelectItem value="America/Los_Angeles">America/Los Angeles</SelectItem>
                    <SelectItem value="Europe/London">Europe/London</SelectItem>
                    <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                    <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                    <SelectItem value="Asia/Shanghai">Asia/Shanghai</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Display times in your local timezone
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select 
                  value={settings.dateFormat} 
                  onValueChange={(value) => setSettings({ ...settings, dateFormat: value })}
                >
                  <SelectTrigger id="dateFormat">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD.MM.YYYY">DD.MM.YYYY</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  How dates are displayed throughout the application
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="itemsPerPage">Items per Page</Label>
                <Select 
                  value={settings.itemsPerPage.toString()} 
                  onValueChange={(value) => setSettings({ ...settings, itemsPerPage: parseInt(value) })}
                >
                  <SelectTrigger id="itemsPerPage">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Default pagination size for data tables
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleSave('Preferences')}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => handleReset('Preferences')}>
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, emailNotifications: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="desktopNotifications">Desktop Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Show browser notifications
                  </p>
                </div>
                <Switch
                  id="desktopNotifications"
                  checked={settings.desktopNotifications}
                  onCheckedChange={(checked) => 
                    setSettings({ ...settings, desktopNotifications: checked })
                  }
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Event Notifications</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifyAgentStatus">Agent Status Changes</Label>
                      <p className="text-sm text-muted-foreground">
                        When agents connect or disconnect
                      </p>
                    </div>
                    <Switch
                      id="notifyAgentStatus"
                      checked={settings.notifyOnAgentStatus}
                      onCheckedChange={(checked) => 
                        setSettings({ ...settings, notifyOnAgentStatus: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifyErrors">System Errors</Label>
                      <p className="text-sm text-muted-foreground">
                        When system errors occur
                      </p>
                    </div>
                    <Switch
                      id="notifyErrors"
                      checked={settings.notifyOnErrors}
                      onCheckedChange={(checked) => 
                        setSettings({ ...settings, notifyOnErrors: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifyUpdates">System Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        When new updates are available
                      </p>
                    </div>
                    <Switch
                      id="notifyUpdates"
                      checked={settings.notifyOnUpdates}
                      onCheckedChange={(checked) => 
                        setSettings({ ...settings, notifyOnUpdates: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={() => handleSave('Notification')}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => handleReset('Notification')}>
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage security and access control
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Session Management</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Current session expires in 24 hours
                  </p>
                  <Button variant="outline">
                    View Active Sessions
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-2">Password</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Change your password regularly for better security
                  </p>
                  <Button variant="outline">
                    Change Password
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-2">API Keys</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage your API keys for programmatic access
                  </p>
                  <Button variant="outline">
                    Manage API Keys
                  </Button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline" disabled>
                    Enable 2FA (Coming Soon)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
