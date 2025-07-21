import { SearchBar } from "@/components/search-bar";
import { Header } from "@/components/header";
import { Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CharacterList } from "@/components/character-list";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}

export function CharacterListSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Card key={i} className="bg-white/5 border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Skeleton className="h-6 w-32 bg-gray-700" />
                <Skeleton className="h-5 w-8 bg-gray-700" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-24 bg-gray-700" />
              <Skeleton className="h-4 w-28 bg-gray-700" />
              <Skeleton className="h-4 w-20 bg-gray-700" />
              <div className="flex gap-1">
                <Skeleton className="h-5 w-16 bg-gray-700" />
                <Skeleton className="h-5 w-16 bg-gray-700" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center space-x-2">
        <Skeleton className="h-9 w-20 bg-gray-700" />
        <Skeleton className="h-9 w-8 bg-gray-700" />
        <Skeleton className="h-9 w-8 bg-gray-700" />
        <Skeleton className="h-9 w-8 bg-gray-700" />
        <Skeleton className="h-9 w-16 bg-gray-700" />
      </div>
    </div>
  );
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
