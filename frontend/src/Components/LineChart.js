import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const LineChart = ({ data }) => {
    const [options, setOptions] = useState({
        chart: {
            id: "line-chart",
            type: "line",
            height: 350,
        },
        title: {
            text: 'Line Chart',
            style: {
                color: '#FFFFFF',
            },
        },
        xaxis: {
            type: "datetime",
        },
    });

    const [series, setSeries] = useState([
        {
            name: "Price",
            data: data,
        },
    ]);

    useEffect(() => {
        setSeries([
            {
                name: "Price",
                data: data,
            },
        ]);
    }, [data]);

    return (
        <div className="">
            <Chart options={options} series={series} type="line" height={350} />
        </div>
    );
};

export default LineChart;