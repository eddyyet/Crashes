export default function SankeyData (data) {
  const nodes = []
  const links = []

  Object.keys(data).forEach((key) => {
    const [source, target] = key.split(',')
    const value = data[key]

    if (!nodes.some(node => node.id === source)) {
      nodes.push({ id: source })
    }

    if (!nodes.some(node => node.id === target)) {
      nodes.push({ id: target })
    }

    links.push({ source, target, value })
  })

  return { nodes, links }
}
