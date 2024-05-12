import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js'

interface useDiceParams {
  canvasWrapper: RefObject<HTMLDivElement> | null
}

const params = {
  segments: 50,
  edgeRadius: 0.07,
  notchRadius: 0.15,
  notchDepth: 0.1,
  showOuterMesh: true,
  showInnerMesh: true,
  showOuterWireFrame: false,
}

export const useDice = ({ canvasWrapper }: useDiceParams) => {
  const renderer = useRef<THREE.WebGLRenderer | null>(null)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  const diceMesh = useRef<THREE.Group | null>(null)

  const boxMaterialOuter = useRef<THREE.MeshStandardMaterial | null>(null)
  const boxMaterialOuterWireFrame = useRef<THREE.MeshNormalMaterial | null>(null)

  // ダイスのMeshを生成
  const createDiceMesh = () => {
    boxMaterialOuterWireFrame.current = new THREE.MeshNormalMaterial({
      wireframe: true,
    })
    boxMaterialOuter.current = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      visible: params.showOuterMesh,
    })
    const boxMaterialInner = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0,
      metalness: 1,
      visible: params.showInnerMesh,
      side: THREE.DoubleSide,
    })

    diceMesh.current = new THREE.Group()
    const innerMesh = new THREE.Mesh(createInnerGeometry(), boxMaterialInner)
    const outerMesh = new THREE.Mesh(
      createBoxGeometry(),
      params.showOuterWireFrame ? boxMaterialOuterWireFrame.current : boxMaterialOuter.current
    )
    diceMesh.current.add(innerMesh, outerMesh)
    scene.add(diceMesh.current)
  }

  // サイコロ面のくぼみを生成
  const notchWave = (v: number) => {
    v = (1 / params.notchRadius) * v
    v = Math.PI * Math.max(-1, Math.min(1, v))
    return params.notchDepth * (Math.cos(v) + 1)
  }
  const notch = (pos: [number, number]) => notchWave(pos[0]) * notchWave(pos[1])

  // 箱を作成
  const createBoxGeometry = () => {
    const size = 1 // サイコロのサイズ

    const boxGeometry = new THREE.BoxGeometry(
      size,
      size,
      size,
      params.segments,
      params.segments,
      params.segments
    )
    const positionAttribute = boxGeometry.attributes.position

    for (let i = 0; i < positionAttribute.count; i++) {
      // 頂点の座標を取得
      let position = new THREE.Vector3().fromBufferAttribute(positionAttribute, i)

      // ダイスのサイズが1であるため、XYZの座標がすべて0.5に近い頂点が角ということになる
      const subCubeHalfSize = 0.5 - params.edgeRadius

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
        addition.normalize().multiplyScalar(params.edgeRadius)
        position = subCube.add(addition)
      } else if (Math.abs(position.x) > subCubeHalfSize && Math.abs(position.y) > subCubeHalfSize) {
        // position is close to box edge that's parallel to Z axis
        // X軸に平行なエッジに近い場合
        addition.z = 0
        addition.normalize().multiplyScalar(params.edgeRadius)
        position.x = subCube.x + addition.x
        position.y = subCube.y + addition.y
      } else if (Math.abs(position.x) > subCubeHalfSize && Math.abs(position.z) > subCubeHalfSize) {
        // position is close to box edge that's parallel to Y axis
        // Y軸に平行なエッジに近い場合
        addition.y = 0
        addition.normalize().multiplyScalar(params.edgeRadius)
        position.x = subCube.x + addition.x
        position.z = subCube.z + addition.z
      } else if (Math.abs(position.y) > subCubeHalfSize && Math.abs(position.z) > subCubeHalfSize) {
        // position is close to box edge that's parallel to X axis
        // Z軸に平行なエッジに近い場合
        addition.x = 0
        addition.normalize().multiplyScalar(params.edgeRadius)
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

  // サイコロ内部に一回り小さいキューブを生成
  const createInnerGeometry = () => {
    const baseGeometry = new THREE.PlaneGeometry(
      1 - 2 * params.edgeRadius,
      1 - 2 * params.edgeRadius
    )
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

  // initialized
  useEffect(() => {
    // レンダラーを初期化
    renderer.current = new THREE.WebGLRenderer()

    // 描画領域を定義し、DOM に追加
    if (canvasWrapper?.current === null) return
    canvasWrapper?.current.appendChild(renderer.current?.domElement)

    // サイズ調整
    handleResize()

    // 環境光源を追加
    const light = new THREE.AmbientLight(0xffffff)
    scene.add(light)

    // サイコロを照らす光源を追加
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // サイコロを追加
    createDiceMesh()

    // カメラの位置を設定
    camera.position.z = 5

    // アニメーション
    const animate = () => {
      requestAnimationFrame(animate) // アニメーションを繰り返す

      if (diceMesh.current) {
        // XY方向に一定の角度を加算
        diceMesh.current.rotation.x += 0.01
        diceMesh.current.rotation.y += 0.01
      }

      // シーンとカメラへレンダリング（この設定がなければ画面に何も表示されない）
      renderer.current?.render(scene, camera)
    }
    animate()

    // アンマウント時の処理
    return () => {
      // オブジェクトの削除
      scene.children.forEach(child => {
        scene.remove(child)
        if (child instanceof THREE.Mesh) {
          if (child.material) {
            child.material.dispose()
            child.geometry.dispose()
          }
        }
      })

      renderer?.current?.dispose() // レンダラーの破棄
      window.removeEventListener('resize', handleResize) // リサイズイベントのリムーブもここに含める

      // アンマウント時にレンダラーを削除
      if (canvasWrapper?.current && renderer.current?.domElement) {
        canvasWrapper?.current.removeChild(renderer.current.domElement)
        renderer.current?.dispose()
      }
    }
  }, [renderer.current])

  // キャンパスのサイズを画面サイズにあわせて変更する
  const handleResize = () => {
    renderer.current?.setSize(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio
    )
    camera.updateProjectionMatrix()
  }

  useEffect(() => {
    // ウィンドウリサイズでキャンバスのサイズを変更
    window.addEventListener('resize', handleResize)

    // アンマウントでリスナーを削除
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [renderer, camera]) // 依存関係に renderer と camera を追加

  return {
    renderer,
  }
}
