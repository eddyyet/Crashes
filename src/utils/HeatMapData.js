// export default function HeatMapData (data) {
//   const nivoInputData = []

//   // create an object with keys as day names
//   const days = {}
//   for (const key in data) {
//     const [day, x] = key.split(',')
//     const y = data[key]
//     if (!days[day]) {
//       days[day] = []
//     }
//     days[day].push({ x, y })
//   }

//   // convert the object to the required format
//   for (const day in days) {
//     nivoInputData.push({ id: day, data: days[day] })
//   }

//   return nivoInputData
// }

// export default function HeatMapData (data) {
//   const nivoInputData = Object.entries(data).reduce((acc, [key, value]) => {
//     const [x, id, type] = key.split(',')
//     const y = type === 'Total' ? value : null
//     const injuryRate = type === 'Injured' ? value / data[`${x},${id},Total`] : null
//     const saturation = type === 'Injured' ? (Math.min(Math.max(injuryRate - 0.09, 0) * 20, 0.9) * 100).toFixed(0) + '%' : null
//     const color = type === 'Injured' ? `hsl(10, ${saturation}, 55%)` : null

//     const index = acc.findIndex(d => d.id === id)
//     if (index === -1) {
//       acc.push({ id, data: [{ x, y, injuryRate, color }] })
//     } else {
//       acc[index].data.push({ x, y, injuryRate, color })
//     }
//     return acc
//   }, [])

//   console.log(nivoInputData)
//   return nivoInputData
// }

export default function HeatMapData (data) {
  const output = []
  const groups = {}

  // Group data by id and x
  for (const key in data) {
    const [x, id, type] = key.split(',')
    const value = data[key]

    if (!groups[id]) {
      groups[id] = {}
    }

    if (!groups[id][x]) {
      groups[id][x] = {
        Total: null,
        Injured: null
      }
    }

    groups[id][x][type] = value
  }

  // Transform groups into array of objects
  for (const id in groups) {
    const data = []

    for (const x in groups[id]) {
      const { Total, Injured } = groups[id][x]

      if (Total !== null && Injured !== null) {
        const injuryRate = Injured / Total
        const saturation = (Math.min(Math.max(injuryRate - 0.09, 0) * 20, 0.9) * 100).toFixed(0) + '%'
        const color = `hsl(10, ${saturation}, 55%)`

        data.push({
          x,
          y: Total,
          injuryRate,
          color
        })
      }
    }

    output.push({
      id,
      data
    })
  }

  console.log(output)
  return output
}
