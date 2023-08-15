import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import db from "../../database/firebase";
import styles from "./Movement.module.scss";
import WardTile from "../WardTile/WardTile";
import { useParams } from "react-router-dom";

const Movement = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      const dataArr = [];
      const docSnap = await getDocs(collection(db, "movement"));

      docSnap.forEach((document) => {
        if (id === "female" && parseInt(document.id) < 17)
          dataArr.push({ ...document.data(), id: document.id });
        if (id === "male" && parseInt(document.id) >= 17)
          dataArr.push({ ...document.data(), id: document.id });
      });

      dataArr.sort((a, b) => parseInt(a.id) - b.id);
      console.log(dataArr);

      setData(dataArr);
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveData = async () => {
    const batch = writeBatch(db);

    data.forEach((element) => {
      const ref = doc(db, "movement", element.id);
      batch.update(ref, element);
    });

    batch.commit();
    alert("Zapisano");
  };

  return (
    <>
      <Navbar />
      <div className={styles.header}>
        <h1>{id === "female" ? "Ruch żeński" : "Ruch męski"}</h1>
        <button type="button" onClick={saveData}>
          Zapisz
        </button>
      </div>
      <div className={styles.container}>
        {data ? (
          data.map((element, key) => {
            return (
              <div className={styles.tile_container} key={key}>
                <div className={styles.container_id}>{element.id}</div>
                <div className={styles.tiles}>
                  {Object.keys(element).map((objKey) => {
                    return objKey !== "id" ? (
                      <WardTile
                        key={`${objKey}${key}`}
                        el={element[objKey]}
                        tileKey={objKey}
                      />
                    ) : null;
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <h3>Ładowanie</h3>
        )}
      </div>
    </>
  );
};

export default Movement;
