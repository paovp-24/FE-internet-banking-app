import React from 'react';
import { Pie } from "react-chartjs-2";

const PieChart = ({ title, descripcion, data }) => {
    const pieChartOptions = {
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
              <Pie data={data} options={pieChartOptions} />
            </div>
          </div>
        </div>
    );
}

export default PieChart;