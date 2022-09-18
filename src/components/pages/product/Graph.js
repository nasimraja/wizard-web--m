
import {useState} from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js'
ChartJS.register(
  Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler
)
const Graph = () => {
  const [data, setData] = useState(
    {
      labels:[11, 13, 16, 18, 21],
      datasets:[
        {
          label:'First Dataset',
          data:[0.425, .043, .412, .406,.410],
          backgroundColor:'yellow',
          borderColor:'white',
          tension:0.4,
          // fill:true
          // pointStyle:'rect',
          // pointBorderColor:'blue',
        }
      ]
    }
  )
  return (
    <>
      <div className="chart mt-5 text-black-50">
        <Line data={data}>hello</Line>
      </div>
    </>
  )
}

export default Graph
