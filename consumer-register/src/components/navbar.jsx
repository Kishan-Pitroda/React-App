import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/authService";
class Navbar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <div className="container-fluid p-0">
        <nav className="navbar p-3 sticky-top navbar-expand-sm navbar-dark bg-dark">
          <Link className="navbar-brand" to="/" style={{ fontWeight: 600, fontSize: 30 }}>
            Eshop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/consumers">
                  Consumer List
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/consumers/new">
                  New Consumer
                </Link>
              </li>
            </ul>
            {user && (
              <React.Fragment>
                <span className="text-light mr-3" ngif="admin">
                  logged in as {user.email}
                </span>
                <Link ngif="admin" onClick={logout} to="" className="btn btn-success">
                  Logout
                </Link>
              </React.Fragment>
            )}
            {!user && (
              <Link ngif="!admin" to="/login" className="btn btn-primary">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
