import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Pie } from 'react-chartjs-2';

export class WelcomeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chartData:{}
        }

        this.getChartData = this.getChartData.bind(this)
    }

    componentDidMount(){
        this.getChartData();
    }

    getChartData(){
        // Ajax calls here
        this.setState({
            chartData:{
            labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
            datasets:[
                {
                label:'Population',
                data:[
                    617594,
                    181045,
                    153060,
                    106519,
                    105162,
                    95072
                ],
                backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ]
                }
            ]
            }
        });
    }
    
    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    You can manage your todos <Link to="/todos">here</Link>

                    <Pie data={this.state.chartData} />
                </div>
            </>
        )
    }

}


