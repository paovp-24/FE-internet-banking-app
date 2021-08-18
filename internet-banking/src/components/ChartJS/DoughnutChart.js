import React from 'react';
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = ({ title, descripcion, data }) => {
    const doughnutChartOptions = {
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
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{title}</h4>
              <h5 className="card-text">{descripcion}</h5>
              <Doughnut data={data} options={doughnutChartOptions} />
            </div>
          </div>
        </div>
    );
}

export default DoughnutChart;