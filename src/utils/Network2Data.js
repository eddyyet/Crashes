import '../format.css'
import CarLong90 from '../images/car_top_long_90.svg'
import CarMid210 from '../images/car_top_mid_210.svg'
import CarShort320 from '../images/car_top_short_320.svg'

export default function NetworkData (data) {
  const nodes = [
    { id: 'Daylight', label: 'Daylight', font: { vadjust: -34 }, x: 40, y: 104, shape: 'image', image: CarLong90, size: 18 },
    { id: 'Dawn', label: 'Dawn', font: { vadjust: -34 }, x: 40, y: 156, shape: 'image', image: CarLong90, size: 18 },
    { id: 'Darkness', label: 'Darkness', font: { vadjust: -34 }, x: 40, y: 208, shape: 'image', image: CarLong90, size: 18 },
    { id: 'Dusk', label: 'Dusk', font: { vadjust: -34 }, x: 40, y: 260, shape: 'image', image: CarLong90, size: 18 },
    { id: 'Clear', label: 'Clear', font: { vadjust: -52 }, x: 162, y: 36, shape: 'image', image: CarMid210, size: 27 },
    { id: 'Cloudy', label: 'Cloudy', font: { vadjust: -52 }, x: 210, y: 62, shape: 'image', image: CarMid210, size: 27 },
    { id: 'Rain/Snow', label: 'Rain/Snow', font: { vadjust: -52 }, x: 258, y: 88, shape: 'image', image: CarMid210, size: 27 },
    { id: 'Dry', label: 'Dry', font: { vadjust: -44 }, x: 174, y: 310, shape: 'image', image: CarShort320, size: 27 },
    { id: 'Wet', label: 'Wet', font: { vadjust: -44 }, x: 218, y: 280, shape: 'image', image: CarShort320, size: 27 },
    { id: 'Snow/Ice', label: 'Snow/Ice', font: { vadjust: -44 }, x: 262, y: 250, shape: 'image', image: CarShort320, size: 27 }
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
    const hue = lift >= 1 ? 10 : 140
    const saturation = lift >= 1 ? Math.min((lift - 1), 1.6) * 150 : Math.min((1 - lift), 0.2) * 150
    const color = `hsl(${hue}, ${saturation}%, 60%, 0.15)`
    const colorHover = `hsl(${hue}, ${saturation}%, 60%, 0.7)`

    edges.push({
      from: condition1,
      to: condition2,
      label,
      width,
      smooth,
      color: { color, hover: colorHover }
    })
  })

  return { nodes, edges }
}
