"use client";

interface ProductFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedColor: string;
  setSelectedColor: (value: string) => void;
  selectedSize: string;
  setSelectedSize: (value: string) => void;
  allColors: string[];
  allSizes: string[];
}

export default function ProductFilter({
  searchTerm,
  setSearchTerm,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  allColors,
  allSizes,
}: ProductFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search t-shirts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="min-w-[250px] flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />

      {/* Color Filter */}
      <select
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Colors</option>
        {allColors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>

      {/* Size Filter */}
      <select
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Sizes</option>
        {allSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}
