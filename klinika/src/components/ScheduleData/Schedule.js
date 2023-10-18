import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Schedule.module.scss";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../database/firebase";
import GlobalContext from "../../context/global";
import { useParams } from "react-router-dom";

const Schedule = (props) => {
  const { id } = useParams();
  const [scheduleArray, setSceduleArray] = useState([]);
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    if (globalContext.scheduleArray.length > 0) {
      const objArr = globalContext.scheduleArray.filter(
        (element) => element.id === id
      )[0];
      const arr = Object.entries(objArr);
      setSceduleArray(arr);
    } else window.location.replace("/schedule");
  }, [id, globalContext.scheduleArray]);
  const [changeSchedule, setChangeSchedule] = useState(false);
  const saveData = async (objData) => {
    const dataToSave = {};
    objData.forEach((element) => (dataToSave[element[0]] = element[1]));
    const ref = doc(db, "schedule", `${dataToSave.id}`);
    await updateDoc(ref, dataToSave);
    setChangeSchedule(false);
    alert("Zmieniono dane");
  };
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        {scheduleArray.length > 0 ? (
          <>
            <h4 className={styles.header}>
              {scheduleArray[scheduleArray.length - 1][1]}
            </h4>
            <div className={styles.center}>
              <table className={styles.table_schedule}>
                <thead className={styles.head}>
                  <tr>
                    <th className={styles.head}>Dzień miesiąca</th>
                    <th className={styles.head}>Oddział</th>
                    <th className={styles.head}>Stacja dializ</th>
                    <th colSpan="2" className={styles.head}>
                      Rakietowa
                    </th>
                  </tr>
                </thead>
                {changeSchedule && (
                  <tbody className={styles.the_body}>
                    {scheduleArray.map((day, key) => {
                      if (day[0] !== "id")
                        return (
                          <tr key={key} className={styles.row}>
                            <td className={styles.td_schedule}>{day[0]}</td>
                            <td className={styles.td_schedule}>
                              <input
                                defaultValue={day[1].oddzial}
                                onChange={(e) =>
                                  (day[1].oddzial = e.target.value)
                                }
                                placeholder="Oddział"
                              />
                            </td>
                            <td className={styles.td_schedule}>
                              <input
                                defaultValue={day[1].stacja_dializ}
                                onChange={(e) =>
                                  (day[1].stacja_dializ = e.target.value)
                                }
                                placeholder="Stacja dializ"
                              />
                            </td>
                            <td className={styles.td_schedule}>
                              <input
                                defaultValue={day[1].rakietowa[0]}
                                onChange={(e) =>
                                  (day[1].rakietowa[0] = e.target.value)
                                }
                                placeholder="Rakietowa 1"
                              />
                            </td>
                            <td className={styles.td_schedule}>
                              <input
                                defaultValue={day[1].rakietowa[1]}
                                onChange={(e) =>
                                  (day[1].rakietowa[1] = e.target.value)
                                }
                                placeholder="Rakietowa 2"
                              />
                            </td>
                          </tr>
                        );
                      else {
                        return <></>;
                      }
                    })}
                  </tbody>
                )}
                {!changeSchedule && (
                  <tbody className={styles.the_body}>
                    {scheduleArray.map((day, key) => {
                      if (day[0] !== "id")
                        return (
                          <tr key={key} className={styles.row}>
                            <td className={styles.td_schedule}>{day[0]}</td>
                            <td className={styles.td_schedule}>
                              <p className={styles.table_content}>
                                {day[1].oddzial}
                              </p>
                            </td>
                            <td className={styles.td_schedule}>
                              <p className={styles.table_content}>
                                {day[1].stacja_dializ}
                              </p>
                            </td>
                            <td className={styles.td_schedule}>
                              <p className={styles.table_content}>
                                {day[1].rakietowa[0]}
                              </p>
                            </td>
                            <td className={styles.td_schedule}>
                              <p className={styles.table_content}>
                                {day[1].rakietowa[1]}
                              </p>
                            </td>
                          </tr>
                        );
                      else return <></>;
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </>
        ) : (
          <div>Ładowanie...</div>
        )}
        {!changeSchedule && (
          <button
            type="button"
            className={styles.edit}
            onClick={() => setChangeSchedule(true)}
          >
            Edytuj
          </button>
        )}
        {changeSchedule && (
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.save}
              onClick={() => saveData(scheduleArray)}
            >
              Zapisz
            </button>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => setChangeSchedule(false)}
            >
              Anuluj
            </button>
          </div>
        )}
        <a href="\schedule" className={styles.goback}>
          <span>Wróć do poprzedniego widoku</span>
        </a>
      </div>
    </>
  );
};

export default Schedule;
