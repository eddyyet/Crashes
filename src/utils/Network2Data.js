import '../format.css'
import CarLong150 from '../images/car_top_long_150.svg'
import CarMid190 from '../images/car_top_mid_190.svg'
import CarShort230 from '../images/car_top_short_230.svg'

export default function NetworkData (data) {
  const nodes = [
    { id: 'Daylight', label: 'Daylight', font: { vadjust: -76 }, x: 40, y: 88, shape: 'image', image: CarLong150, size: 39 },
    { id: 'Dawn', label: 'Dawn', font: { vadjust: -76 }, x: -240, y: 132, shape: 'image', image: CarLong150, size: 39 },
    { id: 'Darkness', label: 'Darkness', font: { vadjust: -76 }, x: 40, y: 176, shape: 'image', image: CarLong150, size: 39 },
    { id: 'Dusk', label: 'Dusk', font: { vadjust: -76 }, x: 40, y: 220, shape: 'image', image: CarLong150, size: 39 },
    { id: 'Clear', label: 'Clear', font: { vadjust: -72 }, x: 156, y: 35, shape: 'image', image: CarMid190, size: 27 },
    { id: 'Cloudy', label: 'Cloudy', font: { vadjust: -72 }, x: 192, y: 65, shape: 'image', image: CarMid190, size: 27 },
    { id: 'Rain/Snow', label: 'Rain/Snow', font: { vadjust: 228 }, x: 125, y: 95, shape: 'image', image: CarMid190, size: 27 },
    { id: 'Dry', label: 'Dry', font: { vadjust: -56 }, x: 145, y: 257, shape: 'image', image: CarShort230, size: 37 },
    { id: 'Wet', label: 'Wet', font: { vadjust: -56 }, x: 183, y: 234, shape: 'image', image: CarShort230, size: 37 },
    { id: 'Snow/Ice', label: 'Snow/Ice', font: { vadjust: -56 }, x: 221, y: 211, shape: 'image', image: CarShort230, size: 37 }
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
    const [condition1, condition2, severity] = key.split(',')
    const combination = condition1 + ',' + condition2

    const lift = getLift(combination, severity).toFixed(2)
    const label = lift + 'x'
    const width = 20 * (Math.max(Math.min(lift, 1.6), 0.8) - 0.8) + 4
    const smooth = { enabled: true, type: 'curvedCW', roundness: 0.2 }

    edges.push({
      from: condition1,
      to: condition2,
      label,
      width,
      smooth
    })
  })

  return { nodes, edges }
}
