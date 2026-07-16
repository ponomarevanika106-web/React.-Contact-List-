import React, { Component } from "react";
import "./ContactForm.css";

export default class ContactForm extends Component {
  state = this.createEmptyContact();

  createEmptyContact() {
    return {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.contact.id !== state.id) {
      return {
        ...props.contact,
      };
    }

    return null;
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onClearField = (e) => {
    const input = e.target.parentNode.querySelector("input");

    this.setState({
      [input.name]: "",
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    this.props.saveContact({
      ...this.state,
    });

    if (!this.state.id) {
      this.setState(this.createEmptyContact());
    }
  };

  onContactDelete = () => {
    this.props.deleteContact(this.state.id);

    this.setState(this.createEmptyContact());
  };

  onNewContact = () => {
    this.props.newContact();

    this.setState(this.createEmptyContact());
  };

  render() {
    const { firstName, lastName, email, phone, id } = this.state;

    return (
      <form className="contact-form" onSubmit={this.onFormSubmit}>
        <div className="field">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={this.onInputChange}
          />
          <button type="button" onClick={this.onClearField}>
            ✕
          </button>
        </div>

        <div className="field">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={this.onInputChange}
          />
          <button type="button" onClick={this.onClearField}>
            ✕
          </button>
        </div>

        <div className="field">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.onInputChange}
          />
          <button type="button" onClick={this.onClearField}>
            ✕
          </button>
        </div>

        <div className="field">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={phone}
            onChange={this.onInputChange}
          />
          <button type="button" onClick={this.onClearField}>
            ✕
          </button>
        </div>

        <div className="buttons">
          <button type="button" onClick={this.onNewContact}>
            New
          </button>

          <button type="submit">Save</button>

          {id && (
            <button type="button" onClick={this.onContactDelete}>
              Delete
            </button>
          )}
        </div>
      </form>
    );
  }
}