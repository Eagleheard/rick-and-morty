import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

import { fetchEpisodeInfo } from "api/fetchEpisodeInfo";
import { useToast } from "hooks";
import { ICard } from "types/interfaces";
import { INDICATORS, ToastOptions } from "types/enumerators";

import "./styles.scss";
import "constants/base.scss";

interface IEpisodeInfo {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

export const Card: React.FC<ICard> = ({
  id,
  name,
  status,
  location,
  episode,
  image,
  species,
}) => {
  const [episodeInfo, setEpisodeInfo] = useState<IEpisodeInfo>({
    id: 0,
    name: "",
    air_date: "",
    episode: "",
    characters: [],
  });
  const { openToast } = useToast();
  const getEpisodeInfo = async () => {
    try {
      const { data } = await fetchEpisodeInfo(episode[0]);
      setEpisodeInfo(data);
    } catch ({ message }) {
      openToast(String(message), ToastOptions.error);
    }
  };
  useEffect(() => {
    getEpisodeInfo();
  }, []);

  return (
    <div className="card">
      <img src={image} className="card__img" />
      <div className="card__info">
        <div className="card__main-info">
          <NavLink className="card__name link" to={`character/${id}`}>
            {name}
          </NavLink>
          <div className="card__status-info">
            <div
              className={classNames("card__indicator", {
                "card__indicator--alive": status === INDICATORS.alive,
                "card__indicator--dead": status === INDICATORS.dead,
                "card__indicator--unknown": status === INDICATORS.unknown,
              })}
            />
            <p className="card__status">
              {status} - {species}
            </p>
          </div>
        </div>
        <div className="card__location-info">
          <p className="card__location">
            Last known location:
            <br />
            <NavLink
              to={`/location/${location.url?.slice(
                location.url.lastIndexOf("/") + 1,
                location.url.length
              )}`}
              className="card__location link"
            >
              {location.name}
            </NavLink>
          </p>
        </div>
        <p className="card__first-seen">
          First seen:{" "}
          <NavLink
            to={`/episode/${episodeInfo.id}`}
            className="card__first-seen link"
          >
            {episodeInfo.name}
          </NavLink>
        </p>
      </div>
    </div>
  );
};
