import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getConsumer, deleteConsumer } from "../services/consumerService";
import { toast } from "react-toastify";

class DeleteConsumer extends Component {
  state = {
    data: { id: null, name: "", email: "", password: "" },
    isDelete: false,
  };
  async getConsumerDetail() {
    try {
      const isDelete = this.props.match.path.includes("delete");
      const consumerId = this.props.match.params.id;
      const { data } = await getConsumer(consumerId);
      this.setState({ data, isDelete });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.getConsumerDetail();
    console.log("mount");
  }

  handleDelete = async () => {
    await deleteConsumer(this.state.data.id);
    toast.success("successfully done !");
    this.props.history.push("/consumers");
  };

  render() {
    const { id, name, email } = this.state.data;
    return (
      <React.Fragment>
        <div className="card">
          <h3 className="card-header">Consumer Detail</h3>
          <div className="card-body">
            <h5>Id: {id}</h5>
            <h5>Username: {name}</h5>
            <h5>Email: {email}</h5>
            {this.state.isDelete && (
              <button className="btn btn-danger" onClick={this.handleDelete}>
                Confirm
              </button>
            )}
            {!this.state.isDelete && (
              <Link className="btn btn-dark" to="/consumers">
                Back
              </Link>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DeleteConsumer;
