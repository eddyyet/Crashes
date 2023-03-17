// sum up columns other than CRASH_YEAR and SIDE in a JSON file
export default function filter (data, year, side) {
  const result = {}

  for (let i = 0; i < data.length; i++) {
    const row = data[i]

    if ((year[0] <= row.CRASH_YEAR && row.CRASH_YEAR <= year[1]) &&
      (side === '' || row.SIDE === side)) {
      console.log('OK')
      for (const key in row) {
        if (key !== 'CRASH_YEAR' && key !== 'SIDE') {
          if (result[key]) {
            result[key] += row[key]
          } else {
            result[key] = row[key]
          }
        }
      }
    }
  }
  console.log(result)
  return result
}
