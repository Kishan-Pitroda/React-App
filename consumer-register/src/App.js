import React, { Component } from "react";
import Consumers from "./components/consumers";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Navbar from "./components/navbar";
import NotFound from "./components/not-found";
import ConsumerForm from "./components/consumerForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { getCurrentUser} from "./services/authService";
import ProtectedRoute from "./components/protectedRoute";
import DeleteConsumer from "./components/deleteConsumer";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
    console.log("after mounted" + user);
  }

  render() {
    const { user } = this.state;
    console.log("rendered");
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <div className="container mt-5 mx-auto">
          <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/consumers/new" component={ConsumerForm} />
            <ProtectedRoute
              path="/consumers/detail/:id"
              component={DeleteConsumer}
            />
            <ProtectedRoute
              path="/consumers/edit/:id"
              component={ConsumerForm}
            />
            <ProtectedRoute
              path="/consumers/delete/:id"
              component={DeleteConsumer}
            />
            <ProtectedRoute path="/consumers" component={Consumers} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
