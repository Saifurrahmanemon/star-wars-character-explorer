import { SearchBar } from "@/components/search-bar";
import { Header } from "@/components/header";
import { Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CharacterList } from "@/components/character-list";
import { CharacterListSkeleton } from "@/components/char-skeleton";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}



export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const page = Number.parseInt(params.page || "1");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Star Wars
            <span className="block text-yellow-400">Character Explorer</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the heroes, villains, and droids of a galaxy far, far away
          </p>
        </div>

        <SearchBar initialSearch={search} />

        <Suspense
          key={`${search}-${page}`}
          fallback={<CharacterListSkeleton />}
        >
          <CharacterList search={search} page={page} />
        </Suspense>
      </main>
    </div>
  );
}
