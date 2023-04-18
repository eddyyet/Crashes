import '../format/format.css'

export default function NetworkData (data) {
  const nodes = [
    { id: 'Daylight', label: 'Daylight', x: 40, y: 115, group: 'Lighting' },
    { id: 'Dawn', label: 'Dawn', x: 40, y: 170, group: 'Lighting' },
    { id: 'Darkness', label: 'Darkness', x: 40, y: 225, group: 'Lighting' },
    { id: 'Dusk', label: 'Dusk', x: 40, y: 280, group: 'Lighting' },
    { id: 'Clear', label: 'Clear', x: 162, y: 32, group: 'Weather' },
    { id: 'Cloudy', label: 'Cloudy', x: 218, y: 62, group: 'Weather' },
    { id: 'Rain/Snow', label: 'Rain/Snow', x: 274, y: 92, group: 'Weather' },
    { id: 'Dry', label: 'Dry', x: 184, y: 338, group: 'Roadway' },
    { id: 'Wet', label: 'Wet', x: 232, y: 300, group: 'Roadway' },
    { id: 'Snow/Ice', label: 'Snow/Ice', x: 278, y: 262, group: 'Roadway' }
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
    const [condition1, condition2, severity] = key.split(',')
    if (severity !== 'Injured' || key.split(',').length < 3) {
      return // Skip iteration
    }
    const combination = condition1 + ',' + condition2

    const lift = getLift(combination, severity).toFixed(2)
    const label = `${lift}x`
    // const condition1Formatted = conditionFormat[condition1]
    // const condition2Formatted = conditionFormat[condition2]
    // const title = htmlTitle(`${lift}x chance of a crash causing injuries ${condition1Formatted} ${condition2Formatted}.`)
    const width = 20 * (Math.max(Math.min(lift, 1.6), 0.8) - 0.8) + 4
    const smooth = ((['Clear', 'Cloudy', 'Rain/Snow'].includes(condition1) || ['Clear', 'Cloudy', 'Rain/Snow'].includes(condition2))
      ? { enabled: true, type: 'curvedCCW', roundness: 0.1 }
      : { enabled: true, type: 'curvedCW', roundness: 0.1 })
    const hue = lift >= 1 ? 10 : 140
    const saturation = lift >= 1 ? Math.min((lift - 1), 1.6) * 150 : Math.min((1 - lift), 0.2) * 150
    const opacity = lift >= 1 ? Math.min((lift - 1), 1.6) * 0.15 + 0.15 : Math.min((1 - lift), 0.2) * 0.15 + 0.15
    const opacityHover = lift >= 1 ? Math.min((lift - 1), 1.6) * 0.2 + 0.72 : Math.min((1 - lift), 0.2) * 0.2 + 0.72
    const color = `hsl(${hue}, ${saturation}%, 50%, ${opacity})`
    const colorHover = `hsl(${hue}, ${saturation}%, 50%, ${opacityHover})`

    edges.push({
      from: condition1,
      to: condition2,
      label,
      // title,
      width,
      smooth,
      color: { color, hover: colorHover }
    })
  })

  return { nodes, edges }
}
