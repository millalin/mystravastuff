import './App.css';
import React, { useState, useEffect } from 'react';


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activities, setActivities] = useState({})

  //Strava cred
  let clientID = process.env.REACT_APP_CLIENT_ID;
  let clientSecret = process.env.REACT_APP_CLIENT_SECRET;

  const refreshToken = process.env.REACT_APP_REFRESHTOKEN;
  const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`
  
  const callActivities = `https://www.strava.com/api/v3/athlete/activities?per_page=200&page=1&access_token=`

  
  useEffect(() => {
    fetch(callRefresh, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(result => getActivities(result.access_token))
  }, [callRefresh])

  function getActivities(access){
      fetch(callActivities + access)
      .then(res => res.json())
      .then(data => setActivities(data), setIsLoading(prev => !prev))
      .catch(e => console.log(e))
  }

  const showActivities = () => {
    if(isLoading) return <>Loading from Strava.. hang in there</>
    if(!isLoading) {
      const activities_array = Object.entries(activities)

      const values = activities_array.map(a => {return a[1]})

      let kayaktravels = values.filter(a => {
        return a.type === 'Kayaking';
    });

    console.log(kayaktravels)

    let kayakingMeters = 0
    kayaktravels.map(kayaking => kayakingMeters = kayakingMeters + kayaking.distance)

      return (<div>
      <h3>Kayaking 2023</h3>
      <div>Total kayaking trips: {kayaktravels.length}</div>
      <div>Total kilometers: {kayakingMeters/1000}</div>
      <div>Total meters: {kayakingMeters}</div> 
      </div>)
    }
  }

  return (
    <div className="App">
      {showActivities()}
    </div>
  );
}

export default App;
