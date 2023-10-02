import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

import '../styles/style.scss';

export function WeatherStation() {
    // Crie um estado para armazenar os dados da API
    const [apiData, setApiData] = useState([]);
    
    // Crie um estado para armazenar as opções do gráfico
    const [chartOptions, setChartOptions] = useState({
        chart: {
            id: 'line-chart',
        },
        xaxis: {
            categories: [0, 2, 4, 6, 10],
            labels: {
                style: {
                    colors: '#fff'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#fff'
                }
            }
        },
        dataLabels: {
            style: {
                colors: ['#9C27B0']
            },
            enabled: true,
        },
    });

    // Use o useEffect para fazer a solicitação à API quando o componente for montado
    useEffect(() => {
        // Faça a solicitação à API Express com a URL completa incluindo o protocolo
        axios.get('http://localhost:3000/data')
            .then(response => {
                // Atualize o estado com os dados da API
                setApiData(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados da API: ', error);
            });
    }, []); // A lista vazia de dependências garante que isso só será executado uma vez quando o componente for montado

    // Resto do seu código...

    return (
        <div className="conteiner">
            <header>
                <p className="title">Temperature detector</p>
            </header>

            <main className="mainCard">
                <div className="card">
                    <p>30°C</p>
                </div>

                <div className="humidityChart">
                    <ReactApexChart
                        options={chartOptions}
                        series={apiData} // Use os dados da API aqui
                        type="line"
                        width={450}
                        height={300}
                    />
                </div>
            </main>
        </div>
    );
}
