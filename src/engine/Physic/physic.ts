import Rapier from "@dimforge/rapier3d-compat"

await Rapier.init()

export const physic = new Rapier.World(new Rapier.Vector3(0, -9.82, 0))
