import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'

const NOTCH_RADIUS = 0.15 // 凹みの半径
const NOTCH_DEPTH = 0.15 // 凹みの深さ

const SEGMENTS = 40 // サイコロオブジェクトの滑らかさ
const EDGE_RADIUS = 0.07 // サイコロオブジェクトの丸み

// サイコロ面の星にあたるくぼみを生成
const notchWave = (v: number) => {
  v = (1 / NOTCH_RADIUS) * v
  v = Math.PI * Math.max(-1, Math.min(1, v))
  return NOTCH_DEPTH * (Math.cos(v) + 1)
}
const notch = (pos: [number, number]) => notchWave(pos[0]) * notchWave(pos[1])

// サイコロの外観モデルを生成
const createBoxGeometry = () => {
  const size = 1 // サイコロのサイズ

  const boxGeometry = new THREE.BoxGeometry(size, size, size, SEGMENTS, SEGMENTS, SEGMENTS)
  const positionAttribute = boxGeometry.attributes.position

  for (let i = 0; i < positionAttribute.count; i++) {
    // 頂点の座標を取得
    let position = new THREE.Vector3().fromBufferAttribute(positionAttribute, i)

    // ダイスのサイズが1であるため、XYZの座標がすべて0.5に近い頂点が角ということになる
    const subCubeHalfSize = 0.5 - EDGE_RADIUS

    // キューブの中心から外に向かうベクトルを生成
    const subCube = new THREE.Vector3(
      Math.sign(position.x),
      Math.sign(position.y),
      Math.sign(position.z)
    ).multiplyScalar(subCubeHalfSize)
    // 頂点がどのサブキューブに属するかを判定
    const addition = new THREE.Vector3().subVectors(position, subCube)

    // 4箇所の角に近い頂点の座標を修正
    if (
      Math.abs(position.x) > subCubeHalfSize &&
      Math.abs(position.y) > subCubeHalfSize &&
      Math.abs(position.z) > subCubeHalfSize
    ) {
      // position is close to box vertex
      // 頂点に近い場合は、サブキューブの中心から頂点に向かうベクトルを正規化して、エッジの半径を掛ける
      addition.normalize().multiplyScalar(EDGE_RADIUS)
      position = subCube.add(addition)
    } else if (Math.abs(position.x) > subCubeHalfSize && Math.abs(position.y) > subCubeHalfSize) {
      // position is close to box edge that's parallel to Z axis
      // X軸に平行なエッジに近い場合
      addition.z = 0
      addition.normalize().multiplyScalar(EDGE_RADIUS)
      position.x = subCube.x + addition.x
      position.y = subCube.y + addition.y
    } else if (Math.abs(position.x) > subCubeHalfSize && Math.abs(position.z) > subCubeHalfSize) {
      // position is close to box edge that's parallel to Y axis
      // Y軸に平行なエッジに近い場合
      addition.y = 0
      addition.normalize().multiplyScalar(EDGE_RADIUS)
      position.x = subCube.x + addition.x
      position.z = subCube.z + addition.z
    } else if (Math.abs(position.y) > subCubeHalfSize && Math.abs(position.z) > subCubeHalfSize) {
      // position is close to box edge that's parallel to X axis
      // Z軸に平行なエッジに近い場合
      addition.x = 0
      addition.normalize().multiplyScalar(EDGE_RADIUS)
      position.y = subCube.y + addition.y
      position.z = subCube.z + addition.z
    }

    const offset = 0.23

    if (position.y === 0.5) {
      position.y -= notch([position.x, position.z])
    } else if (position.x === 0.5) {
      position.x -= notch([position.y + offset, position.z + offset])
      position.x -= notch([position.y - offset, position.z - offset])
    } else if (position.z === 0.5) {
      position.z -= notch([position.x - offset, position.y + offset])
      position.z -= notch([position.x, position.y])
      position.z -= notch([position.x + offset, position.y - offset])
    } else if (position.z === -0.5) {
      position.z += notch([position.x + offset, position.y + offset])
      position.z += notch([position.x + offset, position.y - offset])
      position.z += notch([position.x - offset, position.y + offset])
      position.z += notch([position.x - offset, position.y - offset])
    } else if (position.x === -0.5) {
      position.x += notch([position.y + offset, position.z + offset])
      position.x += notch([position.y + offset, position.z - offset])
      position.x += notch([position.y, position.z])
      position.x += notch([position.y - offset, position.z + offset])
      position.x += notch([position.y - offset, position.z - offset])
    } else if (position.y === -0.5) {
      position.y += notch([position.x + offset, position.z + offset])
      position.y += notch([position.x + offset, position.z])
      position.y += notch([position.x + offset, position.z - offset])
      position.y += notch([position.x - offset, position.z + offset])
      position.y += notch([position.x - offset, position.z])
      position.y += notch([position.x - offset, position.z - offset])
    }

    // 修正した座標を反映
    positionAttribute.setXYZ(i, position.x, position.y, position.z)
  }

  return boxGeometry
}

// 星の底辺として可視化させる内部の立方体を生成
const createInnerGeometry = () => {
  const baseGeometry = new THREE.PlaneGeometry(1 - 2 * EDGE_RADIUS, 1 - 2 * EDGE_RADIUS)
  const offset = 0.48
  return BufferGeometryUtils.mergeGeometries(
    [
      baseGeometry.clone().translate(0, 0, offset),
      baseGeometry.clone().translate(0, 0, -offset),
      baseGeometry
        .clone()
        .rotateX(0.5 * Math.PI)
        .translate(0, -offset, 0),
      baseGeometry
        .clone()
        .rotateX(0.5 * Math.PI)
        .translate(0, offset, 0),
      baseGeometry
        .clone()
        .rotateY(0.5 * Math.PI)
        .translate(-offset, 0, 0),
      baseGeometry
        .clone()
        .rotateY(0.5 * Math.PI)
        .translate(offset, 0, 0),
    ],
    false
  )
}

// サイコロのMeshを生成
export const createDiceMesh = () => {
  const boxMaterialOuter = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
  })
  const boxMaterialInner = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0,
    metalness: 1,
    side: THREE.DoubleSide,
  })

  const diceMesh = new THREE.Group()
  const innerMesh = new THREE.Mesh(createInnerGeometry(), boxMaterialInner)
  const outerMesh = new THREE.Mesh(createBoxGeometry(), boxMaterialOuter)
  outerMesh.castShadow = true
  diceMesh.add(innerMesh, outerMesh)

  return diceMesh
}
