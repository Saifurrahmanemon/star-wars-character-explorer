import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Home } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-yellow-400">SW</div>
          <span className="text-white font-semibold">Explorer</span>
        </Link>
      </div>
    </header>
  );
}
