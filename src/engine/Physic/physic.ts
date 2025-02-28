import Rapier from "@dimforge/rapier3d-compat"

await Rapier.init()

const physicGravityCoef = 5
export const physic = new Rapier.World(
	new Rapier.Vector3(0, -9.82 * physicGravityCoef, 0)
)
