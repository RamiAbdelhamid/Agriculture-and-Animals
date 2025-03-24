import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '../Component/ui/card';
import { Button } from '../Component/ui/Button';
import { Input } from '../Component/ui/input';
import { Label } from '../Component/ui/Label';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '../Component/ui/tabs';
import { 
  Switch
} from '../Component/ui/Switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Component/ui/Select';
import { RadioGroup, RadioGroupItem } from '../Component/ui/RadioGroup';
import { Separator } from '../Component/ui/Separator';
import { Textarea } from '../Component/ui/Textarea';

export const Settings = () => {
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    companyName: "Green Valley Farms",
    companyEmail: "info@greenvalleyfarms.com",
    companyPhone: "(555) 123-4567",
    companyAddress: "1234 Rural Road, Farmington, AG 56789",
    timezone: "America/Chicago",
    currency: "usd",
    dateFormat: "MM/DD/YYYY",
    notifications: {
      lowStock: true,
      newOrders: true,
      orderDelivery: true,
      systemUpdates: false,
      marketingEmails: false,
    },
    dataBackup: "weekly",
    theme: "light",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Settings</h2>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account settings and business information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={settings.companyName}
                  onChange={(e) =>
                    setSettings({ ...settings, companyName: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.companyEmail}
                    onChange={(e) =>
                      setSettings({ ...settings, companyEmail: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.companyPhone}
                    onChange={(e) =>
                      setSettings({ ...settings, companyPhone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  value={settings.companyAddress}
                  onChange={(e) =>
                    setSettings({ ...settings, companyAddress: e.target.value })
                  }
                />
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="font-medium">User Management</h3>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Active Users: 5</p>
                      <p className="text-sm text-gray-500">
                        Maximum allowed: 10
                      </p>
                    </div>
                    <Button>Manage Users</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                {saved ? "Saved!" : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>
                Configure system settings and display preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) =>
                      setSettings({ ...settings, timezone: value })
                    }
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">
                        Eastern Time (ET)
                      </SelectItem>
                      <SelectItem value="America/Chicago">
                        Central Time (CT)
                      </SelectItem>
                      <SelectItem value="America/Denver">
                        Mountain Time (MT)
                      </SelectItem>
                      <SelectItem value="America/Los_Angeles">
                        Pacific Time (PT)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={settings.currency}
                    onValueChange={(value) =>
                      setSettings({ ...settings, currency: value })
                    }
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="cad">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select
                    value={settings.dateFormat}
                    onValueChange={(value) =>
                      setSettings({ ...settings, dateFormat: value })
                    }
                  >
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="font-medium">Theme & Display</h3>
                <div className="space-y-2">
                  <Label>Color Theme</Label>
                  <RadioGroup
                    defaultValue={settings.theme}
                    onValueChange={(value) =>
                      setSettings({ ...settings, theme: value })
                    }
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">System Default</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="font-medium">Data Management</h3>
                <div className="space-y-2">
                  <Label htmlFor="backup">Automatic Backup Frequency</Label>
                  <Select
                    value={settings.dataBackup}
                    onValueChange={(value) =>
                      setSettings({ ...settings, dataBackup: value })
                    }
                  >
                    <SelectTrigger id="backup">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between rounded-md border p-4">
                  <div>
                    <p className="font-medium">Export All Data</p>
                    <p className="text-sm text-gray-500">
                      Download a CSV file with all your data
                    </p>
                  </div>
                  <Button variant="outline">Export</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                {saved ? "Saved!" : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="low-stock">Low Stock Alerts</Label>
                    <p className="text-sm text-gray-500">
                      Notify when inventory items fall below minimum level
                    </p>
                  </div>
                  <Switch
                    id="low-stock"
                    checked={settings.notifications.lowStock}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          lowStock: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-orders">New Order Notifications</Label>
                    <p className="text-sm text-gray-500">
                      Notify when new orders are placed
                    </p>
                  </div>
                  <Switch
                    id="new-orders"
                    checked={settings.notifications.newOrders}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          newOrders: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="order-delivery">
                      Order Delivery Updates
                    </Label>
                    <p className="text-sm text-gray-500">
                      Notify when order status changes to delivered
                    </p>
                  </div>
                  <Switch
                    id="order-delivery"
                    checked={settings.notifications.orderDelivery}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          orderDelivery: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-updates">System Updates</Label>
                    <p className="text-sm text-gray-500">
                      Notify about new features and system updates
                    </p>
                  </div>
                  <Switch
                    id="system-updates"
                    checked={settings.notifications.systemUpdates}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          systemUpdates: checked,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing">Marketing Emails</Label>
                    <p className="text-sm text-gray-500">
                      Receive promotional offers and newsletters
                    </p>
                  </div>
                  <Switch
                    id="marketing"
                    checked={settings.notifications.marketingEmails}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          marketingEmails: checked,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                {saved ? "Saved!" : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>External Integrations</CardTitle>
              <CardDescription>
                Connect with third-party services and tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div>
                    <h3 className="font-medium">QuickBooks</h3>
                    <p className="text-sm text-gray-500">
                      Connect to sync financial data
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div>
                    <h3 className="font-medium">Weather Service API</h3>
                    <p className="text-sm text-gray-500">
                      Get local weather forecasts
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-green-600 mr-2">
                      Connected
                    </span>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div>
                    <h3 className="font-medium">USDA Market Data</h3>
                    <p className="text-sm text-gray-500">
                      Access agricultural market prices
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div>
                    <h3 className="font-medium">Shipping Provider API</h3>
                    <p className="text-sm text-gray-500">
                      Automate shipping and tracking
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between rounded-md border p-4">
                  <div>
                    <h3 className="font-medium">Email Marketing Platform</h3>
                    <p className="text-sm text-gray-500">
                      Sync customer lists for newsletters
                    </p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <h3 className="font-medium">API Access</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-md border p-4">
                    <div>
                      <h3 className="font-medium">API Key</h3>
                      <p className="text-sm text-gray-500">
                        Generate an API key for external access
                      </p>
                    </div>
                    <Button variant="outline">Generate Key</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave}>
                {saved ? "Saved!" : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

                