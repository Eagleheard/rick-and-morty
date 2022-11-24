import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchEpisodeInfo } from "api/fetchEpisodeInfo";
import { IEpisode } from "types/interfaces";
import { fetchCharacterInfo } from "api/fetchCharacterInfo";
import { ICard } from "types/interfaces";
import { Card } from "components";

import "./styles.scss";

export const Episode = () => {
  const { episodeId } = useParams<string>();
  const [episodeInfo, setEpisodeInfo] = useState<IEpisode>();
  const [charactersId, setCharactersId] = useState<number[]>([]);
  const [charactersInfo, setCharactersInfo] = useState<ICard[]>([]);

  const getEpisodeInfo = async () => {
    try {
      const { data } = await fetchEpisodeInfo(
        `https://rickandmortyapi.com/api/episode/${episodeId}`
      );
      setEpisodeInfo(data);
      setCharactersId(
        data.characters.map((el: string) =>
          parseInt(el.slice(el.lastIndexOf("/") + 1, el.length))
        )
      );
    } catch (e) {
      console.log(e);
    }
  };
  const getCharactersByEpisode = async () => {
    try {
      const { data } = await fetchCharacterInfo(charactersId);
      setCharactersInfo(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getEpisodeInfo();
  }, []);

  useEffect(() => {
    charactersId.length !== 0 && getCharactersByEpisode();
  }, [charactersId]);
  return (
    <div className="episode">
      <div className="episode__info">
        <h1 className="episode__name">Episode: {episodeInfo?.name}</h1>
        <h1 className="episode__date">Air date: {episodeInfo?.air_date}</h1>
        <h1 className="episode__season">
          Season:{" "}
          {episodeInfo?.episode.slice(1, episodeInfo?.episode.indexOf("E"))}
        </h1>
        <h1 className="episode__episode-number">
          Episode:{" "}
          {episodeInfo?.episode.slice(
            episodeInfo?.episode.indexOf("E") + 1,
            episodeInfo?.episode.length
          )}
        </h1>
      </div>
      <div className="episode__cards">
        {charactersInfo.length !== 0 &&
          charactersInfo.map((data) => (
            <Card
              key={data.id}
              name={data.name}
              episode={data.episode}
              status={data.status}
              location={data.location}
              species={data.species}
              id={data.id}
              image={data.image}
            />
          ))}
      </div>
    </div>
  );
};
