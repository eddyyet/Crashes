export default function TreeMapData (data) {
  const groupMap = {
    'Driver-related':
      ['Bicycle advancing legally on red light',
        'Cell phone use other than texting',
        'Disregarding other traffic signs',
        'Disregarding road markings',
        'Disregarding stop sign',
        'Disregarding traffic signals',
        'Disregarding yield sign',
        'Driving on wrong side/wrong way',
        'Driving skills /knowledge /experience',
        'Exceeding authorized speed limit',
        'Exceeding safe speed for conditions',
        'Failing to reduce speed to avoid crash',
        'Failing to yield right-of-way',
        'Following too closely',
        'Had been drinking (not arrested)',
        'Improper backing',
        'Improper lane usage',
        'Improper overtaking/passing',
        'Improper turning/no signal',
        'Motorcycle advancing legally on red light',
        'Operating vehicle in erratic, reckless, careless, negligent or aggressive manner',
        'Passing stopped school bus',
        'Physical condition of driver',
        'Texting',
        'Turning right on red',
        'Under the influence of alcohol/drugs (arrested)'],
    Environment:
      ['Animal',
        'Distraction - from inside vehicle',
        'Distraction - from outside vehicle',
        'Distraction - other electronic device (navigation device, DVD player, etc.)',
        'Evasive action due to animal, object, nonmotorist',
        'Obstructed crosswalks',
        'Related to bus stop',
        'Road construction/maintenance',
        'Road engineering/surface/marking defects',
        'Vision obscured (signs, tree limbs, buildings, etc.)',
        'Weather']
  }

  const groupColor = {
    'Driver-related': '10, 100%, 60%',
    Environment: '40, 70%, 40%',
    'Vehicle condition': '25, 80%, 55%',
    'Not applicable': '15, 10%, 55%',
    'Unable to determine': '0, 0%, 55%'
  }

  const causeDict = {}

  for (const cause in data) {
    const count = data[cause]
    const [originalCause, injuryLevel] = cause.split('|')
    const existingCount = causeDict[originalCause]?.count || 0
    const existingInjuredCount = causeDict[originalCause]?.injuredCount || 0
    causeDict[originalCause] = {
      count: existingCount + count,
      injuredCount: injuryLevel === 'Injured' ? existingInjuredCount + count : existingInjuredCount
    }
  }

  const groups = Object.keys(groupMap).map((group) => ({
    cause: group,
    children: []
  }))

  const topLevelCauses = []

  // find the total of values
  const total = Object.values(causeDict).reduce((acc, val) => acc + val.count, 0)

  for (const originalCause in causeDict) {
    const { count, injuredCount } = causeDict[originalCause]
    const group = Object.keys(groupMap).find((key) => groupMap[key].includes(originalCause))
    const injuredPercentage = injuredCount / count
    const alpha = Math.min(injuredPercentage * 2, 0.8)
    // const alpha = Math.max(Math.sqrt(injuredPercentage), 0.01)
    // const alpha = Math.max(Math.min(injuredPercentage * 2, 0.5) + Math.min(Math.max(injuredPercentage - 0.25, 0) * 0.4, 0.3), 0.01)

    if (group) {
      const color = `hsla(${groupColor[group]}, ${alpha})`
      groups.find((g) => g.cause === group).children.push({
        cause: originalCause,
        count,
        color,
        injuredPercentage
      })
    } else {
      const color = `hsla(${groupColor[originalCause]}, ${alpha})`
      topLevelCauses.push({
        cause: originalCause,
        count,
        color,
        injuredPercentage
      })
    }
  }

  for (const group of groups) {
    group.color = `hsla(${groupColor[group.cause]}, 0.05)`
  }

  return { cause: 'TreeMapRoot', children: [...groups, ...topLevelCauses], total }
}
