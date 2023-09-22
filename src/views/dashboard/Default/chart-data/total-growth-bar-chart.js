// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //

const chartData = {
    height: 480,
    type: 'bar',
    options: {
        chart: {
            id: 'bar-chart',
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%'
            }
        },
        xaxis: {
            type: 'category',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        legend: {
            show: true,
            fontSize: '14px',
            fontFamily: `'Roboto', sans-serif`,
            position: 'bottom',
            offsetX: 20,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: 5
            },
            itemMargin: {
                horizontal: 15,
                vertical: 8
            }
        },
        fill: {
            type: 'solid'
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: true
        }
    },
    series: [
        {
            name: 'Cortado | Cut',
            data: [0, 0, 2, 0, 0, 10, 0, 0, 0, 1, 0, 4]
        },
        {
            name: 'Avariado | Broken',
            data: [2, 1, 2, 34, 6, 4, 2, 21, 6, 6, 1, 2]
        },
        {
            name: 'Amolgado | Scratch',
            data: [1, 5, 3, 11, 5, 7, 5, 3, 10, 20, 1, 10]
        },
        {
            name: 'Dentado | Dent',
            data: [0, 0, 75, 10, 0, 115, 0, 10, 0, 20, 150, 0]
        },
        {
            name: 'Falta | Missing',
            data: [0, 0, 75, 0, 0, 115, 0, 20, 0, 40, 150, 0]
        },
        {
            name: 'Furado | Hole',
            data: [0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0]
        },
        {
            name: 'Outros Danos | Other Damage',
            data: [0, 0, 75, 0, 0, 115, 0, 0, 0, 0, 150, 0]
        }
    ]
};
export default chartData;
