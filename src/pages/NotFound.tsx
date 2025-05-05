
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold text-wastbygg-blue mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Sidan kunde inte hittas</p>
        <p className="text-gray-500 mb-8">
          Sidan du försöker nå finns inte eller har flyttats.
        </p>
        <Button asChild>
          <Link to="/">Tillbaka till startsidan</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
