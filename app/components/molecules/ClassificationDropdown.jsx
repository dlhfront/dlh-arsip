"use client";

import { useEffect, useState } from "react";

const ClassificationDropdown = ({
  value,
  onChange,
  onSelect,
  classifications = [],
}) => {
  const [filtered, setFiltered] = useState(classifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFiltered(
      classifications.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, classifications]);

  const handleSelect = (classification) => {
    onSelect(classification);
    setIsOpen(false);
  };

  return (
    <div className="mt-4 relative">
      <label className="block text-dark">Klasifikasi Surat</label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onChange(e);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Type to search..."
        className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      {isOpen && filtered.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full max-h-60 overflow-auto rounded-b shadow-lg">
          {filtered.map((c) => (
            <li
              key={c.code}
              onClick={() => handleSelect(c)}
              className="p-2 hover:bg-secondary/20 cursor-pointer"
            >
              ({c.code}) - {c.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassificationDropdown;