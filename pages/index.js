import Head from "next/head";

import { useFrame, useUpdate } from "react-three-fiber";
import { useEffect, useRef, useState } from "react";
const Home =({ use, setUse, position, tagSound, i,triggerSound, j, k, ref, setOn, sounds, on }) => {
  const mesh = useRef();
  const opac = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  
  useEffect(() => {
    sounds.length < 1 && active && setActive(false)
  },[sounds])



  let [x, y, z] = [...position];
  
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (reef.current.rotation.x = reef.current.rotation.y += (active ? ((Math.random() * 10) / 1000) * 4 : (Math.random() * 10) / 1000)));



const reef = useUpdate((geo) => {
 
  const onIt = setTimeout(() => {
    setOn && setOn(-4)
  },10)
  i === on && geo.__handlers.click() && onIt()
  on === -2 && active && geo.__handlers.click() && onIt()
  
},[setOn, on])

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
      position={[x+1.5, y, z]}

      ref={reef}
      scale={active ? [0.50, 0.50, 0.50] : hovered ? [0.47, 0.47, 0.47] : [0.45, 0.45, 0.45]}
      //
      onClick={(e) =>
        {typeof setActive !== "undefined" &&
        setActive(!active)
        tagSound(i, active) 
     
        
      }
        // (mesh.current.position.x = x)
        
      }
      onPointerOver={(e) =>
        setHover(!active)
      }
      onPointerOut={(e) => setHover(false)}
    >
      <icosahedronBufferGeometry />

      <meshStandardMaterial color={(hovered ? "#6D78CC" : active ? "#6D78CC" : j > 0 ? ("#181D45") : (i%2===0 ? "#494A8D": "#42459A"))} />
    </mesh>
  );
}


export default Home;