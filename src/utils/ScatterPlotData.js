export default function ScatterPlotData (data) {
  const nivoInputData = []

  // Group data by day and time
  const groups = {}
  for (const key in data) {
    const [day, time, type] = key.split(',')
    const value = data[key]
    const groupKey = `${day},${time}`

    if (!groups[groupKey]) {
      groups[groupKey] = {
        crashes: 0,
        injured: 0
      }
    }

    if (type === 'Total') {
      groups[groupKey].crashes = value
    } else if (type === 'Injured') {
      groups[groupKey].injured = value
    }
  }

  // Transform groups into array of objects
  for (const groupKey in groups) {
    const [day, time] = groupKey.split(',')
    const group = groups[groupKey]
    const injuryRate = group.injured / group.crashes
    const saturation = (Math.min(Math.max(injuryRate - 0.09, 0) * 20, 0.9) * 100).toFixed(0) + '%'
    const color = `hsl(10, ${saturation}, 55%)`

    nivoInputData.push({
      day,
      time: parseInt(time),
      crashes: group.crashes,
      injuryRate,
      color
    })
  }

  const maxCrashes = nivoInputData.reduce(
    (max, obj) => (obj.crashes > max ? obj.crashes : max),
    -Infinity
  )
  const minCrashes = nivoInputData.reduce(
    (min, obj) => (obj.crashes < min ? obj.crashes : min),
    Infinity
  )

  return { nivoInputData, maxCrashes, minCrashes }
}
