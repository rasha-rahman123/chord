import Head from "next/head";

import { useFrame } from "react-three-fiber";
import { useEffect, useRef, useState } from "react";
export default function Home({ use, setUse, position, tagSound, i,triggerSound, j, k }) {
  const mesh = useRef();
  const opac = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  

  let [x, y, z] = [...position];
  
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  useFrame(
    () =>
      mesh.current.position.x < x + 1.5 &&
      (mesh.current.position.x = mesh.current.position.x += 0.1)
  );



  // // Useful reset tools
  // useEffect(() => {
  //   const dang = () => setTimeout(() => {
  //     setActive(false)
  //   }, 2000)
  //   active && !hovered && dang()
  // },[active, hovered])

  return (
    <mesh
      // {...props}
      key={(Math.ceil(j+2)*(k+3) ) * 2}
      position={[x, y, z]}

      ref={mesh}
      scale={active ? [0.50, 0.50, 0.50] : hovered ? [0.47, 0.47, 0.47] : [0.45, 0.45, 0.45]}
      //
      onClick={(e) =>
        {typeof setActive !== "undefined" &&
        setActive(!active) && (mesh.current.posiition.y = (y + 1)) 
        tagSound(i) 
        
      }
        // (mesh.current.position.x = x)
        
      }
      onPointerOver={(e) =>
        setHover(!active)
      }
      onPointerOut={(e) => setHover(false)}
    >
      <icosahedronBufferGeometry />

      <meshStandardMaterial color={(hovered ? "#2144B8" : active ? "#2144B8" : j > 0 ? ("#181D45") : (i%2===0 ? "#494A8D": "#6D78CC"))} />
    </mesh>
  );
}
