import './App.css';
import React, { useState, useEffect } from 'react';
import GridLayout from "react-grid-layout";
import clouds from './img/kayaking.jpg'
import evening from './img/kayaking2.jpg'
import chill from './img/kayaking3.jpg'
import boats from './img/kayaking4.jpg'


function App() {
  const [activities, setActivities] = useState({})

  //Strava cred
  let clientID = process.env.REACT_APP_CLIENT_ID;
  let clientSecret = process.env.REACT_APP_CLIENT_SECRET;

  const refreshToken = process.env.REACT_APP_REFRESHTOKEN;
  const callRefresh = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`
  
  const callActivities = `https://www.strava.com/api/v3/athlete/activities?per_page=100&page=1&access_token=`

  const layout = [
    { i: "left", x: 2, y: 2, w: 4, h: 12 },
    { i: "a", x: 6, y: 0, w: 2, h: 6 },
    { i: "b", x: 8, y: 0, w: 2, h: 6 },
    { i: "c", x: 10, y: 0, w: 2, h: 6 },
    { i: "d", x: 6, y: 3, w: 2, h: 6 },
    { i: "e", x: 8, y: 3, w: 2, h: 6 },
    { i: "f", x: 10, y: 3, w: 2, h: 6 },
  ];

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
      .then(data => setActivities(data))
      .catch(e => console.log(e))
  }

  const showActivities = () => {
      const activities_array = Object.entries(activities)

      const values = activities_array.map(a => {return a[1]})

      let kayaktravels = values.filter(a => {
        return a.type === 'Kayaking';
    });

    console.log(kayaktravels)

    let kayakingMeters = 0
    kayaktravels.map(kayaking => kayakingMeters = kayakingMeters + kayaking.distance)

      return (<div>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div className="box" key="left"><img src={boats} alt='boats' height={420} weight={350}></img></div>
        <div className="box" key="a"><img src={chill} alt='chill' height={210} weight={180}></img></div>
        <div className="box" key="b">Total kilometers: {kayakingMeters/1000}</div>
        <div className="box"key="c"><img src={clouds} alt='clouds' height={210} weight={180}></img></div>
        <div className="box" key="d">Total kayaking trips: {kayaktravels.length}</div>
        <div className="box"key="e"><img src={evening} alt='evening' height={210} weight={180}></img></div>
        <div className="box" key="f"> Meters paddeled: {kayakingMeters}</div>

      </GridLayout>
      </div>)
  }

  return (
    <div className="App">
      {showActivities()}
    </div>
  );
}

export default App;
