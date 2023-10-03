import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

import '../styles/style.scss';

export function WeatherStation() {
    const [temperature, setTemperature] = useState(0);
    const [data, setData] = useState({ temperatura: [], umidade: [] });

    const [chartData, setChartData] = useState({
      options: {
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

        }
      },
      series: [
        {
          name: 'Temperatura (°C)',
          data: [],
          style: {
            color: '#fff',
          },

        },
        {
          name: 'Umidade (%)',
          data: [],
        },
      ],
    })
    
  
    useEffect(() => {

        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/data'); 
            const newData = response.data;
            
            setTemperature(newData.temperatura);
            console.log(newData)

            setData((prevData) => ({
              ...prevData,
              temperatura: [...prevData.temperatura, newData.temperatura],
              umidade: [...prevData.umidade, newData.umidade]
            }))
            
            console.log(data)
            setChartData((prevChartData) => ({
              ...prevChartData,
              options: {
                ...prevChartData.options,
                xaxis: {
                  categories: [...prevChartData.options.xaxis.categories, new Date().getTime()],
                },
              },
              
              series: [
                {
                  name: 'Temperatura',
                  data: data.temperatura,
              },
              {
                  name: 'Umidade',
                  data: data.umidade,
              }
              ],
            }));

          console.log(newData)
            
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
                        options={chartData.options}
                        series={chartData.series}
                        type="line"
                        width={450}
                        height={300}
                    />
                </div>
            </main>
        </div>
    );
}