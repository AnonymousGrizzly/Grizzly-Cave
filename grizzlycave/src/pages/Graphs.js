import React from 'react';
import {Line, Pie} from 'react-chartjs-2';

export default function Graphs() {
    const dataAct = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "number of stored files",
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    }
    const dataToF = {
        responsive: true,
        labels: [],
        datasets:[
            {
                
                data:[]
            }
        ]
    }

    return (
        <div className="graph-cntnr">
            <div id="ActivitiesGraph">
                <h2>Activities Chart</h2>
                <p>- Take a look at when you were the most/least productive -</p>
                <Line data={dataAct}/>
            </div>
            <div id="TypeOfFilesGraph">
                <h2>Type Of Files Chart</h2>
                <p>- Take a look at what kind of files you stored -</p>
                <Pie data={dataToF}/>
            </div>
            
        </div>
    )
}
