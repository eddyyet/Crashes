export default function ScatterPlotData (data) {
  const nivoInputData = []
  const combination = {}
  let maxCrashes = -Infinity
  const dayMap = {
    Sun: 'Sunday',
    Mon: 'Monday',
    Tue: 'Tuesday',
    Wed: 'Wednesday',
    Thu: 'Thursday',
    Fri: 'Friday',
    Sat: 'Saturday'
  }

  for (const key in data) {
    const [x, y, type] = key.split(',')
    const value = data[key]
    const dayTime = `${x},${y}`

    if (!combination[dayTime]) {
      combination[dayTime] = { x, y: +y, crashes: 0, injured: 0, injuryRate: 0, radius: 1, color: '', toolTipColor: '', toolTipDay: '', toolTipTime: '' }
    }

    if (type === 'Total') {
      combination[dayTime].crashes = value
      if (value > maxCrashes) { maxCrashes = value }
    } else {
      combination[dayTime].injured = value
    }
  }

  for (const dayTime in combination) {
    combination[dayTime].radius = Math.sqrt(combination[dayTime].crashes / maxCrashes)

    const injuryRateNum = combination[dayTime].injured / combination[dayTime].crashes
    combination[dayTime].injuryRate = (injuryRateNum * 100).toFixed(1) + '%'

    const saturation = (Math.min(Math.max(injuryRateNum - 0.08, 0) * 15, 0.9) * 100).toFixed(0) + '%'
    const alpha = (Math.min(Math.max(injuryRateNum - 0.08, 0) * 10 + 0.15, 0.75) * 100).toFixed(0) + '%'
    combination[dayTime].color = `hsla(10, ${saturation}, 60%, ${alpha})`
    combination[dayTime].toolTipColor = `hsla(10, ${saturation}, 65%, 100%)`

    combination[dayTime].toolTipDay = dayMap[combination[dayTime].x]
    combination[dayTime].toolTipTime = combination[dayTime].y + ':00'

    nivoInputData.push({ id: dayTime, data: [combination[dayTime]] })
  }

  return nivoInputData
}
