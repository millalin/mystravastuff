import "./App.css";
import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import clouds from "./img/kayaking.jpg";
import evening from "./img/kayaking2.jpg";
import chill from "./img/kayaking3.jpg";
import boats from "./img/kayaking4.jpg";

function App() {
  const [activities, setActivities] = useState({});


  const layout = [
    { i: "left", x: 0, y: 0, w: 4, h: 12 },
    { i: "a", x: 6, y: 0, w: 2, h: 6 },
    { i: "b", x: 8, y: 0, w: 2, h: 6 },
    { i: "c", x: 10, y: 0, w: 2, h: 6 },
    { i: "d", x: 6, y: 3, w: 2, h: 6 },
    { i: "e", x: 8, y: 3, w: 2, h: 6 },
    { i: "f", x: 10, y: 3, w: 2, h: 6 },
    { i: "g", x: 4, y: 0, w: 2, h: 6 },
    { i: "h", x: 4, y: 3, w: 2, h: 6 },
    { i: "i", x: 4, y: 6, w: 2, h: 6 },
  ];

  useEffect(() => {
    fetch('http://localhost:8080/data',{
        method: 'GET',
        header: {
            'Content-Type': 'application/json'
        },
    })
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((e) => console.log(e));
  }, []);


  const showActivities = () => {
    const activities_array = Object.entries(activities);

    const values = activities_array.map((a) => {
      return a[1];
    });

    let kayaktravels = values.filter((a) => {
      return a.type === "Kayaking";
    });

    let kayakingMeters = 0;
    kayaktravels.map(
      (kayaking) => (kayakingMeters = kayakingMeters + kayaking.distance)
    );

    let time = 0;
    kayaktravels.map((kayaking) => (time = time + kayaking.moving_time)); //seconds
    const hours = (time / 60 / 60).toFixed(2);

    let totalTime = 0;
    kayaktravels.map(
      (kayaking) => (totalTime = totalTime + kayaking.elapsed_time)
    );
    const totalHours = (totalTime / 60 / 60).toFixed(2);

    let speedTimes = 0;
    kayaktravels.map(
      (kayaking) => (speedTimes = speedTimes + kayaking.average_speed) //meters per sec
    );
    const avg_speed = ((speedTimes / kayaktravels.length) * 3.6).toFixed(2);

    return (
      <div>
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1200}
        >
          <div className="box" key="left">
            <img src={boats} alt="boats" height={420} weight={350}></img>
          </div>
          <div className="box" key="a">
            <img src={chill} alt="chill" height={210} weight={180}></img>
          </div>
          <div className="box" key="b">
            Total kilometers: {(kayakingMeters / 1000).toFixed(2)}
          </div>
          <div className="box" key="c">
            <img src={clouds} alt="clouds" height={210} weight={180}></img>
          </div>
          <div className="box" key="d">
            Total kayaking trips: {kayaktravels.length}
          </div>
          <div className="box" key="e">
            <img src={evening} alt="evening" height={210} weight={180}></img>
          </div>
          <div className="box" key="f">
            {" "}
            Meters paddeled: {kayakingMeters}
          </div>
          <div className="box" key="g">
            {" "}
            Hours moved: {hours}
          </div>
          <div className="box" key="h">
            {" "}
            Hours used: {totalHours}
          </div>
          <div className="box" key="i">
            {" "}
            Average speed: {avg_speed} km/h
          </div>
        </GridLayout>
      </div>
    );
  };

  return <div className="App">{showActivities()}</div>;
}

export default App;
