const NetworkData = (data) => {
  nodes: [
    { id: "Moderate injury", label: "Moderate injury", x: 0, y: 0 },
    { id: "No injury", label:  "No injury", x: 0, y: 100 },
    { id: "Severe injury", label: "Severe injury", x: 0, y: -100 },
    ...Object.keys(data)
      .map((key, i) => ({
        id: key.split(",")[0],
        label: key.split(",")[0],
        x: 300 * Math.cos(((2 * Math.PI) / (Object.keys(data).length - 3)) * i),
        y: 300 * Math.sin(((2 * Math.PI) / (Object.keys(data).length - 3)) * i),
      }))
  ],
  
}

export default NetworkData