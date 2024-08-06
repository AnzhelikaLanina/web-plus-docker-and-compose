import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Header } from "../header";
import { Footer } from "../footer";
import { SignIn } from "../sign-in";
import { SignUp } from "../sign-up";
import { MainPage } from "../main-page";
import { ProfilePage } from "../profile-page";
import { UserPage } from "../user-page";
import { SearchPage } from "../search-page";
import { WishlistPage } from "../wishlist-page";
import { GiftPage } from "../gift-page";
import { getOwnUser } from "../../utils/api";
import { PrivateRoute } from "../private-route";
import { SearchBar } from "../search-bar";

import { UserContext } from "../../utils/context";

import styles from "./app.module.css";

function App() {
  const [userCtx, setUserCtx] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("auth_token")) {
      getOwnUser().then((res) => {
        setUserCtx(res);
      });
    } else {
      setUserCtx({});
    }
  }, []);

  return (
    <div className={styles.app}>
      <UserContext.Provider value={[userCtx, setUserCtx]}>
        <ApplicationView />
      </UserContext.Provider>
    </div>
  );
}

const ApplicationView = () => {
  const [userCtx] = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [queryHits, setQueryHits] = useState({
    query: "",
    hits: [],
  });

  const redirectTo = userCtx && userCtx.id ? "/gifts/line" : "/signin";

  const changeQuery = (e) => {
    setQuery(e.target.value);
  };

  if (!userCtx) {
    return <></>;
  }

  return (
    <BrowserRouter>
      <Header />
      <main className={styles.content}>
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <PrivateRoute path="/search">
            <SearchBar
              query={query}
              changeQuery={changeQuery}
              setQueryHits={setQueryHits}
            />
            <SearchPage query={query} queryHits={queryHits} />
          </PrivateRoute>
          <PrivateRoute path="/gifts">
            <SearchBar
              query={query}
              changeQuery={changeQuery}
              setQueryHits={setQueryHits}
            />
            <MainPage />
          </PrivateRoute>
          <PrivateRoute path="/profile">
            <SearchBar
              query={query}
              changeQuery={changeQuery}
              setQueryHits={setQueryHits}
            />
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute path="/users/:username">
            <SearchBar
              query={query}
              changeQuery={changeQuery}
              setQueryHits={setQueryHits}
            />
            <UserPage />
          </PrivateRoute>
          <PrivateRoute path="/wishlist">
            <SearchBar
              query={query}
              changeQuery={changeQuery}
              setQueryHits={setQueryHits}
            />
            <WishlistPage />
          </PrivateRoute>
          <PrivateRoute path="/gift/:id">
            <SearchBar
              query={query}
              changeQuery={changeQuery}
              setQueryHits={setQueryHits}
            />
            <GiftPage />
          </PrivateRoute>
          <Redirect exact from="/" to={redirectTo} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
