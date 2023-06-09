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
        y = 0.6
        break
      case 'Other/Unknown':
        x = 0.55
        y = 0.9
        break
      case 'Parked motor vehicle':
        x = 0.21
        y = 0.26
        break
      case 'Pedestrian/Cyclist':
        x = 0.85
        y = 0.72
        break
      case 'Rear-end':
        x = 0.35
        y = 0.75
        break
      case 'Side':
        x = 0.38
        y = 0.52
        break
      case 'Turning/Angle':
        x = 0.57
        y = 0.33
        break
      // extra case for exceptional data
      default:
        x = 0.5
        y = 0.5
    }

    // calculate size and opacity based on count
    const size = ((Math.sqrt(count) - Math.sqrt(minCount)) / (Math.sqrt(maxCount) - Math.sqrt(minCount))) * 0.7 + 0.3
    const opacity = ((count - minCount) / (maxCount - minCount)) * 0.3 + 0.7

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
