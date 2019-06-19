import React, { Component,Fragment } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import LaunchItems from './LaunchItems';
import Missionkey from './Missionkey'
const LAUNCHES_QUERY=gql`
query LaunchQuery{
    launches{
        flight_number
        mission_name
        launch_date_local
        launch_success
    }
}
`;

export class Launches extends Component {
    render() {
        return (
            <Fragment>
                <h1 className="display-4 my-3">launches</h1>
                <Missionkey/>
                <Query query={LAUNCHES_QUERY}>
                    {
                        ({loading,error,data})=>{
                            if(loading) return <h4>Loading ...</h4>
                            if(error) return console.log(error)
                            
                            return <Fragment>{
                                data.launches.map(launch=>(
                                    <LaunchItems key={launch.flight_number} launch={launch}/>
                                ))
                            }</Fragment>
                        }
                    }
                </Query>
            </Fragment>
        )
    }
}

export default Launches
