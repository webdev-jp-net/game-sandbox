import { useEffect } from 'react'

import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three-stdlib'

export const useDice = () => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer()

  const createDiceGeometry = () => {
    const size = 1 // サイコロのサイズ
    const roundness = 0.1 // 角の丸み
    const geometry = new RoundedBoxGeometry(size, size, size, 10, roundness)
    return geometry
  }

  useEffect(() => {
    // 環境光源を追加
    const light = new THREE.AmbientLight(0xffffff)
    scene.add(light)

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
