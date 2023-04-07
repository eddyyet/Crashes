import '../format.css'
import SeveritySevere from '../images/severity_severe.svg'
import SeverityModerate from '../images/severity_moderate.svg'
import SeverityNo from '../images/severity_no.svg'
import CarLong150 from '../images/car_top_long_150.svg'
import CarMid190 from '../images/car_top_mid_190.svg'
import CarShort230 from '../images/car_top_short_230.svg'

export default function NetworkData (data) {
  const nodes = [
    { id: 'Severe injury', label: 'Severe injury', font: { vadjust: -81 }, x: -180, y: 0, shape: 'image', image: SeveritySevere, size: 66 },
    { id: 'Moderate injury', label: 'Moderate injury', font: { vadjust: -60 }, x: 0, y: 0, shape: 'image', image: SeverityModerate, size: 44 },
    { id: 'No injury', label: 'No injury', font: { vadjust: -44 }, x: 180, y: 0, shape: 'image', image: SeverityNo, size: 20 },
    { id: 'Daylight', label: 'Daylight', font: { vadjust: -76 }, x: -310, y: -180, shape: 'image', image: CarLong150, size: 39 },
    { id: 'Dawn', label: 'Dawn', font: { vadjust: -76 }, x: -240, y: -210, shape: 'image', image: CarLong150, size: 39 },
    { id: 'Darkness', label: 'Darkness', font: { vadjust: -76 }, x: -170, y: -240, shape: 'image', image: CarLong150, size: 39 },
    { id: 'Dusk', label: 'Dusk', font: { vadjust: -76 }, x: -100, y: -270, shape: 'image', image: CarLong150, size: 39 },
    { id: 'Clear', label: 'Clear', font: { vadjust: -72 }, x: -5, y: -345, shape: 'image', image: CarMid190, size: 27 },
    { id: 'Cloudy', label: 'Cloudy', font: { vadjust: -72 }, x: 60, y: -320, shape: 'image', image: CarMid190, size: 27 },
    { id: 'Rain/Snow', label: 'Rain/Snow', font: { vadjust: -72 }, x: 125, y: -295, shape: 'image', image: CarMid190, size: 27 },
    { id: 'Dry', label: 'Dry', font: { vadjust: -56 }, x: 200, y: -220, shape: 'image', image: CarShort230, size: 37 },
    { id: 'Wet', label: 'Wet', font: { vadjust: -56 }, x: 250, y: -175, shape: 'image', image: CarShort230, size: 37 },
    { id: 'Snow/Ice', label: 'Snow/Ice', font: { vadjust: -56 }, x: 300, y: -130, shape: 'image', image: CarShort230, size: 37 }
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
    const label = lift + 'x'
    const width = 80 * (Math.max(Math.min(lift, 1.3), 0.9) - 0.9) + 3
    const smooth = (severity === 'Severe injury'
      ? { enabled: true, type: 'curvedCW', roundness: 0.08 }
      : severity === 'Moderate injury'
        ? { enabled: true, type: 'continuous', roundness: 0.08 }
        : { enabled: true, type: 'curvedCCW', roundness: 0.08 })

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
