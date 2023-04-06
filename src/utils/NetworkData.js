export default function NetworkData (data) {
  const nodes = [
    { id: 'Severe injury', label: 'Severe injury', x: 0, y: -100, shape: 'image', image: 'crash_type_symbol.svg' },
    { id: 'Moderate injury', label: 'Moderate injury', x: 0, y: 0 },
    { id: 'No injury', label: 'No injury', x: 0, y: 100 },
    { id: 'Daylight', label: 'Daylight', x: -233, y: 189 },
    { id: 'Dawn', label: 'Dawn', x: -100, y: 283 },
    { id: 'Darkness', label: 'Darkness', x: 61, y: 294 },
    { id: 'Dusk', label: 'Dusk', x: 205, y: 219 },
    { id: 'Clear', label: 'Clear', x: 300, y: 0 },
    { id: 'Cloudy', label: 'Cloudy', x: 256, y: -156 },
    { id: 'Rain/Snow', label: 'Rain/Snow', x: 138, y: -266 },
    { id: 'Dry', label: 'Dry', x: -100, y: -283 },
    { id: 'Wet', label: 'Wet', x: -233, y: -189 },
    { id: 'Snow/Ice', label: 'Snow/Ice', x: -297, y: -41 }
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
    const width = 80 * (Math.max(Math.min(lift, 1.2), 0.9) - 0.9) + 3
    // const smooth = (severity === 'Severe injury'
    //   ? { enabled: true, type: 'continuous', roundness: 0.1 }
    //   : severity === 'Moderate injury'
    //     ? { enabled: true, type: 'continuous', roundness: 0.1 }
    //     : { enabled: true, type: 'continuous', roundness: 0.1 })

    edges.push({
      from: condition,
      to: severity,
      label,
      width
      // smooth
    })
  })

  return { nodes, edges }
}
