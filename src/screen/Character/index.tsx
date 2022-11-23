import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";

import { fetchCharacterInfo } from "api/fetchCharacterInfo";
import { ICharacter } from "types/interfaces";
import { INDICATORS } from "types/enumerators";

import "./styles.scss";
import { fetchEpisodeInfo } from "api/fetchEpisodeInfo";
import { IEpisode } from "./../../types/interfaces";

export const Character = () => {
  const { characterId } = useParams<string>();
  const [character, setCharacter] = useState<ICharacter>();
  const [epInfo, setEpInfo] = useState<IEpisode[]>([]);

  const getCharacterInfo = async () => {
    try {
      const { data } = await fetchCharacterInfo(characterId);
      setCharacter(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getEpisodeInfo = async (epUrl: string) => {
    try {
      const { data } = await fetchEpisodeInfo(epUrl);
      setEpInfo((prevValue) => [...prevValue, data]);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCharacterInfo();
  }, []);

  useEffect(() => {
    epInfo.length === 0 &&
      character?.episode.map((epUrl) => getEpisodeInfo(epUrl));
  }, [character]);

  return (
    <div className="character__container">
      <div className="character">
        <img src={character?.image} className="character__image" />
        <div className="character__info">
          <h1 className="character__name">{character?.name}</h1>
          <div className="card__status-info">
            <div
              className={classNames("card__indicator", {
                "card__indicator--alive":
                  character?.status === INDICATORS.alive,
                "card__indicator--dead": character?.status === INDICATORS.dead,
                "card__indicator--unknown":
                  character?.status === INDICATORS.unknown,
              })}
            />
            <p className="character__status">
              {character?.status} - {character?.species}
            </p>
          </div>
          <div className="character__origin-location">
            <p>Origin location: {character?.origin.name}</p>
          </div>
          <div className="character__current-location">
            <p>Current location: {character?.location.name}</p>
          </div>
        </div>
        <div className="character__episodes">
          <h1>Episodes: </h1>
          {epInfo.length !== 0 &&
            epInfo
              .sort((prev, next) => prev.id - next.id)
              .map((epName) => (
                <p className="character__episode" key={epName.id}>
                  {epName.episode} - {epName.name}
                </p>
              ))}
        </div>
      </div>
    </div>
  );
};
