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
    name: string;
    url?: string;
  };
  episode: string[];
  image: string;
  species: string;
}
