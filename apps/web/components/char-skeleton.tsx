import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

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