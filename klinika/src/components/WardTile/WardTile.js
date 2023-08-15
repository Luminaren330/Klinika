import React from 'react'
import styles from './WardTile.module.scss'

const WardTile = (props) => {
  const el = props.el;
  const key = props.tileKey

  const handleChange = (event, element) => {
    el[element] = event.target.value;
  }
  
  return (
    <div key={key} className={styles.tiles}>
      <input type="text" defaultValue={el.com_1} className={styles.com} onChange={(e) => handleChange(e, 'com_1')}/>
      <div className={styles.com_u}>{key}</div>
      <input type="text" defaultValue={el.com_u} className={styles.com_u} onChange={(e) => handleChange(e, 'com_u')} />
      <div className={styles.patient_data}>
        <input type="text" defaultValue={el.patient_name}  onChange={(e) => handleChange(e, 'patient_name')}/>
        <div className="numer" style={{display: 'flex'}}>
          <input type="text" defaultValue={el.patient_number}  onChange={(e) => handleChange(e, 'patient_number')}/>
          <input type="text" defaultValue={el.dr_name} onChange={(e) => handleChange(e, 'dr_name')}/>
        </div>
      </div>
      <div className={styles.comments}>
        <input type="text" className={styles.com_2} defaultValue={el.com_2} onChange={(e) => handleChange(e, 'com_2')}/>
        <input type="text" className={styles.com_3} defaultValue={el.com_3} onChange={(e) => handleChange(e, 'com_3')}/>
      </div>
      <input type="text" defaultValue={el.com_4} className={styles.com} onChange={(e) => handleChange(e, 'com_4')}/>
      
    </div>
  )
}

export default WardTile