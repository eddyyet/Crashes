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
    { id: 'Injured', data: injuredData },
    { id: 'Severe', data: severeData }
  ]

  return nivoInputData
}
