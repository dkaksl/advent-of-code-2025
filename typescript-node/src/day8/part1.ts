interface Point {
  id: number
  coordinates: { x: number; y: number; z: number }
}

export const solve = (input: string) => {
  const rows = input.split('\n')
  const junctionBoxes: Point[] = []
  const junctionBoxesByDistance: { distance: number; a: Point; b: Point }[] = []

  for (let id = 0; id < rows.length; id++) {
    const coordinates = rows[id].split(',')
    junctionBoxes.push({
      id,
      coordinates: {
        x: parseInt(coordinates[0]),
        y: parseInt(coordinates[1]),
        z: parseInt(coordinates[2])
      }
    })
  }

  for (let id = 0; id < junctionBoxes.length; id++) {
    const current = junctionBoxes[id]
    const rest = JSON.parse(JSON.stringify(junctionBoxes))
    rest.splice(id, 1)
    const { nearestPoint, distance } = getClosestJunctionBox(current, rest)
    console.log(
      `closest junction box to id ${current.id} (${JSON.stringify(current.coordinates)}) is id ${nearestPoint.id} (${JSON.stringify(nearestPoint.coordinates)}); d: ${distance}`
    )
    if (
      junctionBoxesByDistance.find(
        (x) =>
          [x.a.id, x.b.id].sort().toString() ===
          [current.id, nearestPoint.id].sort().toString()
      )
    ) {
      continue
    } else {
      junctionBoxesByDistance.push({ distance, a: current, b: nearestPoint })
    }
  }
  junctionBoxesByDistance.sort((a, b) => a.distance - b.distance)
  console.log(junctionBoxesByDistance.length)
  console.log(junctionBoxesByDistance)

  const circuits: Array<Set<number>> = []

  for (let i = 0; i < junctionBoxesByDistance.length; i++) {
    console.log(`circuit count: ${circuits.length}`)
    const { a, b } = junctionBoxesByDistance[i]
    const includingCircuits = []
    for (let ii = 0; ii < circuits.length; ii++) {
      if (circuits[ii].has(a.id) || circuits[ii].has(b.id)) {
        includingCircuits.push({ index: ii, circuit: circuits[ii] })
      }
    }

    if (includingCircuits.length === 0) {
      const circuit = new Set<number>()
      circuit.add(a.id)
      circuit.add(b.id)
      circuits.push(circuit)
    } else if (includingCircuits.length === 1) {
      const includingCircuit = circuits[includingCircuits[0].index]
      includingCircuit.add(a.id)
      includingCircuit.add(b.id)
    } else {
      console.log(
        `${includingCircuits.length} circuits contain points ${a.id} or ${b.id} and need to be joined`
      )
      // TODO
    }
  }

  console.log(`got ${circuits.length} circuits`)
  circuits.sort((a, b) => b.size - a.size)
  const topNCircuits = circuits.slice(0, 10)
  for (const c of topNCircuits) {
    console.log(Array.from(c).sort())
  }
  const top3Sizes = circuits.slice(0, 3).map((c) => c.size)
  console.log(`top 3 circuit sizes: ${top3Sizes}`)
  console.log(`answer: ${top3Sizes.reduce((acc, curr) => acc * curr, 1)}`)
}

const getDistance = (a: Point, b: Point) => {
  return Math.sqrt(
    Math.pow(b.coordinates.x - a.coordinates.x, 2) +
      Math.pow(b.coordinates.y - a.coordinates.y, 2) +
      Math.pow(b.coordinates.z - a.coordinates.z, 2)
  )
}

const getClosestJunctionBox = (a: Point, points: Point[]) => {
  const first = points[0]
  let nearestPoint = first
  let nearestDistance = getDistance(a, first)
  for (const point of points.slice(1)) {
    const currentDistance = getDistance(a, point)
    if (currentDistance < nearestDistance) {
      nearestDistance = currentDistance
      nearestPoint = point
    }
  }
  return { nearestPoint, distance: nearestDistance }
}
