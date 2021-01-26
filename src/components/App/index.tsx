import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ROUTES } from "../../services/routing";

import CharacterProfile from "./CharacterProfile";
import EpisodeList from "./EpisodeList";
import Page404 from "./Page404";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
