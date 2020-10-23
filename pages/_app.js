import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Fog } from "three";
import * as Tone from "tone";
import { useRouter } from "next/router";
import { detect } from "@tonaljs/chord-detect";

import "../styles/globals.css";
import { Footer } from "../component/footer";

function MyApp({ Component, pageProps }) {
  const [use, setUse] = useState(null);
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState(null);
  const [sounds, setSounds] = useState([]);
  const [prevSL, setPrevSL] = useState(sounds.length);

  const [transpose, setTranspose] = useState(0);

  const [x, setX] = useState(-6);
  const [y, setY] = useState(1.5);
  const [z, setZ] = useState(0);

  const canv = useRef();

  const router = useRouter();

  const [synth, setSynth] = useState(null);
  const [context, setContext] = useState(null);

  const now = Tone.now();

  const triggerSound = (id) =>
    sounds.length >= prevSL && console.log("success");

  useEffect(
    () =>
      typeof window !== "undefined" &&
      setSynth(new Tone.PolySynth(Tone.Synth).toDestination()),
    []
  );
  
  useEffect(() => {
    synth && synth.set({ detune: transpose });
  },[transpose])
  useEffect(() => {
    document.onkeydown = onKeyDown 
  })

  const onKeyDown = (e) => {
    e = e || window.event 
    switch(e.keyCode) {
      case 32:
        synth.triggerAttackRelease(sounds.map(x=>`${x}3`), 1);
        break;
    }
  }
  function idCheck(id) {
    switch (id) {
      case 0:
        return "C";
      case 10:
        return "Db";
      case 1:
        return "D";
      case 20:
        return "Eb";
      case 2:
        return "E";

      case 3:
        return "F";
      case 30:
        return "Gb";
      case 4:
        return "G";
      case 40:
        return "Ab";
      case 5:
        return "A";
      case 50:
        return "Bb";
      case 6:
        return "B";
      default:
        return "C";
    }
  }

  useEffect(() => {
    active ? setMessage("thic") : setMessage(null);
  }, [active, setActive]);

  const tagSound = (id) => {
    let d = [...sounds];
    setPrevSL(d.length);
    d.includes(idCheck(id))
      ? (d = d.filter((x) => x !== idCheck(id)))
      : d.push(`${idCheck(id)}`) && triggerSound(idCheck(id));
    setSounds(d);
    console.log(sounds);
  };
  return (
    <div
      style={{
        maxWidth: "70%",
        margin: "0 auto",
        minHeight: "98vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: detect(sounds).length > 0 ? "#6D78CC" : "#494A8D",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: "20vh",
          width: "80%",
          fontSize: "2rem",
          textAlign: "center",
          margin: "30 30",
        }}
      >
        {message ? (
          <h1>{message}</h1>
        ) : (
          <>
            <h4>
              {sounds.map((x, i) => (
                <span key={i} style={{ margin: "0 4px" }}>
                  {x}
                </span>
              ))}
            </h4>
            <h6
              style={{
                marginTop: -20,
                marginBottom: -20,
                fontWeight: "bolder",
                textDecoration: "underline",
                color: "#5FACD7",
              }}
            >
              {detect(sounds).length > 0 && "chords"}
            </h6>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-evenly",
                color: "#5FACD7",
              }}
            >
              {detect(sounds).map((x, i) => (
                <div
                  style={{
                    display: "inline",
                    fontSize: "1rem",
                    textAlign: "center",
                    padding: 20,

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {x}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Canvas
        camera={{ position: [0, 10, 30], fov: 15, near: 0.1, far: 1000, z: 5 }}
        style={{
          width: "100%",
          height: 640,
        }}
      >
        <ambientLight />

        <pointLight position={[10, 100, 100]} castShadow />
        {[0, 1.5, 3, 4.5, 6, 7.5, 9].map((k, i) => (
          <Component
            key={i}
            active={active}
            setActive={setActive}
            j={0}
            k={k}
            i={i}
            tagSound={tagSound}
            triggerSound={triggerSound}
            position={[x + k, y, z]}
            {...pageProps}
          />
        ))}
        {[1, 2.5, 5, 6.7, 8.3].map((k, i) => (
          <Component
            key={i}
            active={active}
            setActive={setActive}
            j={1}
            k={k}
            i={(i + 1) * 10}
            tagSound={tagSound}
            triggerSound={triggerSound}
            position={[x + k, y + 1, z]}
            {...pageProps}
          />
        ))}
      </Canvas>
      <Footer transpose={transpose} setTranspose={setTranspose}/>
    </div>
  );
}

export default MyApp;
