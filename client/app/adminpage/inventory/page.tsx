"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  DollarSign,
  MoreVertical,
  Package,
  PackageCheck,
  Plus,
  Search,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

type InventoryItem = {
  id: number;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  maxStock: number;
  price: number;
  cost: number;
  description: string;
  lastRestocked: string;
  supplier: string;
  sku: string;
};

const dummyInventory: InventoryItem[] = [
  {
    id: 1,
    name: "Burger",
    category: "Food",
    stock: 25,
    minStock: 10,
    maxStock: 50,
    price: 50000,
    cost: 30000,
    description: "Delicious beef burger",
    lastRestocked: "2024-02-10",
    supplier: "Food Supplier Co.",
    sku: "BRG-001",
  },
  {
    id: 2,
    name: "Coke",
    category: "Drink",
    stock: 50,
    minStock: 30,
    maxStock: 100,
    price: 15000,
    cost: 8000,
    description: "Refreshing soft drink",
    lastRestocked: "2024-02-11",
    supplier: "Beverage Distributor",
    sku: "DRK-001",
  },
  {
    id: 3,
    name: "Fries",
    category: "Food",
    stock: 8,
    minStock: 15,
    maxStock: 40,
    price: 20000,
    cost: 12000,
    description: "Crispy french fries",
    lastRestocked: "2024-02-05",
    supplier: "Food Supplier Co.",
    sku: "FRY-001",
  },
  {
    id: 4,
    name: "Ice Cream",
    category: "Dessert",
    stock: 45,
    minStock: 20,
    maxStock: 60,
    price: 25000,
    cost: 15000,
    description: "Vanilla ice cream",
    lastRestocked: "2024-02-12",
    supplier: "Dairy Products Inc.",
    sku: "ICE-001",
  },
  {
    id: 5,
    name: "Coffee",
    category: "Drink",
    stock: 5,
    minStock: 10,
    maxStock: 50,
    price: 18000,
    cost: 10000,
    description: "Premium coffee blend",
    lastRestocked: "2024-01-28",
    supplier: "Beverage Distributor",
    sku: "COF-001",
  },
  {
    id: 6,
    name: "Pizza Slice",
    category: "Food",
    stock: 12,
    minStock: 10,
    maxStock: 30,
    price: 35000,
    cost: 20000,
    description: "Pepperoni pizza slice",
    lastRestocked: "2024-02-11",
    supplier: "Food Supplier Co.",
    sku: "PZZ-001",
  },
];

const InventoryPage = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(dummyInventory);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  // Calculate statistics
  const totalItems = inventory.length;
  const totalValue = inventory.reduce(
    (sum, item) => sum + item.stock * item.price,
    0,
  );
  const lowStockItems = inventory.filter((item) => item.stock < item.minStock);
  const outOfStockItems = inventory.filter((item) => item.stock === 0);
  const overstockItems = inventory.filter((item) => item.stock > item.maxStock);
  const totalProfit = inventory.reduce(
    (sum, item) => sum + item.stock * (item.price - item.cost),
    0,
  );

  // Get unique categories
  const categories = Array.from(
    new Set(inventory.map((item) => item.category)),
  );

  // Filter inventory
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && item.stock < item.minStock) ||
      (stockFilter === "out" && item.stock === 0) ||
      (stockFilter === "overstock" && item.stock > item.maxStock);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const getStockStatus = (item: InventoryItem) => {
    if (item.stock === 0)
      return { label: "Out of Stock", color: "bg-red-100 text-red-700" };
    if (item.stock < item.minStock)
      return { label: "Low Stock", color: "bg-orange-100 text-orange-700" };
    if (item.stock > item.maxStock)
      return { label: "Overstock", color: "bg-blue-100 text-blue-700" };
    return { label: "In Stock", color: "bg-emerald-100 text-emerald-700" };
  };

  return (
    <div className="p-6 space-y-6 w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Inventory Management
          </h1>
          <p className="text-slate-600 mt-1">
            Monitor and manage your product inventory
          </p>
        </div>
        <Button onClick={() => setOpenModal(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Items
            </CardTitle>
            <Package className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-slate-600 mt-1">
              Across {categories.length} categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Inventory Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp {(totalValue / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-emerald-600 mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              Potential profit: Rp {(totalProfit / 1000).toFixed(0)}K
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Low Stock Alert
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {lowStockItems.length}
            </div>
            <p className="text-xs text-slate-600 mt-1">Items need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Stock Status
            </CardTitle>
            <PackageCheck className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Out:</span>
                <span className="font-semibold text-red-600">
                  {outOfStockItems.length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Overstock:</span>
                <span className="font-semibold text-blue-600">
                  {overstockItems.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by product name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={stockFilter} onValueChange={setStockFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Stock Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="low">Low Stock</SelectItem>
            <SelectItem value="out">Out of Stock</SelectItem>
            <SelectItem value="overstock">Overstock</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Inventory Tabs */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredInventory.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center text-slate-500 py-12">
                <Package size={48} className="mb-4 text-slate-300" />
                <p className="font-medium">No items found</p>
                <p className="text-sm mt-1">
                  {search || categoryFilter !== "all" || stockFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Add new items to your inventory"}
                </p>
              </div>
            ) : (
              filteredInventory.map((item) => {
                const status = getStockStatus(item);
                const stockPercentage = (item.stock / item.maxStock) * 100;

                return (
                  <Card
                    key={item.id}
                    className="relative hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-xs text-slate-500">{item.sku}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => setSelectedItem(item)}
                            >
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ArrowUp className="h-4 w-4 mr-2" />
                              Restock
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ArrowDown className="h-4 w-4 mr-2" />
                              Adjust Stock
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-600">Stock Level</span>
                          <span className="font-semibold">
                            {item.stock} / {item.maxStock}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              stockPercentage > 50
                                ? "bg-emerald-500"
                                : stockPercentage > 20
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                            }`}
                            style={{
                              width: `${Math.min(stockPercentage, 100)}%`,
                            }}
                          />
                        </div>
                      </div>

                      <div className="pt-2 space-y-1 text-sm border-t">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Price:</span>
                          <span className="font-semibold">
                            Rp {item.price.toLocaleString("id-ID")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Value:</span>
                          <span className="font-semibold">
                            Rp{" "}
                            {(item.stock * item.price).toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>

                      <Badge variant="secondary" className={status.color}>
                        {status.label}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredInventory.map((item) => {
                      const status = getStockStatus(item);
                      return (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-slate-900">
                                {item.name}
                              </div>
                              <div className="text-sm text-slate-500">
                                {item.sku}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="secondary">{item.category}</Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <div className="font-medium">
                                {item.stock} units
                              </div>
                              <div className="text-slate-500">
                                Min: {item.minStock} / Max: {item.maxStock}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            Rp {item.price.toLocaleString("id-ID")}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium">
                            Rp{" "}
                            {(item.stock * item.price).toLocaleString("id-ID")}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="secondary" className={status.color}>
                              {status.label}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => setSelectedItem(item)}
                                >
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>Restock</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Item Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Inventory Item</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input placeholder="e.g., Burger" />
            </div>
            <div className="space-y-2">
              <Label>SKU</Label>
              <Input placeholder="e.g., BRG-001" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="drink">Drink</SelectItem>
                  <SelectItem value="dessert">Dessert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Supplier</Label>
              <Input placeholder="Supplier name" />
            </div>
            <div className="space-y-2">
              <Label>Current Stock</Label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label>Minimum Stock</Label>
              <Input type="number" placeholder="10" />
            </div>
            <div className="space-y-2">
              <Label>Maximum Stock</Label>
              <Input type="number" placeholder="50" />
            </div>
            <div className="space-y-2">
              <Label>Cost Price (Rp)</Label>
              <Input type="number" placeholder="30000" />
            </div>
            <div className="space-y-2">
              <Label>Selling Price (Rp)</Label>
              <Input type="number" placeholder="50000" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Description</Label>
              <Input placeholder="Product description..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Modal */}
      {selectedItem && (
        <Dialog
          open={!!selectedItem}
          onOpenChange={() => setSelectedItem(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedItem.name}</span>
                <Badge
                  variant="secondary"
                  className={getStockStatus(selectedItem).color}
                >
                  {getStockStatus(selectedItem).label}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-600">SKU</Label>
                  <p className="font-medium mt-1">{selectedItem.sku}</p>
                </div>
                <div>
                  <Label className="text-slate-600">Category</Label>
                  <p className="font-medium mt-1">{selectedItem.category}</p>
                </div>
                <div>
                  <Label className="text-slate-600">Supplier</Label>
                  <p className="font-medium mt-1">{selectedItem.supplier}</p>
                </div>
                <div>
                  <Label className="text-slate-600">Last Restocked</Label>
                  <p className="font-medium mt-1">
                    {new Date(selectedItem.lastRestocked).toLocaleDateString(
                      "id-ID",
                    )}
                  </p>
                </div>
              </div>

              {/* Stock Information */}
              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-sm text-slate-700">
                  Stock Information
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-slate-600">Current Stock</Label>
                    <p className="text-2xl font-bold mt-1">
                      {selectedItem.stock}
                    </p>
                  </div>
                  <div>
                    <Label className="text-slate-600">Minimum Stock</Label>
                    <p className="text-2xl font-bold mt-1 text-orange-600">
                      {selectedItem.minStock}
                    </p>
                  </div>
                  <div>
                    <Label className="text-slate-600">Maximum Stock</Label>
                    <p className="text-2xl font-bold mt-1 text-blue-600">
                      {selectedItem.maxStock}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-emerald-500 h-3 rounded-full"
                    style={{
                      width: `${Math.min(
                        (selectedItem.stock / selectedItem.maxStock) * 100,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-sm text-slate-700">
                  Pricing & Value
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-600">Cost Price</Label>
                    <p className="text-lg font-semibold mt-1">
                      Rp {selectedItem.cost.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div>
                    <Label className="text-slate-600">Selling Price</Label>
                    <p className="text-lg font-semibold mt-1">
                      Rp {selectedItem.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div>
                    <Label className="text-slate-600">Total Value</Label>
                    <p className="text-lg font-semibold mt-1 text-emerald-600">
                      Rp{" "}
                      {(selectedItem.stock * selectedItem.price).toLocaleString(
                        "id-ID",
                      )}
                    </p>
                  </div>
                  <div>
                    <Label className="text-slate-600">Profit per Unit</Label>
                    <p className="text-lg font-semibold mt-1 text-emerald-600">
                      Rp{" "}
                      {(selectedItem.price - selectedItem.cost).toLocaleString(
                        "id-ID",
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label className="text-slate-600">Description</Label>
                <p className="mt-1">{selectedItem.description}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedItem(null)}>
                Close
              </Button>
              <Button>
                <ArrowUp className="h-4 w-4 mr-2" />
                Restock Item
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InventoryPage;
