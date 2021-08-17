import React from 'react';
import { Bar } from "react-chartjs-2";

const BarChart = ({ title, data }) => {
    const barChartOptions = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                color: "rgba(204, 204, 204,0.1)",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                color: "rgba(204, 204, 204,0.1)",
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      };

    return (
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{title}</h4>
              <Bar data={data} options={barChartOptions} />
            </div>
          </div>
        </div>
    );
}

export default BarChart;
