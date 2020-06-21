import React, { useState, useEffect } from "react";

import { Doughnut, Line } from "react-chartjs-2";

import ChartDataLabels from 'chartjs-plugin-datalabels';


function getTotal(previus, row) {
    return previus + parseInt(row.total_amount);
}

function groupByStatus(previus, row) {
    groupByRowField(previus, row, "status", 0, add);
    return previus;
}

function add(previus) {
    return previus + 1;
}

function groupByRowField(acc, row, field, initialValue, operation) {
    if (typeof acc[row[field]] === 'undefined') {
        acc[row[field]] = initialValue;
    }
    acc[row[field]] = operation(acc[row[field]], row);
}

const colors = ["#e9e04c", "#42c4ea", "#20de3a"];

export default function Charts({ rawData }) {
  const [data, setData] = useState({ status: {}, dates: {} });

  useEffect(() => {
    const values = rawData.reduce((acc, row) => {
      groupByRowField(acc.status, row, "status", 0, getTotal);
      groupByRowField(acc.dates, row, 'creation_date', {}, groupByStatus);
      return acc;
    }, { status: {}, dates: {} });

    const statusData = {
      datasets: [
        {
          data: Object.values(values.status),
          backgroundColor: colors,
          borderColor: colors,
        },
      ],
      labels: Object.keys(values.status),
    };

    const datesData = {
        labels: Object.keys(values.dates),
        datasets: Object.keys(values.status).map( (status, index) => {
            return {
                label: status,
                data: Object.values(values.dates).map(date => date[status]),
                borderColor: colors[index],
                backgroundColor: colors[index],
                lineTension: 0,
                fill: false
            }
        })
    }

    setData({
        status: statusData,
        dates: datesData
    });

  }, [rawData]);

  return (
    <div className="row" style={{ paddingTop: "25px" }}>
      <div class="col-12 col-md-6">
        <Doughnut plugins={[ChartDataLabels]} data={data.status} options={{ cutoutPercentage: 0 }} />
      </div>
      <div class="col-12 col-md-6">
          <Line data={data.dates} options={{ lineTension: 0 }} />
      </div>
    </div>
  );
}
