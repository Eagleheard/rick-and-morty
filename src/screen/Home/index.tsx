import React, { useEffect, useState } from "react";

import { fetchCharactersInfo } from "api/fetchCharacters";

import { Card, Pagination } from "components";
import { ICard, ICharacter } from "types/interfaces";

import "./styles.scss";

interface ICharacterInfo {
  count: number;
  nextPage: string;
  prevPage: string;
  pages: number;
}

export const Home: React.FC = () => {
  const [characters, setCharacters] = useState<ICard[]>([]);
  const [charactersInfo, setCharactersInfo] = useState<ICharacterInfo>({
    count: 0,
    nextPage: "0",
    prevPage: "0",
    pages: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const fetchCharacters = async () => {
    try {
      const { data } = await fetchCharactersInfo(currentPage);
      setCharacters(data.results);
      setCharactersInfo(data.info);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetchCharacters();
    setIsLoading(false);
  }, [currentPage]);

  return (
    <div className="home">
      {!isLoading && characters.length !== 0 ? (
        <Pagination
          RenderComponent={Card}
          getPaginatedData={characters}
          currentPage={currentPage}
          totalCount={charactersInfo.pages}
          pageSize={characters.length}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      ) : (
        <div>Home</div>
      )}
    </div>
  );
};
