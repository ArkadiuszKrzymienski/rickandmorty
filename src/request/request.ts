import axios from "axios";

export const fetchCharacterList = async (filter: string, value: string, page?: number): Promise<T> => {
  const links: {
    indentifier: string;
    name: string;
    episode: string;
  } = {
    indentifier: `https://rickandmortyapi.com/api/character/${value}`,
    name: `https://rickandmortyapi.com/api/character?${filter}${value ? "=" + value : ""}${
      page ? "&page=" + page : ""
    }`,
    episode: `https://rickandmortyapi.com/api/${filter}/${value}`,
  };

  if (filter === "episode") {
    return axios.get(links.episode);
  } else {
    return axios.get(links[`${filter}`]);
  }
};
