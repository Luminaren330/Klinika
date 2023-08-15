import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Wards.module.scss";
import db from "../../database/firebase";
import { doc, getDocs, collection, writeBatch } from "firebase/firestore";
import { Link } from "react-router-dom";

const Wards = () => {
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();

  const [originalValues, setOriginalValues] = useState(null);
  const [change, setChange] = useState(false);
  const [wardData, setWardData] = useState(null);

  useEffect(() => {
    async function getWardsData() {
      const dataArr = [];
      const data = await getDocs(collection(db, "wards"));

      data.forEach((document) =>
        dataArr.push({ ...document.data(), id: document.id })
      );

      setWardData(dataArr);
    }

    getWardsData();
  }, []);

  const handleNumberChange = (e, id) => {
    const arr = [...wardData];

    arr.forEach((element) => {
      if (element.id === id) {
        if (e.target.value) element.value = parseInt(e.target.value);
        else element.value = e.target.value;
      }
    });

    setWardData(arr);
  };

  const handleSaveChange = async (e) => {
    const batch = writeBatch(db);

    wardData.forEach((element) => {
      const ref = doc(db, "wards", element.id);
      if (!element.value || element.value < 0) element.value = 0;
      batch.update(ref, { value: element.value });
    });

    batch.commit();
    setChange(false);
  };
  return (
    <>
      <Navbar />
      <div className={styles.wards_container}>
        <h4 className={styles.header}>Organizacja Oddziału</h4>
        <h3 className={styles.under_header}>
          Stan na dzień {day}/{month}/{year}
        </h3>
        {wardData ? (
          <ul className={styles.wards}>
            {wardData.map((element) => {
              const { id, text, value } = element;

              return (
                <li className={styles.text_input} key={id}>
                  {text}:{" "}
                  {change ? (
                    <input
                      className={styles.input_number}
                      type="number"
                      id={id}
                      value={value}
                      onChange={(event) => handleNumberChange(event, id)}
                    ></input>
                  ) : (
                    <p>{value}</p>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div>Ładowanie...</div>
        )}
        {change ? (
          <div className={styles.buttons}>
            <button
              className={styles.accept}
              onClick={(e) => handleSaveChange(e)}
            >
              Akceptuj zmiany
            </button>
            <button
              className={styles.deny}
              onClick={() => {
                setWardData([...originalValues]);
                setChange(false);
              }}
            >
              Odrzuć zmiany
            </button>
          </div>
        ) : (
          <button
            className={styles.edit}
            onClick={() => {
              setOriginalValues(
                wardData.map((element) => {
                  return { ...element };
                })
              );
              setChange(true);
            }}
          >
            Edytuj
          </button>
        )}
        <div className={styles.movement}>
          <Link to={"/wards/female"} className={styles.link}>
            Ruch strona żeńska
          </Link>
          <Link to={"/wards/male"} className={styles.link}>
            Ruch strona męska
          </Link>
        </div>
      </div>
    </>
  );
};

export default Wards;
