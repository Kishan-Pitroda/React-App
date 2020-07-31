import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { login } from "../services/authService";
import { toast } from "react-toastify";
class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
      .label("Email"),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.email, data.password);
      toast("logged in successfully !");
      window.location = "/";
    } catch (ex) {
      toast.error("Invalid Credentials !");
      if (ex.response && ex.response.error === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { data, errors } = this.state;

    return (
      <React.Fragment>
        <div className="card m-3">
          <h3 className="card-header">Login</h3>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={data.email}
                  onChange={this.handleChange}
                  required
                  autoFocus
                />
                {errors.email && (
                  <div className="alert alert-danger p-1">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={data.password}
                  onChange={this.handleChange}
                  required
                />
                {errors.password && (
                  <div className="alert alert-danger p-1">
                    {errors.password}
                  </div>
                )}
              </div>
              <button
                disabled={this.validate()}
                className="btn btn-success"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Login;
