import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames";

import { fetchCharacterInfo } from "api/fetchCharacterInfo";
import { ICharacter } from "types/interfaces";
import { INDICATORS, ToastOptions } from "types/enumerators";
import { fetchEpisodeInfo } from "api/fetchEpisodeInfo";
import { IEpisode } from "./../../types/interfaces";
import { useToast } from "hooks";

import "./styles.scss";

export const Character = () => {
  const { characterId } = useParams<string>();
  const [character, setCharacter] = useState<ICharacter>();
  const [epInfo, setEpInfo] = useState<IEpisode[]>([]);
  const { openToast } = useToast();
  const navigate = useNavigate();

  const getCharacterInfo = async () => {
    try {
      const { data } = await fetchCharacterInfo(characterId);
      setCharacter(data);
    } catch ({ message }) {
      openToast(String(message), ToastOptions.error);
      navigate("/");
    }
  };

  const getEpisodeInfo = async (epUrl: string) => {
    try {
      const { data } = await fetchEpisodeInfo(epUrl);
      setEpInfo((prevValue) => [...prevValue, data]);
    } catch ({ message }) {
      openToast(String(message), ToastOptions.error);
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
          {character?.gender && (
            <p className="character__gender">Gender: {character.gender}</p>
          )}
          {character?.type && (
            <p className="character__type">Type: {character.type}</p>
          )}
          <div className="character__origin-location">
            <p>
              Origin location:{" "}
              <NavLink
                className="character__origin-location link"
                to={`/location/${character?.origin.url.slice(
                  character?.origin.url.lastIndexOf("/") + 1,
                  character?.origin.url.length
                )}`}
              >
                {character?.origin.name}
              </NavLink>
            </p>
          </div>
          <div className="character__current-location">
            <p>
              Current location:{" "}
              <NavLink
                className="character__current-location link"
                to={`/location/${character?.location.url.slice(
                  character?.location.url.lastIndexOf("/") + 1,
                  character?.location.url.length
                )}`}
              >
                {character?.location.name}
              </NavLink>
            </p>
          </div>
        </div>
        <div className="character__episodes">
          <h1>Episodes: </h1>
          {epInfo.length !== 0 &&
            epInfo
              .sort((prev, next) => prev.id - next.id)
              .map((epName) => (
                <NavLink
                  to={`/episode/${epName.id}`}
                  className="character__episode link"
                  key={epName.id}
                >
                  {epName.episode} - {epName.name}
                </NavLink>
              ))}
        </div>
      </div>
    </div>
  );
};
