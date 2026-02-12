"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

const cartItems = [
  {
    id: 1,
    name: "Tuna Sushi",
    variant: "Spicy",
    price: 126000,
    qty: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ6NjNe6M9aU58GA2c-CF5Kocr65wLIT0Xug&s",
  },
  {
    id: 2,
    name: "Ketoprak",
    variant: "Extra Peanut Sauce",
    price: 56000,
    qty: 1,
    image:
      "https://images.unsplash.com/photo-1625399810647-6a06c574ea8f?q=80&w=400",
  },
];

export function BillDetail() {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  return (
    <div className="h-screen w-full max-w-sm bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Checkout</h2>
        <p className="text-sm text-gray-500">2 items in cart</p>
      </div>

      {/* Cart List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 border rounded-xl p-3 hover:shadow-sm transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 rounded-lg object-cover"
            />

            <div className="flex-1">
              <p className="font-medium text-sm leading-tight">{item.name}</p>
              <p className="text-xs text-gray-500">{item.variant}</p>
              <p className="text-sm font-semibold">
                Rp {item.price.toLocaleString("id-ID")}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <button className="w-7 h-7 flex items-center justify-center rounded-md border hover:bg-gray-100">
                  <Minus size={14} />
                </button>
                <span className="text-sm font-medium">{item.qty}</span>
                <button className="w-7 h-7 flex items-center justify-center rounded-md border hover:bg-gray-100">
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <button className="text-gray-400 hover:text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border-t p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium">
            Rp {subtotal.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Tax (10%)</span>
          <span className="font-medium">
            Rp {(subtotal * 0.1).toLocaleString("id-ID")}
          </span>
        </div>

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>Rp {(subtotal * 1.1).toLocaleString("id-ID")}</span>
        </div>

        <button className="w-full h-12 mt-2 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 active:scale-[0.98] transition">
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
}
