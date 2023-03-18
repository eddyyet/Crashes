export default function CirclePackingData (data) {
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
        'Driving skills/knowledge/experience',
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

  const groups = Object.keys(groupMap).map((group) => ({
    cause: group,
    children: []
  }))

  const topLevelCauses = []

  for (const cause in data) {
    const count = data[cause]
    const group = Object.keys(groupMap).find((key) => groupMap[key].includes(cause))

    if (group) {
      groups.find((g) => g.cause === group).children.push({ cause, count })
    } else {
      topLevelCauses.push({ cause, count })
    }
  }

  return { cause: 'root', children: [...groups, ...topLevelCauses] }
}
