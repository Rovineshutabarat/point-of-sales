"use client";

import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const orders = [
  {
    id: "T6",
    name: "Mr. Willy",
    items: "2 items",
    status: "Ready",
    statusColor: "bg-green-500",
    details: "Ready to serve",
    color: "bg-red-500",
  },
  {
    id: "T7",
    name: "Mrs. Jane",
    items: "2 items",
    status: "Ready",
    statusColor: "bg-blue-500",
    details: "In the kitchen",
    color: "bg-blue-500",
  },
  {
    id: "T8",
    name: "Mrs. Aishy",
    items: "2 items",
    status: "In progress",
    statusColor: "bg-yellow-500",
    details: "In the kitchen",
    color: "bg-yellow-500",
  },
  {
    id: "T9",
    name: "Mrs. Aishy",
    items: "2 items",
    status: "In progress",
    statusColor: "bg-yellow-500",
    details: "In the kitchen",
    color: "bg-yellow-500",
  },
];

export function OrderList() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Order List</h2>

      <div className="flex items-center justify-between">
        <div className="flex gap-x-12 overflow-x-scroll">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center gap-x-8">
              <div className="flex items-center gap-3">
                <div
                  className={`${order.color} w-20 h-20 flex items-center justify-center text-white font-bold text-lg`}
                >
                  {order.id}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-900">
                    {order.name}
                  </h3>
                  <p className="text-xs text-gray-600">{order.items}</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-y-1">
                <Badge
                  className={`${order.statusColor} text-white text-xs flex items-center justify-center gap-x-1`}
                >
                  <Check height={15} width={15} />
                  <span>{order.status}</span>
                </Badge>
                <p className="text-xs text-gray-600 min-w-fit">
                  {order.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
