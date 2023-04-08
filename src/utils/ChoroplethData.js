export default function filter (data, year, side) {
  const result = {}

  for (let i = 0; i < data.length; i++) {
    const row = data[i]

    if (year[0] <= row.CRASH_YEAR && row.CRASH_YEAR <= year[1]) {
      const groupKey = row.SIDE // use SIDE column as the group key
      if (!result[groupKey]) {
        result[groupKey] = 0 // initialize group sum if it doesn't exist
      }
      for (const key in row) {
        if (key !== 'CRASH_YEAR' && key !== 'SIDE') {
          result[groupKey] += row[key]
        }
      }
    }
  }
  // return the corresponding side result if side is not 'All'
  if (side !== 'All') {
    return { [side]: result[side] || 0 }
  }
  return result
}
