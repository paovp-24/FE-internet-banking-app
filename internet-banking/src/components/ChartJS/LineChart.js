import React from 'react';
import { Line } from "react-chartjs-2";

const LineChart = ({ title, descripcion, data }) => {
    const lineChartOptions = {
      responsive: true,
      animation: {
        animateScale: true,
        animateRotate: true,
      },
      legend: {
          position: 'top',
      },
    };

    return (
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{title}</h4>
              <h5 className="card-text">{descripcion}</h5>
              <Line data={data} options={lineChartOptions} />
            </div>
          </div>
        </div>
    );
}

export default LineChart;