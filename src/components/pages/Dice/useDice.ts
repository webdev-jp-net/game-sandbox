import { useEffect } from 'react'

import * as THREE from 'three'

const params = {
  segments: 50,
  edgeRadius: 0.07,
}

export const useDice = () => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer()

  // サイコロのジオメトリを生成
  const createDiceGeometry = () => {
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

      // 修正した座標を反映
      positionAttribute.setXYZ(i, position.x, position.y, position.z)
    }

    return boxGeometry
  }

  useEffect(() => {
    // 環境光源を追加
    const light = new THREE.AmbientLight(0xffffff)
    scene.add(light)

    // サイコロを照らす
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // サイコロを追加
    const diceGeometry = createDiceGeometry()
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const diceMesh = new THREE.Mesh(diceGeometry, material)
    scene.add(diceMesh)

    // カメラの位置を設定
    camera.position.z = 5

    // アニメーション
    const animate = () => {
      requestAnimationFrame(animate) // アニメーションを繰り返す

      // XY方向に一定の角度を加算
      diceMesh.rotation.x += 0.01
      diceMesh.rotation.y += 0.01

      // シーンとカメラへレンダリング（この設定がなければ画面に何も表示されない）
      renderer.render(scene, camera)
    }

    animate()

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

      renderer.dispose() // レンダラーの破棄
      window.removeEventListener('resize', handleResize) // リサイズイベントのリムーブもここに含める
    }
  }, [])

  // キャンパスのサイズを画面サイズにあわせて変更する
  const handleResize = () => {
    renderer.setSize(
      window.innerWidth * window.devicePixelRatio,
      window.innerHeight * window.devicePixelRatio
    )
    camera.updateProjectionMatrix()
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [renderer, camera]) // 依存関係に renderer と camera を追加

  return {
    renderer,
  }
}
