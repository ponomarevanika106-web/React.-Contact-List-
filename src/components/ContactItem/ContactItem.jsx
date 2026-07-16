import React, { Component } from "react";
import "./ContactItem.css";

class ContactItem extends Component {
  onEdit = () => {
    this.props.editContact(this.props.contact.id);
  };

  onDelete = (e) => {
    e.stopPropagation();
    this.props.deleteContact(this.props.contact.id);
  };

  render() {
    const { firstName, lastName } = this.props.contact;

    return (
      <div
        className="contact-item"
        onDoubleClick={this.onEdit}
      >
        <span className="contact-name">
          {firstName} {lastName}
        </span>

        <button
          className="delete-btn"
          type="button"
          onClick={this.onDelete}
        >
          ✕
        </button>
      </div>
    );
  }
}

export default ContactItem;