export default function HeatMapData (data) {
  const nivoInputData = []

  // create an object with keys as day names
  const days = {}
  for (const key in data) {
    const [day, x] = key.split(',')
    const y = data[key]
    if (!days[day]) {
      days[day] = []
    }
    days[day].push({ x, y })
  }

  // convert the object to the required format
  for (const day in days) {
    nivoInputData.push({ id: day, data: days[day] })
  }

  return nivoInputData
}
