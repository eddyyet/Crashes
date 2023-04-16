export default function WaffleData (data) {
  const nivoInputData = []
  const totalInvolved = Object.values(data).reduce((acc, cur) => acc + cur, 0)
  const totalInjured = Object.keys(data).filter(key => key !== 'Not injured').reduce((acc, cur) => acc + data[cur], 0)

  const colorMap = {
    Fatal: 'hsl(0, 100%, 40%)',
    Incapacitating: 'hsl(10, 80%, 60%)',
    Moderate: 'hsl(15, 65%, 70%)',
    'Not apparent': 'hsl(25, 20%, 70%)'
  }

  for (const key in data) {
    if (key !== 'Not injured') {
      const percentageToInvolved = (data[key] / totalInvolved * 100).toFixed(1) + '%'
      const percentageToInjured = (data[key] / totalInjured * 100).toFixed(1) + '%'
      nivoInputData.push({ id: key, label: key, value: data[key], percentageToInvolved, percentageToInjured, color: colorMap[key] })
    }
  }

  return { nivoInputData, totalInjured }
}
