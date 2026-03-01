import React, { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onLocationSearch,
}) => {
  const [inputValue, setInputValue] = useState("");

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.trim().length >= 2) {
        onSearch(inputValue);
      }
    }, 800); // Đợi 800ms sau khi ngừng gõ mới gọi API

    return () => clearTimeout(timer);
  }, [inputValue, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) onSearch(inputValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md mx-auto mb-8 z-10"
    >
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-slate-400 w-5 h-5" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tìm kiếm thành phố..."
          className="w-full bg-white/10 text-white placeholder-slate-300 rounded-full py-3 pl-12 pr-12 outline-none border border-white/20 focus:border-blue-400 focus:bg-white/20 transition-all shadow-lg backdrop-blur-md"
        />
        <button
          type="button"
          onClick={onLocationSearch}
          className="absolute right-3 p-2 text-slate-300 hover:text-blue-400 transition-colors"
          title="Dùng vị trí hiện tại"
        >
          <MapPin className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
