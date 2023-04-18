import SeveritySevere from '../images/severity_severe.png'
import SeverityModerate from '../images/severity_moderate.png'
import SeverityNo from '../images/severity_no.png'

export default function NetworkData (data) {
  const nodes = [
    { id: 'Severe injury', label: 'Severe injury', font: { vadjust: -85 }, x: -180, y: 0, shape: 'image', image: SeveritySevere, size: 66 },
    { id: 'Moderate injury', label: 'Moderate injury', font: { vadjust: -64 }, x: 0, y: 0, shape: 'image', image: SeverityModerate, size: 40 },
    { id: 'No injury', label: 'No injury', font: { vadjust: -48 }, x: 180, y: 0, shape: 'image', image: SeverityNo, size: 18 },
    { id: 'Dusk', label: 'Dusk', x: -310, y: -180, group: 'Lighting' },
    { id: 'Daylight', label: 'Daylight', x: -240, y: -210, group: 'Lighting' },
    { id: 'Dawn', label: 'Dawn', x: -170, y: -240, group: 'Lighting' },
    { id: 'Darkness', label: 'Darkness', x: -100, y: -270, group: 'Lighting' },
    { id: 'Clear', label: 'Clear', x: -5, y: -345, group: 'Weather' },
    { id: 'Cloudy', label: 'Cloudy', x: 60, y: -320, group: 'Weather' },
    { id: 'Rain/Snow', label: 'Rain/Snow', x: 125, y: -295, group: 'Weather' },
    { id: 'Dry', label: 'Dry', x: 200, y: -220, group: 'Roadway' },
    { id: 'Wet', label: 'Wet', x: 250, y: -175, group: 'Roadway' },
    { id: 'Snow/Ice', label: 'Snow/Ice', x: 300, y: -130, group: 'Roadway' }
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

  // const severityFormat = {
  //   'Severe injury': '<b>severe injuries</b>',
  //   'Moderate injury': '<b>moderate injuries</b>',
  //   'No injury': '<b>no injuries</b>'
  // }

  // const conditionFormat = {
  //   Dusk: 'at <b>dusk</b>',
  //   Daylight: 'in <b>daylight</b>',
  //   Dawn: 'at <b>dawn</b>',
  //   Darkness: 'in <b>darkness</b>',
  //   Clear: 'with <b>clear</b> weather',
  //   Cloudy: 'with <b>cloudy</b> weather',
  //   'Rain/Snow': 'with <b>rain/snow</b>',
  //   Dry: 'on a <b>dry</b> roadway',
  //   Wet: 'on a <b>wet</b> roadway',
  //   'Snow/Ice': 'on a roadway with <b>snow/ice</b>'
  // }

  // const htmlTitle = (html) => {
  //   const container = document.createElement('div')
  //   container.innerHTML = html
  //   return container
  // }

  const edges = []
  Object.keys(data).forEach((key) => {
    const [condition, severity] = key.split(',')

    const lift = getLift(condition, severity).toFixed(2)
    const label = lift + 'x'
    // const severityFormatted = severityFormat[severity]
    // const conditionFormatted = conditionFormat[condition]
    // const title = htmlTitle(`${lift}x chance of a crash causing ${severityFormatted} ${conditionFormatted}.`)
    const width = 80 * (Math.max(Math.min(lift, 1.3), 0.9) - 0.9) + 6
    const smooth = (severity === 'Severe injury'
      ? { enabled: true, type: 'curvedCW', roundness: 0.1 }
      : severity === 'Moderate injury'
        ? { enabled: false }
        : { enabled: true, type: 'curvedCCW', roundness: 0.1 })
    const alpha = 0.05 + 0.5 * (Math.max(Math.min(lift, 1.3), 0.9) - 0.9)
    const alphaHover = 0.2 + 1.5 * (Math.max(Math.min(lift, 1.3), 0.9) - 0.9)
    const color = `rgba(204, 204, 204, ${alpha})`
    const colorHover = `rgba(204, 204, 204, ${alphaHover})`

    edges.push({
      from: condition,
      to: severity,
      label,
      // title,
      width,
      smooth,
      color: { color, hover: colorHover }
    })
  })

  return { nodes, edges }
}
