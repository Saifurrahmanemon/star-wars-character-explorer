import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, User, Film, Zap } from "lucide-react";
import type { Character } from "@/lib/types";

interface CharacterCardProps {
  character: any;
}

export function CharacterCard({ character }: CharacterCardProps) {

  if ("error" in character) {
    return (
      <Card className="h-full bg-red-900/20 border-red-700">
        <CardHeader className="pb-3">
          <h3 className="text-xl font-bold text-white">{character.name}</h3>
          <p className="text-red-400 text-sm">{character.error}</p>
        </CardHeader>
      </Card>
    );
  }

  const { id, name, description, basicInfo, relations } = character;

  const homeworld = relations?.homeworld || character?.homeworld;

  return (
    <div>
      <Card className="h-full bg-white/5 border-gray-700 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-yellow-400/50 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-white truncate">{name}</h3>
            <Badge
              variant="secondary"
              className="ml-2 bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
            >
              #{id}
            </Badge>
          </div>
          {description && (
            <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
          )}
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex items-center text-gray-300 text-sm">
            <User className="w-4 h-4 mr-2 text-blue-400" />
            <span className="capitalize">{basicInfo?.gender || character?.gender}</span>
            <span className="mx-2">•</span>
            <span>{basicInfo?.birthYear || character?.birthYear}</span>
          </div>

          {homeworld && (
            <div className="flex items-center text-gray-300 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-green-400" />
              <span className="truncate">{homeworld.name}</span>
            </div>
          )}

          <div className="flex items-center text-gray-300 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-purple-400" />
            <span>
              {basicInfo?.height || character?.height}cm • {basicInfo?.mass || character?.mass}kg
            </span>
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            <Badge
              variant="outline"
              className="text-xs border-gray-600 text-gray-300"
            >
              {basicInfo?.eyeColor || character?.eye_color} eyes
            </Badge>
            <Badge
              variant="outline"
              className="text-xs border-gray-600 text-gray-300"
            >
              {basicInfo?.hairColor || character?.hair_color} hair
            </Badge>
          </div>

          {/* Additional info badges */}
          <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
            {/* <div className="flex items-center">
              <Film className="w-3 h-3 mr-1" />
              <span>{relations?.films.length} films</span>
            </div> */}
            {relations?.starships.length > 0 && (
              <div className="flex items-center">
                <Zap className="w-3 h-3 mr-1" />
                <span>{relations.starships.length} ships</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
