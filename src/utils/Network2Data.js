import '../format.css'
import CarLong90 from '../images/car_top_long_90.svg'
import CarMid210 from '../images/car_top_mid_210.svg'
import CarShort320 from '../images/car_top_short_320.svg'

export default function NetworkData (data) {
  const nodes = [
    { id: 'Daylight', label: 'Daylight', font: { vadjust: -34 }, x: 40, y: 88, shape: 'image', image: CarLong90, size: 18 },
    { id: 'Dawn', label: 'Dawn', font: { vadjust: -34 }, x: 40, y: 132, shape: 'image', image: CarLong90, size: 18 },
    { id: 'Darkness', label: 'Darkness', font: { vadjust: -34 }, x: 40, y: 176, shape: 'image', image: CarLong90, size: 18 },
    { id: 'Dusk', label: 'Dusk', font: { vadjust: -34 }, x: 40, y: 220, shape: 'image', image: CarLong90, size: 18 },
    { id: 'Clear', label: 'Clear', font: { vadjust: -52 }, x: 156, y: 35, shape: 'image', image: CarMid210, size: 27 },
    { id: 'Cloudy', label: 'Cloudy', font: { vadjust: -52 }, x: 192, y: 65, shape: 'image', image: CarMid210, size: 27 },
    { id: 'Rain/Snow', label: 'Rain/Snow', font: { vadjust: -52 }, x: 228, y: 95, shape: 'image', image: CarMid210, size: 27 },
    { id: 'Dry', label: 'Dry', font: { vadjust: -44 }, x: 145, y: 257, shape: 'image', image: CarShort320, size: 27 },
    { id: 'Wet', label: 'Wet', font: { vadjust: -44 }, x: 183, y: 234, shape: 'image', image: CarShort320, size: 27 },
    { id: 'Snow/Ice', label: 'Snow/Ice', font: { vadjust: -44 }, x: 221, y: 211, shape: 'image', image: CarShort320, size: 27 }
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
    if (severity !== 'Injured' || key.split(',').length < 3) {
      return // Skip iteration
    }
    const combination = condition1 + ',' + condition2

    const lift = getLift(combination, severity).toFixed(2)
    const label = lift + 'x'
    const width = 20 * (Math.max(Math.min(lift, 1.6), 0.8) - 0.8) + 4
    const smooth = ((['Clear', 'Cloudy', 'Rain/Snow'].includes(condition1) || ['Clear', 'Cloudy', 'Rain/Snow'].includes(condition2))
      ? { enabled: true, type: 'curvedCCW', roundness: 0.1 }
      : { enabled: true, type: 'curvedCW', roundness: 0.1 })

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
