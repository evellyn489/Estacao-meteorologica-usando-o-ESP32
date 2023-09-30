import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import '../styles/style.scss';

export function WeatherStation() {
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
    
    const [series, setSeries] = useState([
    {
        name: 'Umidade',
        data: [0, 20, 30, 40, 60],        
    },
    ]);
    
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