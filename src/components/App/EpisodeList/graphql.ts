import { gql } from "@apollo/client";

import {
  ArrayItem,
  Unnullify,
  PaginatedResultItem,
} from "../../../helpers/graphql";

import * as generated from "./__generated__/EpisodesQuery";

export const EPISODES_QUERY = gql`
  query EpisodesQuery {
    episodes {
      results {
        id
        name
        episode
        characters {
          id
          name
          image
        }
      }
    }
  }
`;

export type EpisodesQuery = generated.EpisodesQuery;

export type Episode = PaginatedResultItem<EpisodesQuery["episodes"]>;

export type Character = Unnullify<ArrayItem<Unnullify<Episode["characters"]>>>;
