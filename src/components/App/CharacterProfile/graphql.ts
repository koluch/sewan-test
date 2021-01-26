import { gql } from "@apollo/client";

import { Unnullify } from "../../../helpers/graphql";

import * as generated from "./__generated__/CharacterQuery";

export const CHARACTER_QUERY = gql`
  query CharacterQuery($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        dimension
        name
        type
      }
      location {
        id
        dimension
        name
        type
      }
      image
      episode {
        id
        name
        episode
      }
      created
    }
  }
`;

export type CharacterQuery = generated.CharacterQuery;

export type CharacterQueryVariables = generated.CharacterQueryVariables;

export type Character = Unnullify<CharacterQuery["character"]>;
