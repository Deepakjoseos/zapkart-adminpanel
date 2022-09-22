/* eslint-disable react/prop-types */
import React from 'react'

const PrescriptionImageSelect = ({
  cur,
  setSelectedPrescriptions,
  selectedPrescriptions,
}) => {
  return (
    <div
      style={{ position: 'relative' }}
      // className={
      //   selectedPrescriptions.includes(cur.url)
      //     ? 'presc-select-cont selected-active'
      //     : 'presc-select-cont'
      // }
    >
      <input
        style={{
          position: 'absolute',
          right: 15,
          top: 0,
          accentColor: '#3BB77E',
          outline: '3px solid #3BB77E',
        }}
        type="checkbox"
        className="form-check-input"
        onChange={() => {
          const prescs = [...selectedPrescriptions]
          // if(e.target.checked) {

          // }

          if (prescs.includes(cur.url || cur)) {
            prescs.splice(prescs.indexOf(cur.url || cur), 1)
          } else {
            prescs.push(cur.url || cur)
          }
          setSelectedPrescriptions(prescs)
        }}
      />

      <div
        role="button"
        // onClick={() => {
        //   const prescs = [...selectedPrescriptions]

        //   if (prescs.includes(cur.url)) {
        //     prescs.splice(prescs.indexOf(cur.url), 1)
        //   } else {
        //     prescs.push(cur.url)
        //   }
        //   setSelectedPrescriptions(prescs)
        // }}
      >
        <img
          className="mr-10"
          src={cur.url || cur}
          alt="pres"
          style={{ height: '100px', width: '100px' }}
        />
        {/* <div className="overlay">
          <a href="#/" className="icon" title="User Profile">
            <i className="fi-rs-check"></i>
          </a>
        </div> */}
      </div>
    </div>
  )
}

export default PrescriptionImageSelect
