import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { saveConsumer, getConsumer } from "../services/consumerService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
class ConsumerForm extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {},
  };
  schema = {
    id: Joi,
    name: Joi.string().min(5).label("Username"),
    email: Joi.string()
      .regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
      .label("Email"),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .label("Password"),
  };

  async populateConsumer() {
    try {
      const consumerId = this.props.match.params.id;
      if (!consumerId) return;
      const { data: consumer } = await getConsumer(consumerId);
      this.setState({ data: this.mapToViewModel(consumer) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateConsumer();
    console.log("mount");
  }

  mapToViewModel(consumer) {
    return {
      id: consumer.id,
      name: consumer.name,
      email: consumer.email,
      password: consumer.password,
    };
  }

  doSubmit = async () => {
    console.log(this.state.data);
    await saveConsumer(this.state.data);
    toast.success("successfully done !");
    this.props.history.push("/consumers");
  };

  render() {
    const { data, errors } = this.state;

    return (
      <React.Fragment>
        <div className="card">
          <h3 className="card-header">New Consumer</h3>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Enter Name"
                  value={data["name"]}
                  onChange={this.handleChange}
                  required
                  autoFocus
                />
                {errors.name && (
                  <div className="alert alert-danger p-1">{errors["name"]}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={data["email"]}
                  onChange={this.handleChange}
                  required
                />
                {errors.email && (
                  <div className="alert alert-danger p-1">
                    {errors["email"]}
                  </div>
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
                  value={data["password"]}
                  onChange={this.handleChange}
                  required
                />
                {errors.password && (
                  <div className="alert alert-danger p-1">
                    {errors["password"]}
                  </div>
                )}
              </div>
              <button
                disabled={this.validate()}
                className="btn btn-primary"
              >
                Add
              </button>
              <Link className="btn btn-dark m-3" to="/consumers">
                Back
              </Link>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ConsumerForm;
