const NOTCH_RADIUS = 0.15 // 凹みの半径
const NOTCH_DEPTH = 0.15 // 凹みの深さ

// サイコロ面のくぼみを生成
const notchWave = (v: number) => {
  v = (1 / NOTCH_RADIUS) * v
  v = Math.PI * Math.max(-1, Math.min(1, v))
  return NOTCH_DEPTH * (Math.cos(v) + 1)
}
export const notch = (pos: [number, number]) => notchWave(pos[0]) * notchWave(pos[1])
