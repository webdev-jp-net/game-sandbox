import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

import * as CANNON from 'cannon-es'
import * as THREE from 'three'

import { createDiceMesh } from './utils/dice'

interface useDiceParams {
  canvas: RefObject<HTMLCanvasElement> | null
}

export const useDice = ({ canvas }: useDiceParams) => {
  // サイコロの出目
  // 結果
  const [result, setResult] = useState<number>(0)

  const renderer = useRef<THREE.WebGLRenderer | null>(null)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 300)

  const diceArray = useRef<{ mesh: THREE.Group; body: CANNON.Body }[]>([])

  const physicsWorld = useRef<CANNON.World | null>(null)

  // initialized
  useEffect(() => {
    initPhysics()

    if (!canvas?.current) return
    // レンダラーを初期化
    renderer.current = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: canvas?.current,
    })
    renderer.current.shadowMap.enabled = true
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // サイズ調整
    updateSceneSize()

    // 環境光源を追加
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // サイコロを照らす光源を追加
    const topLight = new THREE.PointLight(0xffffff, 0.5)
    topLight.position.set(10, 15, 0)
    topLight.castShadow = true
    topLight.shadow.mapSize.width = 2048
    topLight.shadow.mapSize.height = 2048
    topLight.shadow.camera.near = 5
    topLight.shadow.camera.far = 400
    scene.add(topLight)

    // 部屋を作る
    createFloor()

    // サイコロを追加
    createDiceMesh()
    for (let i = 0; i < 1; i++) {
      diceArray.current.push(createDice())
      addDiceEvents(diceArray.current[i])
    }

    throwDice()
    render()

    // カメラの位置を設定
    camera.position.set(0, 0, 4).multiplyScalar(7)

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
      window.removeEventListener('resize', updateSceneSize) // リサイズイベントのリムーブもここに含める

      // アンマウント時にレンダラーを削除
      if (canvas?.current && renderer.current?.domElement) {
        canvas?.current.removeChild(renderer.current.domElement)
        renderer.current?.dispose()
      }
    }
  }, [])

  //
  const initPhysics = () => {
    physicsWorld.current = new CANNON.World({
      allowSleep: true,
      gravity: new CANNON.Vec3(0, -50, 0),
    })
    physicsWorld.current.defaultContactMaterial.restitution = 0.3
  }

  // 部屋を作る
  const createFloor = () => {
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      new THREE.ShadowMaterial({
        opacity: 0.1,
      })
    )
    floor.receiveShadow = true
    floor.position.y = -7
    floor.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
    scene.add(floor)

    const floorBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    })
    floorBody.position.copy(floor.position as unknown as CANNON.Vec3)
    floorBody.quaternion.copy(floor.quaternion as unknown as CANNON.Quaternion)
    physicsWorld?.current?.addBody(floorBody)
  }

  const createDice = () => {
    // サイコロを生成してsceneに追加
    const mesh = createDiceMesh()
    scene.add(mesh)

    const body = new CANNON.Body({
      mass: 1,
      shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5)),
      sleepTimeLimit: 0.1,
    })
    physicsWorld?.current?.addBody(body)
    return { mesh, body }
  }

  const addDiceEvents = (dice: { mesh: THREE.Group; body: CANNON.Body }) => {
    dice.body.addEventListener('sleep', e => {
      dice.body.allowSleep = false

      const euler = new CANNON.Vec3()
      e.target.quaternion.toEuler(euler)

      const eps = 0.1
      const isZero = (angle: number) => Math.abs(angle) < eps
      const isHalfPi = (angle: number) => Math.abs(angle - 0.5 * Math.PI) < eps
      const isMinusHalfPi = (angle: number) => Math.abs(0.5 * Math.PI + angle) < eps
      const isPiOrMinusPi = (angle: number) =>
        Math.abs(Math.PI - angle) < eps || Math.abs(Math.PI + angle) < eps

      if (isZero(euler.z)) {
        if (isZero(euler.x)) {
          setResult(1)
        } else if (isHalfPi(euler.x)) {
          setResult(4)
        } else if (isMinusHalfPi(euler.x)) {
          setResult(3)
        } else if (isPiOrMinusPi(euler.x)) {
          setResult(6)
        } else {
          // landed on edge => wait to fall on side and fire the event again
          dice.body.allowSleep = true
        }
      } else if (isHalfPi(euler.z)) {
        setResult(2)
      } else if (isMinusHalfPi(euler.z)) {
        setResult(5)
      } else {
        // landed on edge => wait to fall on side and fire the event again
        dice.body.allowSleep = true
      }
    })
  }

  const render = () => {
    physicsWorld?.current?.fixedStep()

    for (const dice of diceArray.current) {
      dice.mesh.position.copy(dice.body.position)
      dice.mesh.quaternion.copy(dice.body.quaternion)
    }

    renderer.current?.render(scene, camera)
    requestAnimationFrame(render)
  }

  // ウィンドウリサイズ時に描画エリアのサイズも変更
  const updateSceneSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer?.current?.setSize(window.innerWidth, window.innerHeight)
  }

  // ダイスをふる
  const throwDice = () => {
    diceArray.current.forEach((d, dIdx) => {
      d.body.velocity.setZero()
      d.body.angularVelocity.setZero()

      d.body.position = new CANNON.Vec3(6, dIdx * 1.5, 0)
      d.mesh.position.copy(d.body.position)

      d.mesh.rotation.set(2 * Math.PI * Math.random(), 0, 2 * Math.PI * Math.random())
      d.body.quaternion.copy(d.mesh.quaternion)

      const force = 3 + 5 * Math.random()
      d.body.applyImpulse(new CANNON.Vec3(-force, force, 0), new CANNON.Vec3(0, 0, 0.2))

      d.body.allowSleep = true
    })
  }

  useEffect(() => {
    // ウィンドウリサイズでキャンバスのサイズを変更
    window.addEventListener('resize', updateSceneSize)

    // アンマウントでリスナーを削除
    return () => {
      window.removeEventListener('resize', updateSceneSize)
    }
  }, [renderer, camera]) // 依存関係に renderer と camera を追加

  return {
    throwDice,
    result,
  }
}
