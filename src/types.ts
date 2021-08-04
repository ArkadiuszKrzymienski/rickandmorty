export type character = {
  episode: string[];
  gender: string;
  id: number;
  image: string;
  name: string;
  species: string;
};

export type selectType = "name" | "episode" | "indentifier" | "";

export type favType = "all" | "fav";

export type characterRes = { error: string | ""; list: character[] | ""; maxPage: number | undefined };
