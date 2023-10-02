import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

import '../styles/style.scss';

export function WeatherStation() {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            id: 'line-chart',
        },
        xaxis: {
            categories: [],
            labels: {
                style: {
                    colors: '#fff',
                },
            },
        },
        yaxis: [
            {
                labels: {
                    style: {
                        colors: '#9C27B0',
                    },
                },
                title: {
                    text: 'Temperatura (°C)',
                    style: {
                        color: '#9C27B0',
                    },
                },
            },
            {
                labels: {
                    style: {
                        colors: '#F44336',
                    },
                },
                opposite: true,
                title: {
                    text: 'Umidade (%)',
                    style: {
                        color: '#F44336',
                    },
                },
            },
        ],
        dataLabels: {
            style: {
                colors: ['#9C27B0'],
            },
            enabled: true,
        },
        series: [
            {
                name: 'Temperatura',
                data: [],
                type: 'line',
                yaxisIndex: 0,
            },
            {
                name: 'Umidade',
                data: [],
                type: 'line',
                yaxisIndex: 1,
            }
        ],
    });

    const readTemperature = () => {
        axios.get('http://localhost:3000/data')
            .then(response => {
                const responseData = response.data;

                return responseData.temperatura;
            })
    }


    const fetchData = () => {
        axios.get('http://localhost:3000/data')
            .then(response => {
                const responseData = response.data;

                let categories = [];
                let temperatureData = [];
                let umidadeData = [];
                let tempoData = [];

                if (responseData && typeof responseData === 'object') {
                    if (responseData.tempo) {
                        categories.push(responseData.tempo);
                    }
                    temperatureData = [responseData.temperatura];
                    umidadeData = [responseData.umidade];
                    tempoData = [responseData.tempo];
                } else {
                    console.error('Formato de dados inesperado: ', responseData);
                }

                setChartOptions(prevOptions => ({
                    ...prevOptions,
                    xaxis: {
                        ...prevOptions.xaxis,
                        categories: categories,
                    },
                    series: [
                        {
                            name: 'Temperatura',
                            data: temperatureData,
                        },
                        {
                            name: 'Umidade',
                            data: umidadeData,
                        }
                    ],
                }));
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API: ', error);
            });
    };

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 30000); // 300000 milissegundos = 5 minutos

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="conteiner">
            <header>
                <p className="title">Temperature detector</p>
            </header>

            <main className="mainCard">
                <div className="card">
                    <p>{readTemperature}</p>
                </div>

                <div className="humidityChart">
                    <ReactApexChart
                        options={chartOptions}
                        series={chartOptions.series}
                        type="line"
                        width={450}
                        height={300}
                    />
                </div>
            </main>
        </div>
    );
}