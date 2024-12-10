import { useSearchParams } from "react-router-dom";
import {
  useGetMatch,
  useHandleAttack,
} from "@/entities/match/hooks/match.hooks";
import { useEffect, useState } from "react";
import { MatchPokemonCard } from "./ui/MatchPokemonCard";

export const MatchPage = () => {
  const [searchParams] = useSearchParams();
  const matchId = searchParams.get("matchId");
  const { data, isLoading, refetch } = useGetMatch(matchId || "");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const attackEnemy = useHandleAttack(matchId);

  const handleAttack = async () => {
    if (isButtonDisabled && data.turn === "player") return;
    setIsButtonDisabled(true);
    try {
      await attackEnemy.mutateAsync();
      await refetch();
    } catch (error) {
      console.error("Error during attack:", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    if (!isLoading && data) {
      if (data.turn === "bot" && data.status === "ongoing") {
        handleAttack();
      }
    }
  }, [data, isLoading]);

  if (isLoading)
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  return (
    <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8">
      <div className="max-w-7xl  mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Status: {data.status[0].toUpperCase() + data.status.slice(1)}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center">
              Your Pokemons
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.player.pokemon.map((pokemon, idx) => (
                <MatchPokemonCard key={idx} pokemon={pokemon} />
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 text-center">
              Enemy Pokemons
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.bot.pokemon.map((pokemon, idx) => (
                <MatchPokemonCard key={idx} pokemon={pokemon} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          {data.status === "ongoing" ? (
            data.turn === "player" ? (
              <button
                className={`${
                  isButtonDisabled
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold py-3 px-6 rounded-lg transition h-14 duration-200`}
                onClick={handleAttack}
                disabled={isButtonDisabled}
              >
                Attack
              </button>
            ) : (
              <p className="text-gray-600 font-medium text-lg h-14">
                AI turn...
              </p>
            )
          ) : (
            <p className="text-gray-600 font-medium text-lg h-14">
              Match ended
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
