// Contact.js

import React from "react";
import { AllContacts } from "../data/AllContacts";
import { AddContact } from "../data/AddContact";

const Contact = () => {
  let [toggleAddContact, setToggleAddContact] = React.useState(false);
  return (
    <div>
      <section className="Contact">
        <h1>This is the Contact page</h1>{" "}
        <button
          onClick={() => {
            setToggleAddContact(!toggleAddContact);
          }}
        >
          Add Contact
        </button>
      </section>

      <AllContacts />
      {toggleAddContact && <AddContact />}
    </div>
  );
};

export default Contact;
