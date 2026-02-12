"use client";

import React from "react";

const categories = [
  { name: "Drink", items: "72 items", icon: "🥤", color: "bg-green-500" },
  { name: "Burger", items: "12 items", icon: "🍔" },
  { name: "Pizza", items: "15 items", icon: "🍕" },
  { name: "Dessert", items: "5 items", icon: "🍰" },
  { name: "Salad", items: "8 items", icon: "🥗" },
  { name: "Spicy", items: "6 items", icon: "🌶️" },
  { name: "Sushi", items: "12 items", icon: "🍣" },
  { name: "Others", items: "12 items", icon: "🍽️" },
];

export function Categories() {
  return (
    <React.Fragment>
      <h2 className="text-xl font-semibold text-gray-900">Categories</h2>

      <div className="flex gap-3 gap-x-5 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className={`flex-shrink-0 ${
              cat.color || "shadow"
            } rounded-xl p-5 text-center w-28 cursor-pointer hover:shadow-md transition active:scale-95`}
          >
            <div className={`text-4xl mb-2 ${cat.color ? "text-white" : ""}`}>
              {cat.icon}
            </div>
            <p
              className={`text-sm font-semibold ${
                cat.color ? "text-white" : "text-gray-900"
              }`}
            >
              {cat.name}
            </p>
            <p
              className={`text-xs ${
                cat.color ? "text-green-100" : "text-gray-600"
              }`}
            >
              {cat.items}
            </p>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
