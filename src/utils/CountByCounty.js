export default function sumCountByCounty (data) {
  const sumCountByCounty = []

  data.forEach((crashGroup) => {
    const COUNTY = crashGroup.COUNTY
    const count = crashGroup.count

    const index = sumCountByCounty.findIndex((item) => item.COUNTY === COUNTY)

    if (index === -1) {
      sumCountByCounty.push({ COUNTY, count })
    } else {
      sumCountByCounty[index].count += count
    }
  })

  return sumCountByCounty
}
