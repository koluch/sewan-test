import { gql } from "@apollo/client";

import {
  ArrayItem,
  PaginatedResultItem,
  Unnullify,
} from "../../../helpers/graphql/typeAdapters";

import * as generated from "./__generated__/EpisodesQuery";

export const EPISODES_QUERY = gql`
  query EpisodesQuery($page: Int!) {
    episodes(page: $page) {
      info {
        count
        pages
        prev
        next
      }
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

export type EpisodesQueryVariables = generated.EpisodesQueryVariables;

export type Episode = PaginatedResultItem<EpisodesQuery["episodes"]>;

export type Character = Unnullify<ArrayItem<Episode["characters"]>>;
