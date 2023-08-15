import React, { useContext, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import db from "../../database/firebase";
import GlobalContext from "../../context/global";
import styles from "../Schedule/Schedule.module.scss";

const validateName = (dataArray, inputValue) => {
  let flag = true;
  dataArray.forEach((element) =>
    element.id === inputValue.trim() ? (flag = false) : null
  );
  return flag;
};

const generateSchedule = (id) => {
  const objData = {};

  for (let i = 1; i <= 31; i++) {
    objData[i] = {
      oddzial: null,
      rakietowa: [null, null],
      stacja_dializ: null,
    };
  }

  return {
    id: id,
    ...objData,
  };
};

const addSchedule = async (data) => {
  await setDoc(doc(db, "schedule", `${data}`), generateSchedule(data));
  window.location.reload();
};

const AddSchedule = (props) => {
  const globalContext = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Nazwa grafiku"
          name="name"
          onKeyUp={(e) => setInputValue(e.target.value)}
        />
        <button
          className={styles.add}
          type="button"
          onClick={() =>
            validateName(globalContext.scheduleArray, inputValue)
              ? addSchedule(inputValue)
              : alert("Podany grafik już istnieje")
          }
        >
          Dodaj
        </button>
      </div>
    </>
  );
};

export default AddSchedule;
