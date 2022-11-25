import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchCharacterInfo } from "api/fetchCharacterInfo";
import { fetchLocationInfo } from "api/fetchLocationInfo";
import { ICard, ILocation } from "types/interfaces";
import { Card } from "components";
import { useToast } from "hooks";
import { ToastOptions } from "types/enumerators";
import { Loader } from "components/Loader";

import "./styles.scss";

export const Location = () => {
  const { locationId } = useParams<string>();
  const [locationInfo, setLocationInfo] = useState<ILocation>();
  const [charactersId, setCharactersId] = useState<number[]>([]);
  const [charactersInfo, setCharactersInfo] = useState<ICard[]>([]);
  const { openToast } = useToast();
  const navigate = useNavigate();

  const getLocationInfo = async () => {
    try {
      const { data } = await fetchLocationInfo(locationId);
      setLocationInfo(data);
      setCharactersId(
        data.residents.map((el: string) =>
          parseInt(el.slice(el.lastIndexOf("/") + 1, el.length))
        )
      );
    } catch ({ message }) {
      openToast(String(message), ToastOptions.error);
      navigate("/");
    }
  };
  const getCharactersByEpisode = async () => {
    try {
      const { data } = await fetchCharacterInfo(charactersId);
      setCharactersInfo(data);
    } catch ({ message }) {
      openToast(String(message), ToastOptions.error);
    }
  };

  useEffect(() => {
    getLocationInfo();
  }, []);

  useEffect(() => {
    charactersId.length !== 0 && getCharactersByEpisode();
  }, [charactersId]);
  return (
    <div className="location">
      <div className="location__info">
        <h1 className="episode__name">Name: {locationInfo?.name}</h1>
        <h1 className="episode__date">Type: {locationInfo?.type}</h1>
        <h1 className="episode__season">
          Dimension: {locationInfo?.dimension}
        </h1>
      </div>{" "}
      <div className="location__cards">
        {charactersInfo.length !== 0 ? (
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
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
