import { writeFileSync } from 'node:fs'

interface Point {
  id: string
  coordinates: { x: number; y: number; z: number }
}

export const solve = (input: string) => {
  const rows = input.split('\n')
  const junctionBoxes = getCoordinates(rows)

  const junctionBoxesByDistance = getPairsByDistance(junctionBoxes)
  for (const pairs of junctionBoxesByDistance.slice(0, 10)) {
    console.log(`${pairs.a.id};\t${pairs.b.id};\t${pairs.distance}`)
  }

  const circuits: Array<Set<string>> = []

  for (let i = 0; i < junctionBoxesByDistance.length; i++) {
    const { a, b } = junctionBoxesByDistance[i]
    const includingCircuit = circuits.find((c) => c.has(a.id) || c.has(b.id))

    if (includingCircuit) {
      includingCircuit.add(a.id)
      includingCircuit.add(b.id)
    } else {
      const circuit = new Set<string>()
      circuit.add(a.id)
      circuit.add(b.id)
      circuits.push(circuit)
    }
  }
  console.log(`got ${circuits.length} circuits`)
  circuits.sort((a, b) => b.size - a.size)
  const output = circuits
    .map((c) =>
      Array.from(c)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .join('\t')
    )
    .join('\n')
  writeFileSync('output.txt', output)
  const top3Sizes = circuits.slice(0, 3).map((c) => c.size)
  console.log(`top 3 circuit sizes: ${top3Sizes}`)
  console.log(`answer: ${top3Sizes.reduce((acc, curr) => acc * curr, 1)}`)
}

const getCoordinates = (rows: string[]) => {
  const junctionBoxes = []
  for (let i = 0; i < rows.length; i++) {
    const coordinates = rows[i].split(',')
    junctionBoxes.push({
      id: rows[i],
      coordinates: {
        x: parseInt(coordinates[0]),
        y: parseInt(coordinates[1]),
        z: parseInt(coordinates[2])
      }
    })
  }
  return junctionBoxes
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

const getPairsByDistance = (boxes: Array<Point>) => {
  const junctionBoxesByDistance: { distance: number; a: Point; b: Point }[] = []

  for (let id = 0; id < boxes.length; id++) {
    const current = boxes[id]
    const rest = JSON.parse(JSON.stringify(boxes))
    rest.splice(id, 1)
    const { nearestPoint, distance } = getClosestJunctionBox(current, rest)

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
  return junctionBoxesByDistance
}
