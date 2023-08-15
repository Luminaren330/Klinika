import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Schedule.module.scss";
import { getDocs, collection } from "firebase/firestore";
import db from "../../database/firebase";
import GlobalContext from "../../context/global";
import { Link } from "react-router-dom";
import AddSchedule from "../AddSchedule/AddSchedule";

const Schedules = () => {
  const globalContext = useContext(GlobalContext);
  const [addSchedule, setAddSchedule] = useState(false);

  useEffect(() => {
    async function getSchedules() {
      const dataArray = [];
      const data = await getDocs(collection(db, "schedule"));

      data.forEach((document) => {
        dataArray.push({ ...document.data(), id: document.id });
      });

      globalContext.setScheduleArray(dataArray);
    }

    getSchedules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container_schedule}>
        <h4 className={styles.header}>Grafik dyżurowy</h4>
        <div className={styles.card_container}>
          {globalContext.scheduleArray.map((element, key) => {
            return (
              <Link
                key={key}
                to={`/schedules/${element.id}`}
                className={styles.card}
              >
                {element.id}
              </Link>
            );
          })}
        </div>
        <div className={styles.goback}>
          <button
            className={styles.add}
            type="button"
            onClick={() => {
              setAddSchedule(!addSchedule);
            }}
          >
            {addSchedule ? "Ukryj" : "Dodaj grafik"}
          </button>

          {addSchedule ? <AddSchedule /> : null}
        </div>
      </div>
    </>
  );
};

export default Schedules;
