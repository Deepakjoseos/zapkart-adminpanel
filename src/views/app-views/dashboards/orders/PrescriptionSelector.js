/* eslint-disable react/prop-types */
import React from 'react'
import './prescription.css'

const PrescriptionSelector = ({
  cur,
  setSelectedPrescriptions,
  selectedPrescriptions,
}) => {
  console.log(selectedPrescriptions, 'curddd')

  return (
    // <div>
    // <img
    //   className="mr-2"
    //   src={cur}
    //   alt="pres"
    //   style={{ height: '100px', width: '100px' }}
    // />
    // </div>
    <div
      className={
        selectedPrescriptions.includes(cur)
          ? 'presc-select-cont selected-active'
          : 'presc-select-cont'
      }
    >
      <div
        role="button"
        onClick={() => {
          const prescs = [...selectedPrescriptions]

          if (prescs.includes(cur)) {
            prescs.splice(prescs.indexOf(cur), 1)
          } else {
            prescs.push(cur)
          }
          setSelectedPrescriptions(prescs)
        }}
      >
        <img
          className="mr-10"
          src={cur}
          alt="pres"
          style={{ height: '100px', width: '100px' }}
        />
        <div className="overlay">
          <a href="#/" className="icon" title="User Profile">
            <i className="fi-rs-check"></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default PrescriptionSelector
