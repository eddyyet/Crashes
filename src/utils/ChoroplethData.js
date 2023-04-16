export default function filter (data, year, side) {
  const totalCount = {}
  const maxCount = {}

  // Part 1: Calculate total count by SIDE and AREA
  for (let i = 0; i < data.length; i++) {
    const row = data[i]

    if (year[0] <= row.CRASH_YEAR && row.CRASH_YEAR <= year[1]) {
      const groupKey = row.SIDE + '-' + row.COMMUNITY
      if (!totalCount[groupKey]) {
        totalCount[groupKey] = 0
      }
      totalCount[groupKey] += row.count
    }
  }

  // Part 2: Find area with the highest count for each SIDE
  for (const groupKey in totalCount) {
    const [sideKey, areaKey] = groupKey.split('-')
    const count = totalCount[groupKey]

    if (!maxCount[sideKey] || count > maxCount[sideKey].count) {
      maxCount[sideKey] = { area: areaKey, count }
    }
  }

  // Part 3: Format the output
  const result = { totalCount: {}, maxCount: {} }
  if (side === 'All') {
    for (const groupKey in totalCount) {
      const [sideKey] = groupKey.split('-')
      const count = totalCount[groupKey]

      if (!result.totalCount[sideKey]) {
        result.totalCount[sideKey] = 0
      }
      result.totalCount[sideKey] += count
    }

    for (const sideKey in maxCount) {
      const { area, count } = maxCount[sideKey]
      result.maxCount[area] = count
    }
  } else {
    result.totalCount[side] = 0
    for (const groupKey in totalCount) {
      const [sideKey] = groupKey.split('-')
      const count = totalCount[groupKey]

      if (sideKey === side) {
        result.totalCount[side] += count
        const sideMaxCount = maxCount[side]
        if (sideMaxCount) {
          result.maxCount[sideMaxCount.area] = sideMaxCount.count
        }
      }
    }
  }

  return result
}
