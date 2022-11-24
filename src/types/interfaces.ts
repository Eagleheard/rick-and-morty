export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface ICard {
  id: number;
  name: string;
  status: string;
  location: {
    id: number;
    name: string;
    url?: string;
  };
  episode: string[];
  image: string;
  species: string;
}

export interface IEpisode {
  id: number;
  name: string;
  episode: string;
  air_date?: string;
}

export interface ISign {
  handleSwitch: () => void;
  style?: string;
}

export interface IUser {
  id?: string;
  email?: string;
  name?: string;
  lastName?: string;
  password?: string;
  photo?: string;
  role?: string;
  blocked?: boolean;
}

export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}
