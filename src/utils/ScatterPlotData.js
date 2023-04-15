export default function ScatterPlotData (data) {
  const scatterPlotData = []
  const combination = {}

  for (const key in data) {
    const [x, y, type] = key.split(',')
    const value = data[key]
    const dayTime = `${x},${y}`

    if (!combination[dayTime]) {
      combination[dayTime] = { x, y: +y, crashes: 0, injured: 0, injuryRate: 0, color: '' }
    }

    if (type === 'Total') {
      combination[dayTime].crashes = value
    } else {
      combination[dayTime].injured = value
    }
  }

  for (const dayTime in combination) {
    const injuryRateNum = combination[dayTime].injured / combination[dayTime].crashes
    combination[dayTime].injuryRate = (injuryRateNum * 100).toFixed(1) + '%'

    const saturation = (Math.min(Math.max(injuryRateNum - 0.09, 0) * 20, 0.9) * 100).toFixed(0) + '%'
    combination[dayTime].color = `hsl(10, ${saturation}, 55%)`

    scatterPlotData.push(combination[dayTime])
  }

  // const maxCrashes = scatterPlotData.reduce(
  //   (max, obj) => (obj.crashes > max ? obj.crashes : max),
  //   -Infinity
  // )
  // const minCrashes = scatterPlotData.reduce(
  //   (min, obj) => (obj.crashes < min ? obj.crashes : min),
  //   Infinity
  // )

  return { data: scatterPlotData }
}
