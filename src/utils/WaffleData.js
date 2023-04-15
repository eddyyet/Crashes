export default function WaffleData (data) {
  const nivoInputData = []
  const total = Object.values(data).reduce((acc, cur) => acc + cur, 0)
  const colorMap = {
    Fatal: 'hsl(0, 100%, 30%)',
    Incapacitating: 'hsl(10, 100%, 60%)',
    Moderate: 'hsl(20, 80%, 70%)',
    'Not apparent': 'hsl(30, 0%, 80%)',
    'Not injured': 'hsl(140, 20%, 70%)'
  }

  for (const key in data) {
    const percentage = (data[key] / total * 100).toFixed(1) + '%'
    nivoInputData.push({ id: key, label: key, value: data[key], percentage, color: colorMap[key] })
  }

  return { nivoInputData, total }
}
