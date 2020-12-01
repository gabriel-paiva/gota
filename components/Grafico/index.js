import { Bar } from 'react-chartjs-2';

export default function Grafico(props) {
  return (
    <Bar
      data={props.dadosGrafico}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true,
              //  stepSize: 5
             }
           }]
          },
      }}
    />
  );
}