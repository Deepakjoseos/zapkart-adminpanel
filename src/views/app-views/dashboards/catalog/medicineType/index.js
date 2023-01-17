import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import MedicineTypeList from './medicineType-list'
import AddMedicineType from './add-medicineType'
import EditMedicineType from './edit-medicineType'
// import Orders from './orders'

const MedicineType = (props) => {
  const { match } = props
  return (
    <Switch>
      <Redirect
        exact
        from={`${match.url}`}
        to={`${match.url}/medicinetype-list`}
      />
      <Route
        path={`${match.url}/add-medicinetype`}
        component={AddMedicineType}
      />
      <Route
        path={`${match.url}/edit-medicinetype/:id`}
        component={EditMedicineType}
      />
      <Route
        path={`${match.url}/medicinetype-list`}
        component={MedicineTypeList}
      />
      {/* <Route path={`${match.url}/orders`} component={Orders} /> */}
    </Switch>
  )
}

export default MedicineType
