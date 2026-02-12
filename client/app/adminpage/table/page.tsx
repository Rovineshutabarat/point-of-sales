"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  CalendarClock,
  Clock,
  LayoutGrid,
  MoreVertical,
  Plus,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useState } from "react";

type Table = {
  id: number;
  name: string;
  capacity: number;
  status: "available" | "occupied" | "reserved";
  orders?: { item: string; price: number; qty: number }[];
  reservedBy?: string;
  reservedTime?: string;
  occupiedSince?: string;
  server?: string;
};

const dummyTables: Table[] = [
  {
    id: 1,
    name: "Table 1",
    capacity: 4,
    status: "occupied",
    occupiedSince: "18:30",
    server: "John Doe",
    orders: [
      { item: "Margherita Pizza", price: 50000, qty: 2 },
      { item: "Coca Cola", price: 10000, qty: 3 },
      { item: "French Fries", price: 25000, qty: 1 },
    ],
  },
  {
    id: 2,
    name: "Table 2",
    capacity: 2,
    status: "occupied",
    occupiedSince: "19:15",
    server: "Jane Smith",
    orders: [
      { item: "Beef Burger", price: 40000, qty: 1 },
      { item: "Iced Tea", price: 8000, qty: 2 },
    ],
  },
  {
    id: 3,
    name: "Table 3",
    capacity: 6,
    status: "reserved",
    reservedBy: "Ahmad Rizki",
    reservedTime: "20:00",
  },
  {
    id: 4,
    name: "Table 4",
    capacity: 4,
    status: "available",
  },
  {
    id: 5,
    name: "Table 5",
    capacity: 8,
    status: "reserved",
    reservedBy: "Sarah Johnson",
    reservedTime: "20:30",
  },
  {
    id: 6,
    name: "Table 6",
    capacity: 2,
    status: "available",
  },
];

const TableManagementPage = () => {
  const [tables, setTables] = useState<Table[]>(dummyTables);
  const [search, setSearch] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  const filteredTables = tables.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()),
  );

  const openDetail = (table: Table) => {
    setSelectedTable(table);
    setOpenDetailModal(true);
  };

  const closeDetail = () => {
    setSelectedTable(null);
    setOpenDetailModal(false);
  };

  const calculateTotal = (
    orders?: { item: string; price: number; qty: number }[],
  ) => {
    if (!orders) return 0;
    return orders.reduce((sum, order) => sum + order.price * order.qty, 0);
  };

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Table Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage restaurant tables and track occupancy
          </p>
        </div>

        <Button onClick={() => setOpenAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Table
        </Button>
      </div>

      <div className="w-full max-w-full">
        <Input
          placeholder="Search table..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {filteredTables.map((table) => (
          <Card
            key={table.id}
            className="relative border transition-all cursor-pointer hover:shadow-md"
            onClick={() => openDetail(table)}
          >
            <CardContent className="p-4 space-y-3">
              {/* Header - Simplified */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-9 w-9 rounded-md flex items-center justify-center`}
                  >
                    <LayoutGrid className={`h-4 w-4 `} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{table.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {table.capacity} seats
                    </p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreVertical className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className={`capitalize text-xs ${
                    table.status === "available"
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : table.status === "occupied"
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-yellow-500 text-white hover:bg-yellow-600"
                  }`}
                >
                  {table.status}
                </Badge>
              </div>

              {table.status === "occupied" && table.orders && (
                <div className="text-xs text-muted-foreground">
                  {table.orders.length} active orders
                </div>
              )}

              {table.status === "reserved" && table.reservedTime && (
                <div className="text-xs text-muted-foreground">
                  Reserved at {table.reservedTime}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Table</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Table Name</Label>
              <Input placeholder="Table 1" />
            </div>

            <div className="space-y-2">
              <Label>Capacity</Label>
              <Input type="number" placeholder="4" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenAddModal(false)}>
              Cancel
            </Button>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDetailModal} onOpenChange={closeDetail}>
        <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-center gap-3">
              <div
                className={`h-12 w-12 rounded-lg flex items-center justify-center`}
              >
                <LayoutGrid className={`h-6 w-6`} />
              </div>
              <div>
                <DialogTitle className="text-xl">
                  {selectedTable?.name}
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">Table Information</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Users className="h-3.5 w-3.5" />
                      Capacity
                    </div>
                    <p className="font-semibold">
                      {selectedTable?.capacity} Persons
                    </p>
                  </div>

                  <div className={`p-3 bg-muted/50 rounded-lg`}>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Users className="h-3.5 w-3.5" />
                      Table Status
                    </div>
                    <Badge
                      variant="secondary"
                      className={`capitalize text-xs ${
                        selectedTable?.status === "available"
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : selectedTable?.status === "occupied"
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-yellow-500 text-white hover:bg-yellow-600"
                      }`}
                    >
                      {selectedTable?.status}
                    </Badge>
                  </div>

                  {selectedTable?.status === "occupied" &&
                    selectedTable?.occupiedSince && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <Clock className="h-3.5 w-3.5" />
                          Occupied Since
                        </div>
                        <p className="font-semibold">
                          {selectedTable.occupiedSince}
                        </p>
                      </div>
                    )}

                  {selectedTable?.status === "reserved" &&
                    selectedTable?.reservedTime && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <CalendarClock className="h-3.5 w-3.5" />
                          Reserved Time
                        </div>
                        <p className="font-semibold">
                          {selectedTable.reservedTime}
                        </p>
                      </div>
                    )}
                  {selectedTable?.server && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <Users className="h-3.5 w-3.5" />
                        Server
                      </div>
                      <p className="font-semibold">{selectedTable?.server}</p>
                    </div>
                  )}
                </div>

                {selectedTable?.reservedBy && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Users className="h-3.5 w-3.5" />
                      Reserved By
                    </div>
                    <p className="font-semibold">{selectedTable.reservedBy}</p>
                  </div>
                )}
              </div>

              {selectedTable?.orders && selectedTable.orders.length > 0 ? (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        Active Orders
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {selectedTable.orders.length} items
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {selectedTable.orders.map((order, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-md bg-primary flex items-center justify-center">
                              <span className="font-semibold text-sm text-white">
                                {order.qty}x
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">
                                {order.item}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Rp {order.price.toLocaleString("id-ID")} each
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-sm">
                              Rp{" "}
                              {(order.price * order.qty).toLocaleString(
                                "id-ID",
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Total</span>
                        </div>
                        <span className="font-bold text-lg">
                          Rp{" "}
                          {calculateTotal(selectedTable.orders).toLocaleString(
                            "id-ID",
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Separator />
                  <div className="text-center py-8">
                    <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
                      <ShoppingBag className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No active orders
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t bg-muted/20">
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={closeDetail}
                className="flex-1 sm:flex-initial"
              >
                Close
              </Button>
              {selectedTable?.status === "occupied" && (
                <Button variant="default" className="flex-1 sm:flex-initial">
                  Process Payment
                </Button>
              )}
              {selectedTable?.status === "available" && (
                <Button variant="default" className="flex-1 sm:flex-initial">
                  Mark as Occupied
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TableManagementPage;
