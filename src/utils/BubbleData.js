export default function BubbleData (data) {
  // find the minimum and maximum count values
  const counts = Object.values(data)
  const minCount = Math.min(...counts)
  const maxCount = Math.max(...counts)

  // convert name fields to elements and add size and opacity properties
  const BubbleData = Object.entries(data).map(([type, count]) => {
    // patch x and y values based on type
    let x, y
    switch (type) {
      case 'Fixed object':
        x = 0.82
        y = 0.26
        break
      case 'Head-on':
        x = 0.74
        y = 0.55
        break
      case 'Other/Unknown':
        x = 0.55
        y = 0.9
        break
      case 'Parked motor vehicle':
        x = 0.21
        y = 0.21
        break
      case 'Pedestrian/Cyclist':
        x = 0.85
        y = 0.68
        break
      case 'Rear-end':
        x = 0.35
        y = 0.61
        break
      case 'Side':
        x = 0.38
        y = 0.45
        break
      case 'Turning/Angle':
        x = 0.57
        y = 0.31
        break
      // extra case for exceptional data
      default:
        x = 0.5
        y = 0.5
    }

    // calculate size and opacity based on count
    const size = ((Math.sqrt(count) - Math.sqrt(minCount)) / (Math.sqrt(maxCount) - Math.sqrt(minCount))) * 80 + 20
    const opacity = ((count - minCount) / (maxCount - minCount)) * 0.5 + 0.5

    // return modified element
    return {
      type,
      count,
      x,
      y,
      size,
      opacity
    }
  })

  return BubbleData
}
