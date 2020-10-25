import { useRef } from "react"
import { useFrame } from "react-three-fiber"


export const Star = (props) => {
    var img = `https://localhost:3000/star.png`
    const star = useRef()
    useFrame(() => {
        star.current.rotation.x += 0.01;
    star.current.rotation.y += 0.01;
    })
    return (
        <mesh ref={star}  visible userData={{ hello: 'world' }} {...props}>
  <sphereGeometry args={[0.5, 32, 32]} />
  <meshBasicMaterial {...props} transparent>
  </meshBasicMaterial>
</mesh>
    )
}