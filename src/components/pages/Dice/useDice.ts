import { useEffect } from 'react'

import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three-stdlib'

export const useDice = () => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer()

  useEffect(() => {
    // ジオメトリの設定
    const geometry = new RoundedBoxGeometry(1, 1, 1, 10, 0.05)

    // マテリアルの設定
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })

    // キューブを定義
    const cube = new THREE.Mesh(geometry, material)

    // シーンへキューブを追加
    scene.add(cube)

    // カメラの位置を設定
    camera.position.z = 5

    // アニメーション
    const animate = () => {
      // XY方向に一定の角度を加算
      requestAnimationFrame(animate) // アニメーションを繰り返す
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      // レンダリング
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      // オブジェクトの削除
      scene.children.forEach(child => {
        scene.remove(child)
        if (child instanceof THREE.Mesh) {
          if (child.material) {
            child.material.dispose() // マテリアルの破棄
          }
          if (child.geometry) {
            child.geometry.dispose() // ジオメトリの破棄
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
