import React, { useContext } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import ChangePassword from "../Components/ChangePassword";
import CreateGame from "../Components/CreateGame";
import CreateMovie from "../Components/CreateMovie";
import Dashboard from "../Components/Dashboard";
import DetailGame from "../Components/DetailGame";
import DetailMovie from "../Components/DetailMovie";
import EditGame from "../Components/EditGame";
import EditMovie from "../Components/EditMovie";
import GameDelete from "../Components/GameDelete";
import Games from "../Components/Games";
import GameTable from "../Components/GameTable";
import Home from "../Components/Home";
import Login from "../Components/Login";
import Logout from "../Components/Logout";
import MovieDelete from "../Components/MovieDelete";
import Movies from "../Components/Movies";
import MovieTable from "../Components/MovieTable";
import Nav from "../Components/Navigation";
import Register from "../Components/Register";
import { GlobalContext } from "../Global/GlobalState";
const Routes = () => {
  const [GlobalState, setGlobalState] = useContext(GlobalContext);
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <div className="flex flex-row">
            {GlobalState.user !== null && <Dashboard />}
            <Home />
          </div>
        </Route>
        <Route exact path="/movies">
          <div className="flex flex-row">
            {GlobalState.user !== null && <Dashboard />}
            <Movies />
          </div>
        </Route>
        <Route exact path="/games">
          <div className="flex flex-row">
            {GlobalState.user !== null && <Dashboard />}
            <Games />
          </div>
        </Route>
        <Route exact path="/movies/:id">
          <div className="flex flex-row">
            {GlobalState.user !== null && <Dashboard />}
            <DetailMovie />
          </div>
        </Route>
        <Route exact path="/games/:id">
          <div className="flex flex-row">
            {GlobalState.user !== null && <Dashboard />}
            <DetailGame />
          </div>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/logout">
          {GlobalState.user !== null ? (
            <Logout />
          ) : (
            <Redirect to="/login"></Redirect>
          )}
        </Route>
        <Route exact path="/register">
          {GlobalState.user !== null ? (
            <Redirect to="/"></Redirect>
          ) : (
            <Register />
          )}
        </Route>
        <Route exact path="/movietable">
          {GlobalState.user !== null ? (
            <MovieTable />
          ) : (
            <Redirect to="/login"></Redirect>
          )}
        </Route>
        <Route exact path="/movietable/delete/:id">
          {GlobalState.user !== null ? (
            <MovieDelete />
          ) : (
            <Redirect to="/login"></Redirect>
          )}
        </Route>
        <Route exact path="/gametable/delete/:id">
          {GlobalState.user !== null ? (
            <GameDelete />
          ) : (
            <Redirect to="/login"></Redirect>
          )}
        </Route>
        <Route exact path="/movietable/edit/:id">
          {GlobalState.user !== null ? (
            <EditMovie />
          ) : (
            <Redirect to="/login"></Redirect>
          )}
        </Route>
        <Route exact path="/movietable/create">
          {GlobalState.user !== null ? (
            <CreateMovie />
          ) : (
            <Redirect to="/login"></Redirect>
          )}
        </Route>
        <Route exact path="/gametable/create">
          {GlobalState.user !== null ? (
            <CreateGame />
          ) : (
            <Redirect to="/login"></Redirect>
          )}
        </Route>
        <Route exact path="/gametable/edit/:id">
          {GlobalState.user !== null ? (
            <EditGame />
          ) : (
            <Redirect to="/login"></Redirect>
          )}
        </Route>
        <Route exact path="/gametable">
          {GlobalState.user !== null ? (
            <GameTable />
          ) : (
            <Redirect to="/login"></Redirect>
          )}
        </Route>
        <Route exact path="/changepass">
          {GlobalState.user !== null ? (
            <ChangePassword />
          ) : (
            <Redirect to="/login"></Redirect>
          )}
        </Route>
      </Switch>
    </Router>
  );
};
export default Routes;
