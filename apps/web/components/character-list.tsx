import { fetchCharacters } from "@/lib/api";
import { Pagination } from "@/components/pagination";
import { ErrorMessage } from "./error-message";
import { CharacterCard } from "./character-card";

interface CharacterListProps {
  search: string;
  page: number;
}

export async function CharacterList({ search, page }: CharacterListProps) {
  try {
    const response: any = await fetchCharacters(search, page);

    const data = response?.data || response[0];

    console.log("data", response);

    if (data.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤖</div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            No characters found
          </h3>
          <p className="text-gray-400">
            {search
              ? `No characters match "${search}". Try a different search term.`
              : "No characters available at the moment."}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.map((character: any) => (
            <CharacterCard
              key={character?.uid || response?.id }
              character={character?.details || character}
            />
          ))}
        </div>

        <Pagination
          currentPage={response.pagination.currentPage}
          totalPages={response.pagination.totalRecords}
          search={search}
        />
      </div>
    );
  } catch (error) {
    return <ErrorMessage error={error} />;
  }
}
