import React from 'react';
import { Line } from "react-chartjs-2";

const LineChart = ({ title, data }) => {
    const lineChartOptions = {
      responsive: true,
      animation: {
        animateScale: true,
        animateRotate: true,
      },
      legend: {
          position: 'top',
      },
      title: {
          display: true,
          text: 'Chart.js Line Chart',
      }
    };

    return (
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{title}</h4>
              <Line data={data} options={lineChartOptions} />
            </div>
          </div>
        </div>
    );
}

export default LineChart;