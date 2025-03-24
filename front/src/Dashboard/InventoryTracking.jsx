import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Component/ui/Table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Component/ui/card";
import { Button } from "../Component/ui/Button";
import { Input } from "../Component/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Component/ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Component/ui/Select";
import { Badge } from "../Component/ui/badge";
import { Search, Filter, Plus, RefreshCw } from "lucide-react";

export const InventoryTracking = () => {
  const [openAddItemDialog, setOpenAddItemDialog] = useState(false);

  // Sample inventory data
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      name: "Organic Chicken Feed",
      category: "Feed",
      quantity: 500,
      unit: "kg",
      location: "Warehouse A",
      lastUpdated: "2025-03-15",
      status: "In Stock",
    },
    {
      id: 2,
      name: "Veterinary Antibiotics",
      category: "Medication",
      quantity: 150,
      unit: "bottles",
      location: "Medical Supply Room",
      lastUpdated: "2025-03-10",
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Sheep Shears",
      category: "Equipment",
      quantity: 25,
      unit: "units",
      location: "Tool Shed",
      lastUpdated: "2025-02-28",
      status: "In Stock",
    },
    {
      id: 4,
      name: "Cattle Mineral Supplement",
      category: "Feed",
      quantity: 200,
      unit: "kg",
      location: "Warehouse B",
      lastUpdated: "2025-03-18",
      status: "In Stock",
    },
    {
      id: 5,
      name: "Laying Hen Nest Boxes",
      category: "Equipment",
      quantity: 8,
      unit: "units",
      location: "Poultry Barn",
      lastUpdated: "2025-03-01",
      status: "Out of Stock",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Inventory Tracking</h2>
        <Button
          onClick={() => setOpenAddItemDialog(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Item
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
          <CardDescription>
            Track and manage your agricultural products and supplies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center w-full max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search inventory..."
                  className="pl-8 w-full"
                />
              </div>
              <Select>
                <SelectTrigger className="w-40 ml-2">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="feed">Feed</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="medication">Medication</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center">
              <Button variant="outline" className="mr-2">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      {item.quantity} {item.unit}
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          History
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={openAddItemDialog} onOpenChange={setOpenAddItemDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Inventory Item</DialogTitle>
            <DialogDescription>
              Enter details for the new inventory item
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Name</label>
              <Input className="col-span-3" placeholder="Enter item name" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Category</label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feed">Feed</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="medication">Medication</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Quantity</label>
              <Input className="col-span-3" type="number" placeholder="0" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Unit</label>
              <Input className="col-span-3" placeholder="kg, units, etc." />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Location</label>
              <Input className="col-span-3" placeholder="Storage location" />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenAddItemDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setOpenAddItemDialog(false)}>
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryTracking;
