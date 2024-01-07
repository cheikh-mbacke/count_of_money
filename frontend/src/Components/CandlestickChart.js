import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const CandlestickChart = ({ data }) => {
    const [options, setOptions] = useState({
        chart: {
            type: 'candlestick',
            height: 350,
        },
        title: {
            text: 'Candlestick Chart',
            style: {
                color: '#FFFFFF',
            },
        },
        xaxis: {
            type: 'datetime',
            labels: {
                style: {
                    fontSize: '1rem', // Ajustez la taille de la police selon vos préférences
                    color: '#FFFFFF', // Choisissez une couleur de texte lisible
                },
            },
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
            labels: {
                style: {
                    fontSize: '1rem', // Ajustez la taille de la police selon vos préférences
                    color: '#FFFFFF', // Choisissez une couleur de texte lisible
                },
            },
        },
    });

    const [series, setSeries] = useState([
        {
            data: data.map(item => ({
                x: new Date(item[0]),
                y: [item[1], item[2], item[3], item[4]],
            })),
        },
    ]);

    useEffect(() => {
        setSeries([
            {
                data: data.map(item => ({
                    x: new Date(item[0]),
                    y: [item[1], item[2], item[3], item[4]],
                })),
            },
        ]);
    }, [data]);

    return (
        <div className="">
            <Chart
                options={options}
                series={series}
                type="candlestick"
                height={350}
            />
        </div>

    );
};

export default CandlestickChart;
