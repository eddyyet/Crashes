export default function ScatterPlotData (data) {
  const nivoInputData = []

  for (const key in data) {
    const [x, y, type] = key.split(',')
    const index = nivoInputData.findIndex(item => item.x === x && item.y === y)
    const value = data[key]

    if (index >= 0) {
      nivoInputData[index][type === 'Total' ? 'crashes' : 'injuryRate'] = value
    } else {
      const item = {
        x: Number(x),
        y: Number(y),
        crashes: 0,
        injuryRate: 0
      }
      item[type === 'Total' ? 'crashes' : 'injuryRate'] = value
      nivoInputData.push(item)
    }
  }

  console.log(nivoInputData)

  const maxCrashes = nivoInputData.reduce(
    (max, obj) => (obj.crashes > max ? obj.crashes : max),
    -Infinity
  )
  const minCrashes = nivoInputData.reduce(
    (min, obj) => (obj.crashes < min ? obj.crashes : min),
    Infinity
  )

  return [{ id: 'ScatterPlotRoot', data: [nivoInputData] }, maxCrashes, minCrashes]
}
