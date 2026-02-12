"use client";

const products = [
  {
    id: 1,
    name: "Tuna Sushi",
    category: "Seafood",
    price: 126000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ6NjNe6M9aU58GA2c-CF5Kocr65wLIT0Xug&s",
    variants: ["Regular", "Spicy", "Extra Mayo"],
  },
  {
    id: 2,
    name: "Ketoprak",
    category: "Vegetables",
    price: 56000,
    image:
      "https://images.unsplash.com/photo-1625399810647-6a06c574ea8f?q=80&w=400",
    variants: ["Normal", "Extra Tofu", "Extra Peanut Sauce"],
  },
  {
    id: 3,
    name: "Siomay Ikan",
    category: "Seafood",
    price: 73000,
    image:
      "https://images.unsplash.com/photo-1617196034183-421b4917c8b6?q=80&w=400",
    variants: ["Original", "Pedas", "Extra Telur"],
  },
];

export function ProductList() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Product List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl overflow-hidden hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="w-full h-36 overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            </div>

            {/* Content */}
            <div className="p-3 space-y-3">
              <div>
                <p className="font-semibold text-gray-900 leading-tight">
                  {p.name}
                </p>
                <p className="text-xs text-gray-500">{p.category}</p>
              </div>

              <p className="font-bold text-lg text-gray-900">
                Rp {p.price.toLocaleString("id-ID")}
              </p>

              <div className="flex items-center gap-2">
                <select className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {p.variants.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>

                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 active:scale-95 transition">
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
