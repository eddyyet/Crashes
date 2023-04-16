export default function BarData (data) {
  const nivoInputData = []
  const totalInjured = Object.keys(data).filter(key => key !== 'Not injured').reduce((acc, cur) => acc + data[cur], 0)
  const totalNotInjured = data['Not injured']
  const totalInvolved = Object.values(data).reduce((acc, cur) => acc + cur, 0)

  nivoInputData.push({
    Injured: totalInjured,
    InjuredPercentage: (totalInjured / totalInvolved * 100).toFixed(1) + '%',
    InjuredColor: 'hsl(10, 75%, 60%)',
    'Not injured': totalNotInjured,
    'Not injuredPercentage': (totalNotInjured / totalInvolved * 100).toFixed(1) + '%',
    'Not injuredColor': 'hsl(0, 0%, 50%)'
  })

  return { nivoInputData, totalInvolved }
}
