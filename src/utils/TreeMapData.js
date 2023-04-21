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
        'Driving skills / knowledge / experience',
        'Exceeding authorized speed limit',
        'Exceeding safe speed for conditions',
        'Failing to reduce speed to avoid crash',
        'Failing to yield right-of-way',
        'Following too closely',
        'Had been drinking (not arrested)',
        'Improper backing',
        'Improper lane usage',
        'Improper overtaking / passing',
        'Improper turning / no signal',
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
    'Driver-related': '10, 95%, 60%',
    Environment: '40, 70%, 50%',
    'Vehicle condition': '25, 80%, 55%',
    'Not applicable': '15, 10%, 55%',
    'Unable to determine': '0, 0%, 55%'
  }

  const groupTextColor = {
    'Driver-related': '10, 100%, 65%',
    Environment: '40, 70%, 50%',
    'Vehicle condition': '25, 85%, 60%',
    'Not applicable': '15, 15%, 60%',
    'Unable to determine': '0, 0%, 60%'
  }

  const causeDict = {}

  for (const cause in data) {
    const [causeName, injuryLevel] = cause.split('|')
    if (injuryLevel === 'Total') {
      causeDict[causeName] = { count: data[causeName + '|Total'], injuredCount: data[causeName + '|Injured'] || 0 }
    }
  }

  const groups = Object.keys(groupMap).map((group) => ({
    cause: group,
    count: 0,
    injuredCount: 0,
    children: []
  }))

  const topLevelCauses = []

  // find the total of values
  const total = Object.values(causeDict).reduce((acc, val) => acc + val.count, 0)

  for (const cause in causeDict) {
    const { count, injuredCount } = causeDict[cause]
    const group = Object.keys(groupMap).find((key) => groupMap[key].includes(cause))
    const injuryRateNum = count === 0 ? 0 : injuredCount / count
    const injuryRate = (injuryRateNum * 100).toFixed(1) + '%'
    const alpha = Math.min(injuryRateNum * 2.5, 0.8) + 0.01
    const textAlpha = Math.min(alpha + 0.6, 1)
    let nodeTextColor

    if (group) {
      const nodeColor = `hsla(${groupColor[group]}, ${alpha})`
      if (injuryRateNum < 0.2) {
        nodeTextColor = `hsla(${groupTextColor[group]}, ${textAlpha})`
      } else { nodeTextColor = 'rgba(30, 31, 32, 0.4)' }
      const tooltipTitleColor = `hsla(${groupTextColor[group]}, 1)`
      groups.find((g) => g.cause === group).children.push({
        cause,
        count,
        injuryRate,
        nodeColor,
        nodeTextColor,
        tooltipTitleColor
      })

      const groupObj = groups.find((g) => g.cause === group)
      groupObj.count += count
      groupObj.injuredCount += injuredCount
    } else {
      const nodeColor = `hsla(${groupColor[cause]}, ${alpha})`
      if (injuryRateNum < 0.2) {
        nodeTextColor = `hsla(${groupTextColor[cause]}, ${textAlpha})`
      } else { nodeTextColor = 'rgba(30, 31, 32, 0.4)' }
      const tooltipTitleColor = `hsla(${groupTextColor[cause]}, 1)`
      topLevelCauses.push({
        cause,
        count,
        injuryRate,
        nodeColor,
        nodeTextColor,
        tooltipTitleColor
      })
    }
  }

  for (const group of groups) {
    group.injuryRateNum = group.count === 0 ? 0 : group.injuredCount / group.count
    group.injuryRate = (group.injuryRateNum * 100).toFixed(1) + '%'
    group.nodeColor = `hsla(${groupColor[group.cause]}, 0.01)`
    group.nodeTextColor = `hsla(${groupColor[group.cause]}, 1)`
    group.tooltipTitleColor = `hsla(${groupTextColor[group.cause]}, 1)`

    delete group.count
  }

  return { cause: 'TreeMapRoot', children: [...groups, ...topLevelCauses], total }
}
