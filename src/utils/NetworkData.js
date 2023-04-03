const NetworkData = (data) => {
  nodes: [
    { id: "Moderate injury", x: -100, y: 0 },
    { id: "No injury", x: 0, y: 0 },
    { id: "Severe injury", x: 100, y: 0 },
    ...Object.keys(data)
      .map((key, i) => ({
        id: key.split(",")[0],
        label: key.split(",")[0],
        x: 100 * Math.cos(((2 * Math.PI) / (Object.keys(data).length - 3)) * i),
        y: 100 * Math.sin(((2 * Math.PI) / (Object.keys(data).length - 3)) * i),
      }))
  ],
  
}

export default NetworkData