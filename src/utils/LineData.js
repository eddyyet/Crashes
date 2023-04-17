export default function LineData (data) {
  const injuredData = Object.entries(data)
    .filter(([key, value]) => key.endsWith(',Injured'))
    .map(([key, value]) => {
      const x = key.split(',')[0]
      const y = value === 0 ? 0 : value / data[`${x},Crashes`]
      return { x, y }
    })

  const severeData = Object.entries(data)
    .filter(([key, value]) => key.endsWith(',Severe'))
    .map(([key, value]) => {
      const x = key.split(',')[0]
      const y = value === 0 ? 0 : value / data[`${x},Crashes`]
      return { x, y }
    })

  const nivoInputData = [
    { id: 'Fatal or incapacitating', data: severeData, color: 'hsl(10, 80%, 60%)' },
    { id: 'Injurious', data: injuredData, color: 'hsl(20, 20%, 75%)' }
  ]

  return nivoInputData
}
