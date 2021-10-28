import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthProvider";
import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";
import MyEvents from "./pages/myEvents/MyEvents";
import RegisterEvent from "./pages/registerEvent/RegisterEvent";
import SignIn from "./pages/signIn/SignIn";
import Nav from "./shared/nav/Nav";
import PrivateRoute from "./shared/privateRoute/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <PrivateRoute exact path="/register/:eventName">
            <RegisterEvent />
          </PrivateRoute>
          <PrivateRoute exact path="/admin">
            <Admin />
          </PrivateRoute>
          <PrivateRoute exact path="/myEvents">
            <MyEvents />
          </PrivateRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
