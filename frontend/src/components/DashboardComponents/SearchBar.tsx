import { Search } from "lucide-react";
import { useEffect, useState } from "react";

// Debounce function with proper TypeScript typing
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: number | null = null; // Use NodeJS.Timeout instead of number

  return function executedFunction(...args: Parameters<T>): void {
    const later = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [text, setText] = useState<string>("");
  // Use useMemo or a custom hook for debouncing instead of incorrect debounce usage
  const debouncedSearch = debounce((searchTerm: string) => {
    onSearch(searchTerm);
  }, 500);

  useEffect(() => {
    debouncedSearch(text);
  }, [text, debouncedSearch]);

  return (
    <div className="flex items-center justify-center w-full max-w-lg mx-auto bg-white">
      <input
        type="text"
        placeholder="Search your content..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-6 py-3 text-lg text-gray-700 bg-transparent focus:outline-none"
      />
      <button
        type="button" // Add type="button" to prevent form submission
        className="p-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition duration-300"
        onClick={() => onSearch(text)} // Add onClick handler for immediate search
      >
        <Search />
      </button>
    </div>
  );
};