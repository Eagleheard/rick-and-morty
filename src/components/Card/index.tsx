import React from "react";
import classNames from "classnames";

import { ICard } from "types/interfaces";

import "./styles.scss";

const INDICATORS = {
  alive: "Alive",
  dead: "Dead",
  unknown: "unknown",
};

export const Card: React.FC<ICard> = ({
  name,
  status,
  location,
  episode,
  image,
  species,
}) => {
  return (
    <div className="card">
      <img src={image} className="card__img" />
      <div className="card__info">
        <p className="card__name">{name}</p>
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
        <p className="card__location">
          Last known location:
          <br />
          {location.name}
        </p>
        <p className="card__firstSeen">First seen - {episode[0]}</p>
      </div>
    </div>
  );
};
