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

  const ScatterPlotSmallCount = (maxCrashes * Math.pow(8 / 32, 2)).toFixed(0)
  const ScatterPlotMidCount = (maxCrashes * Math.pow(20 / 32, 2)).toFixed(0)
  const ScatterPlotLargeCount = maxCrashes

  for (const dayTime in combination) {
    combination[dayTime].radius = Math.sqrt(combination[dayTime].crashes / maxCrashes)

    const injuryRateNum = combination[dayTime].injured / combination[dayTime].crashes
    combination[dayTime].injuryRate = (injuryRateNum * 100).toFixed(1) + '%'

    const saturation = (Math.min(Math.max(injuryRateNum - 0.08, 0) * 15, 0.9) * 100) + '%'
    const lightness = injuryRateNum > 0.14 ? (60 - Math.min(Math.max(injuryRateNum - 0.14, 0), 0.06) * 250) + '%' : '60%'
    const lightnessTooltip = injuryRateNum > 0.14 ? (65 - Math.min(Math.max(injuryRateNum - 0.14, 0), 0.06) * 250) + '%' : '65%'
    const alpha = (Math.min(Math.max(injuryRateNum - 0.08, 0) * 7.5 + 0.15, 0.75) * 100) + '%'
    combination[dayTime].color = `hsla(10, ${saturation}, ${lightness}, ${alpha})`
    combination[dayTime].toolTipColor = `hsla(10, ${saturation}, ${lightnessTooltip}, 100%)`

    combination[dayTime].toolTipDay = dayMap[combination[dayTime].x]
    combination[dayTime].toolTipTime = combination[dayTime].y + ':00'

    nivoInputData.push({ id: dayTime, data: [combination[dayTime]] })
  }

  return { nivoInputData, ScatterPlotSmallCount, ScatterPlotMidCount, ScatterPlotLargeCount }
}
