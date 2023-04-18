export default function WaffleData (data) {
  const nivoInputData = []
  const totalInvolved = Object.values(data).reduce((acc, cur) => acc + cur, 0)
  const totalInjured = Object.keys(data).filter(key => key !== 'Not injured').reduce((acc, cur) => acc + data[cur], 0)

  const colorMap = {
    Dead: 'hsl(0, 95%, 40%)',
    Incapacitated: 'hsl(7, 80%, 64%)',
    'Moderately injured': 'hsl(11, 65%, 68%)',
    'Injured but not apparent': 'hsl(15, 25%, 75%)'
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
