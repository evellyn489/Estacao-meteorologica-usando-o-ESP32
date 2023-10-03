import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

import '../styles/style.scss';

export function WeatherStation() {
    const [temperature, setTemperature] = useState(0);
    const [data, setData] = useState({ temperatura: [], umidade: [] });
    
    const options = {
        chart: {
          id: 'real-time-chart',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000,
            },
          },
        },
        xaxis: {
          type: 'datetime',
          categories: [],
        },
        yaxis: [
          {
            labels: {
                style: {
                    colors: '#fff',
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
            opposite: true,
            labels: {
                style: {
                    colors: '#fff',
                },
            },

            title: {
              text: 'Umidade (%)',
              style: {
                color: '#F44336',
                
            },
            },
          },
        ],
        legend: {
          show: true,
        },
      };
      const series = [
        {
          name: 'Temperatura (°C)',
          data: data.temperatura,
          style: {
            color: '#fff',
          },

        },
        {
          name: 'Umidade (%)',
          data: data.umidade,
        },
      ];


    const fetchData = () => {
        axios.get('http://localhost:3000/data')
            .then(response => {
                const responseData = response.data;
                setTemperature(responseData.temperatura)

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

        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/data'); 
            const newData = response.data;
            
            setTemperature(newData.temperatura);
            console.log(data)
            setData((prevData) => ({
                temperatura: [...prevData.temperatura, newData.temperatura],
                umidade: [...prevData.umidade, newData.umidade],
              }));
          } catch (error) {
            console.error('Erro ao buscar temperatura:', error);
          }
        };
    
        const intervalId = setInterval(fetchData, 1000);
    
        return () => clearInterval(intervalId);
    
        fetchData();
      }, []);

    return (
        <div className="conteiner">
            <header>
                <p className="title">Temperature detector</p>
            </header>

            <main className="mainCard">
                <div className="card">
                    <p>{temperature} °C</p>
                </div>

                <div className="humidityChart">
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="line"
                        width={450}
                        height={300}
                    />
                </div>
            </main>
        </div>
    );
}