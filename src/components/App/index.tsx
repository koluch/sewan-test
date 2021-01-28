import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import { ROUTES } from "../../services/routing";

import CharacterProfile from "./CharacterProfile";
import EpisodeList from "./EpisodeList";
import Page404 from "./Page404";
import GlobalStyles from "./globalStyles";
import logoUrl from "./logo.svg";
import Reset from "./reset";

const Root = styled.div`
  padding: 2rem;
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const LogoWrap = styled.div`
  text-align: center;
`;

const Logo = styled.img`
  width: 70vw;
  max-width: 500px;
  margin-bottom: 3rem;
`;

export default function App(): JSX.Element {
  const client = new ApolloClient({
    uri: process.env.GRAPHQL_SCHEMA_URL,
    cache: new InMemoryCache(),
  });
  return (
    <>
      <Reset />
      <GlobalStyles />
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Root>
            <Content>
              <LogoWrap>
                <Logo src={logoUrl} />
              </LogoWrap>
              <Switch>
                <Route path={ROUTES.character.path} exact>
                  <CharacterProfile />
                </Route>
                <Route path={ROUTES.episodeList.path} exact>
                  <EpisodeList />
                </Route>
                <Route>
                  <Page404 />
                </Route>
              </Switch>
            </Content>
          </Root>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}
