import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import PayoutList from './payout-list';

const Payout = (props) => {
    const {match} = props;
    return(
        <Switch>
            <Redirect exact from={`${match.url}`} to={`${match.url}/payout-list`} />
            <Route path={`${match.url}/payout-list`} component={PayoutList}/>
        </Switch>
    )
}

export default Payout