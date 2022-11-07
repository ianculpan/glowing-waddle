import { useState } from "react";
import { AllWip } from "../data/AllWip";

import { ChooseContact } from "../data/contacts/ChooseContact";
import { ChosenContact } from "../data/contacts/ChosenContact";

const Wip = () => {
  function selected(event) {
    console.log(event.target.value);
    setSelectedGuid(event.target.value);
  }
  let [selectedGuid, setSelectedGuid] = useState(false);
  return (
    <div>
      <section className="Wip">
        <h1>WIP Estimates</h1>
      </section>
      <AllWip />
      <ChooseContact selectedAction={selected} />
      {selectedGuid && <ChosenContact chosenContactGuid={selectedGuid} />}
    </div>
  );
};

export default Wip;
