import '../format.css'
import CarLong150 from '../images/car_top_long_150.svg'
import CarMid190 from '../images/car_top_mid_190.svg'
import CarShort230 from '../images/car_top_short_230.svg'

export default function NetworkData (data) {
  const nodes = [
    { id: 'Severe injury', x: -180, y: 0 },
    { id: 'Moderate injury', x: 0, y: 0 },
    { id: 'No injury', x: 180, y: 0 },
    { id: 'Daylight', x: -310, y: -180, shape: 'image', image: CarLong150, size: 40 },
    { id: 'Dawn', x: -240, y: -210, shape: 'image', image: CarLong150, size: 40 },
    { id: 'Darkness', x: -170, y: -240, shape: 'image', image: CarLong150, size: 40 },
    { id: 'Dusk', x: -100, y: -270, shape: 'image', image: CarLong150, size: 40 },
    { id: 'Clear', x: -10, y: -345, shape: 'image', image: CarMid190, size: 28 },
    { id: 'Cloudy', x: 50, y: -320, shape: 'image', image: CarMid190, size: 28 },
    { id: 'Rain/Snow', x: 110, y: -295, shape: 'image', image: CarMid190, size: 28 },
    { id: 'Dry', x: 200, y: -220, shape: 'image', image: CarShort230, size: 37 },
    { id: 'Wet', x: 250, y: -180, shape: 'image', image: CarShort230, size: 37 },
    { id: 'Snow/Ice', x: 300, y: -140, shape: 'image', image: CarShort230, size: 37 }
    // { id: 'Severe injury', x: 0, y: -100 },
    // { id: 'Moderate injury', x: 0, y: 0 },
    // { id: 'No injury', x: 0, y: 100 },
    // { id: 'Daylight', x: -233, y: 189, shape: 'image', image: CarLong },
    // { id: 'Dawn', x: -100, y: 283, shape: 'image', image: CarLong },
    // { id: 'Darkness', x: 61, y: 294, shape: 'image', image: CarLong },
    // { id: 'Dusk', x: 205, y: 219, shape: 'image', image: CarLong },
    // { id: 'Clear', x: 300, y: 0, shape: 'image', image: CarMid },
    // { id: 'Cloudy', x: 256, y: -156, shape: 'image', image: CarMid },
    // { id: 'Rain/Snow', x: 138, y: -266, shape: 'image', image: CarMid },
    // { id: 'Dry', x: -100, y: -283, shape: 'image', image: CarShort },
    // { id: 'Wet', x: -233, y: -189, shape: 'image', image: CarShort },
    // { id: 'Snow/Ice', x: -297, y: -41, shape: 'image', image: CarShort }
  ]

  const totalCrashes = Object.values(data).reduce((acc, val) => acc + val, 0)

  const getLift = (condition, severity) => {
    const conditionCrashes = Object.entries(data)
      .filter(([key]) => key.startsWith(condition))
      .reduce((acc, [, value]) => acc + value, 0)
    const severityCrashes = Object.entries(data)
      .filter(([key]) => key.endsWith(severity))
      .reduce((acc, [, value]) => acc + value, 0)
    return (data[`${condition},${severity}`] / conditionCrashes) / (severityCrashes / totalCrashes)
  }

  const edges = []
  Object.keys(data).forEach((key) => {
    const [condition, severity] = key.split(',')

    const lift = getLift(condition, severity).toFixed(2)
    const label = lift
    const width = 80 * (Math.max(Math.min(lift, 1.3), 0.9) - 0.9) + 3
    const smooth = (severity === 'Severe injury'
      ? { enabled: true, type: 'curvedCW', roundness: 0.06 }
      : severity === 'Moderate injury'
        ? { enabled: true, type: 'continuous', roundness: 0.06 }
        : { enabled: true, type: 'curvedCCW', roundness: 0.06 })

    edges.push({
      from: condition,
      to: severity,
      label,
      width,
      smooth
    })
  })

  return { nodes, edges }
}
