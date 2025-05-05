
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
}

const Header = ({ 
  title = "Structur Projekthantering",
  showSearch = false,
  searchPlaceholder = "Sök projekt...",
  onSearchChange
}: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-wastbygg-blue font-bold text-2xl">Structur</span>
          </Link>
          {title && title !== "Structur Projekthantering" && (
            <div className="ml-8 flex items-center">
              <Link to="/" className="text-gray-500 hover:text-gray-700">
                <Home size={18} />
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-xl font-semibold text-gray-800">{title}</span>
            </div>
          )}
        </div>
        
        {showSearch && onSearchChange && (
          <div className="max-w-xs w-full relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              className="pl-10 w-full"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
