import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

import '../styles/style.scss';

export function WeatherStation() {
    const [temperature, setTemperature] = useState(0);
    const [data, setData] = useState({ temperatura: [], umidade: [] });


    
    const options = {
        chart: {
          id: 'line-chart',
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
          color: '#fff'
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

    useEffect(() => {

        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/data'); 
            const newData = response.data;
            
            setTemperature(newData.temperatura);
            
            setData((prevData) => ({
                temperatura: [...prevData.temperatura, newData.temperatura],
                umidade: [...prevData.umidade, newData.umidade],
              }));
            console.log(data.temperatura)

            const MAX_DATA_POINTS = 240;
            if (data.temperatura.length > MAX_DATA_POINTS) {
            setData((prevData) => ({
                temperatura: prevData.temperatura.slice(0, MAX_DATA_POINTS),
                umidade: prevData.umidade.slice(0, MAX_DATA_POINTS),
            }));
            }

            
          } catch (error) {
            console.error('Erro ao buscar temperatura:', error);
          }
        
        };
    
        const intervalId = setInterval(fetchData, 3000);
    
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