import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as Tone from "tone";
import { useRouter } from "next/router";
import { detect } from "@tonaljs/chord-detect";
import { Chord } from "@tonaljs/tonal";

import "../styles/globals.css";
import { Footer } from "../component/footer";
import { KeyShort } from "../component/keyShort";
import { Help } from "../component/help";
import { Box } from "rebass";
import { TwitterShareButton } from "react-share";

function MyApp({ Component, pageProps }) {
  const [use, setUse] = useState(null);
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState(null);
  const [sounds, setSounds] = useState([]);
  const [prevSL, setPrevSL] = useState(sounds.length);
  const [hoverNotes, setHovNotes] = useState(false);

  const [toggleProg, setToggleProg] = useState(false);

  const [toggleKeyboard, setToggleKeyboard] = useState(false);
  const [rad, setRad] = useState(null);
  const [hRad, setHRad] = useState(null);
  const [range, setRange] = useState(4);
  const [volRange, setVolRange] = useState(80);

  const transRef0 = useRef();
  const transRef1 = useRef();

  const [arr, setArr] = useState([]);

  const [on, setOn] = useState();

  const [transpose, setTranspose] = useState(0);

  const [opacSta, setOpacSta] = useState(false);

  const [x, setX] = useState(-6);
  const [y, setY] = useState(1.5);
  const [z, setZ] = useState(0);

  const [soundDetection, setSoundDetection] = useState([]);

  const [prog, setProg] = useState();

  useEffect(() => {
    let k = [...sounds];
    k.length > 0 && setSoundDetection(detect(k));
  }, [sounds]);

  useEffect(() => {
    const timeOpa = setTimeout(() => {
      setOpacSta(true);
    }, 1000);

    timeOpa;
  });

  useEffect(
    () =>
      prog && prog.length > 0 ? setToggleProg(true) : setToggleProg(false),
    [prog, setProg, toggleProg, setToggleProg]
  );

  useEffect(() => prog, [prog, setProg, toggleProg, setToggleProg]);

  useEffect(() => {
    let k = rad && rad;
    var noteL = 2 / (1 / range) / 16;
    console.log(k);
    const toggleAll = setTimeout(() => {
      k &&
        k.map((x, i) =>
          synth.triggerAttackRelease(
            `${x}${
              i > 0
                ? x === k[0]
                  ? 4
                  : [k[i - 1][0], x[0]].sort()[1] === x[0]
                  ? 4
                  : 3
                : 3
            }`,
            noteL
          )
        );
    }, (k ? k.length * (noteL + 1) : 5) * 500);
    synth &&
      k !== null &&
      k.map((x, i) =>
        synth.triggerAttackRelease(
          `${x}${
            i > 0
              ? x === k[0]
                ? 4
                : [k[i - 1][0], x[0]].sort()[1] === x[0]
                ? 4
                : 3
              : 3
          }`,
          noteL,
          now + i / 2 + noteL
        )
      ) &&
      toggleAll;
  }, [rad]);

  const canv = useRef();

  const router = useRouter();

  const [synth, setSynth] = useState(null);
  const [pluck, setPluck] = useState(null);

  const [context, setContext] = useState(null);
  const [screenSize, setScreenSize] = useState([0, 0]);

  const [currentKey, setKey] = useState();
  const now = Tone.now();

  const draggingItem = useRef();
  const dragOverItem = useRef();

  const [vol, setVol] = useState();
  const triggerSound = (id) =>
    sounds.length >= prevSL && console.log("success");

  useEffect(() => {
    typeof window !== "undefined" &&
      setSynth(new Tone.PolySynth(Tone.Synth).toDestination());
    setPluck(new Tone.PolySynth(Tone.FMSynth).toDestination());
  }, []);

  useEffect(() => {
    synth && synth.set({ detune: transpose });
    pluck && pluck.set({ detune: transpose });
  }, [transpose]);
  useEffect(() => {
    document.onkeydown = onKeyDown;
  });

  // Tone.loaded().then(() => {
  //   sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 4);
  // })

  const onKeyDown = (e) => {
    let noteL = 2 / (1 / range) / 16;
    e = e || window.event;
    setKey(e.keyCode);
    switch (e.keyCode) {
      case 32:
        synth.triggerAttackRelease(
          sounds.map((x) => `${x}3`),
          noteL
        );
        break;
      case 13:
        synth.triggerAttackRelease(
          sounds.map((x) => `${x}4`),
          noteL
        );
        break;
      case 65:
        setOn(0);
        console.log(on);
        break;
      case 83:
        setOn(1);
        break;
      case 68:
        setOn(2);
        break;
      case 70:
        setOn(3);
        break;
      case 71:
        setOn(4);
        break;
      case 87:
        setOn(10);
        break;
      case 69:
        setOn(20);
        break;
      case 72:
        setOn(5);
        break;
      case 84:
        setOn(30);
        break;
      case 8:
        setOn(-2);
        setSounds([]);
        break;
      case 88: //x
        transRef1.current.click();
        break;
      case 90: //z
        transRef0.current.click();
        break;
      case 89:
        setOn(40);
        break;
      case 85:
        setOn(50);
        break;
      case 75:
        setToggleKeyboard(!toggleKeyboard);
        break;
      case 74:
        setOn(6);
        break;
    }
  };
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
  const handleDragStart = (e, position) => {
    setToggleProg(true);
    draggingItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    setToggleProg(position);
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const handleDragLeave = (e, position) => {
    setToggleProg(position);
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const handleDragEnd = (e) => {
    const listCopy = [...soundDetection];
    const progre = prog ? [...prog] : [];
    const draggingItemContent = listCopy[draggingItem.current];
    dragOverItem.current && progre.push(draggingItemContent);
    setProg(progre);
    setSoundDetection(listCopy);
  };

  const newRef = useRef()
  const onDeleteChord = (i) => {
    const copy = [...prog];
    copy.splice(i, 1);
    setProg(copy);
  };
  useEffect(() => {
    active ? setMessage("thic") : setMessage(null);
  }, [active, setActive]);

  const mouseEnt = (x, e) => {
    x.includes("/")
      ? setHRad(
          x
            .split("/")
            .slice(1)
            .concat(Chord.get(x.split("/")[0]).notes.slice(1))
        )
      : setHRad(Chord.get(x).notes);
    setScreenSize([e.clientX, e.clientY]);
  };
  const tagSound = (id, act) => {
    let d = [...sounds];
    setPrevSL(d.length);
    act && !(idCheck(id) !== currentKey)
      ? (d = [])
      : d.includes(idCheck(id))
      ? (d = d.filter((x) => x !== idCheck(id)))
      : d.push(`${idCheck(id)}`) && triggerSound(idCheck(id));
    setSounds(d);
  };
  return (
    <Box
      sx={{
        maxWidth: "100%",
        margin: "0 auto",
        minHeight: "98vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: detect(sounds).length > 0 ? "#6D78CC" : "#6D78CC",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
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
            <span
              style={{
                fontSize: "0.5em",
                lineHeight: "50%",
              }}
            >
              {sounds.length < 1
                ? "(zero orbs selected)"
                : "selected notes & chords:"}
            </span>
            <h4
              style={{
                margin: "auto auto",
              }}
            >
              {sounds.map((x, i) => (
                <span key={i} style={{ margin: "0px 4px" }}>
                  {x}
                </span>
              ))}
            </h4>
            <h6
              style={{
                marginTop: 20,
                marginBottom: -40,
                fontWeight: "bolder",
                textDecoration: "underline",
                color: "#040C35",
              }}
            ></h6>
            <Box
              fontSize={"0.70rem"}
              sx={{
                zIndex: 5,
                position: "fixed",
                left: 0,
                top: 0,
                backgroundColor: "black",
                padding: hRad && "2px 8px 2px 8px",
                borderRadius: 10,
                opacity: 0.8,

                transform:
                  "translateX(" +
                  screenSize[0] +
                  "px) translateY(" +
                  (screenSize[1] + 30) +
                  "px)",
              }}
            >
              {hRad &&
                hRad.map((x, i) => (
                  <Box key={i} display={"inline"}>
                    {hRad && hRad.length === i + 1 ? x : `${x} => `}
                  </Box>
                ))}
            </Box>
            <Box
              onDragEnter={(e) => handleDragEnter(e, true)}
              sx={{
                position: "fixed",
                width: "25vw",
                minHeight: "7.5vh",
                maxHeight: "97.5vh",
                left: 10,
                top: 10,
                backgroundColor: "#00000040",
                zIndex: 4,
                borderRadius: 10,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                cursor: "default",
                opacity: toggleProg ? 1 : 0.2,
                transform: toggleProg ? "translateY(0vh)" : "translateY(-8vh)",
                transition:
                  "opacity 300ms ease-in-out, transform 300ms ease-in-out",
                ":hover": {
                  opacity: 1,
                  transform: "translateY(0vh)",
                },
              }}
            >
              <Box
                as="span"
                sx={{
                  fontSize: "20px",
                  border: "solid 1px white",
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  borderTopWidth: 0,
                  mb: 1,
                }}
              
              >
                Chord Progression Editor
              </Box>
              <Box as="span" display="block" pb={3} fontSize={"0.8rem"}>
                drag chords here to make a progression!
              </Box>
              <Box
                sx={{
                  backgroundColor: "#00000040",
                  margin: 3,
                  borderRadius: 7,
                }}
              >
                {prog &&
                  prog.map((x, i) => (
                    <Box
                      width="100%"
                      display="flex"
                      justifyContent="space-between"
                      padding={10}
                      fontSize={"1rem"}
                    >
                      {[i, x, "delete"].map((j, k) => (
                        <Box
                          sx={{
                            color:
                              k < 1
                                ? "inherit"
                                : j === "delete"
                                ? "#460E38"
                                : "#060E38",
                            backgroundColor:
                              j === "delete"
                                ? "#6C78CC"
                                : k === 0
                                ? "#030D35"
                                : "#6C78CC",
                            paddingX: "10px",
                            paddingY: "5px",
                            borderRadius: 7,
                            cursor: k > 0 && "pointer",
                          }}
                          display="inline"
                          onMouseEnter={(e) => k === 1 && mouseEnt(j, e)}
                          onMouseLeave={(e) => k === 1 && setHRad(null)}
                          onClick={() =>
                            j === "delete"
                              ? onDeleteChord(i)
                              : k === 0
                              ? console.log("num dont click")
                              : () =>
                                  j.includes("/")
                                    ? setRad(
                                        j
                                          .split("/")
                                          .slice(1)
                                          .concat(
                                            Chord.get(
                                              `${j.split("/")[0]}`
                                            ).notes.slice(1)
                                          )
                                      )
                                    : setRad(Chord.get(j).notes)
                          }
                        >
                          {k === 0 ? `${i + 1}. ` : j}
                        </Box>
                      ))}
                     
                    </Box>
                  ))}
                   <Box>
                      <a href="https://twitter.com/intent/tweet?screen_name=@raaahhh_sha&ref_src=twsrc%5Etfw" class="twitter-mention-button" data-size="small" data-text={prog && prog[0]} data-related="raaahhh_sha" data-show-count="false">Share</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                        </Box>
              </Box>
            </Box>

            <TwitterShareButton
              title={"Lets go"}
              via="test"
              hashtags={prog}
                          ref={newRef}
            />

            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              {soundDetection.map((x, i) => (
                <Box
                  key={i}
                  onDragStart={(e) => handleDragStart(e, i)}
                  onDragEnd={(e) => handleDragEnd(e)}
                  draggable
                  onClick={() =>
                    x.includes("/")
                      ? setRad(
                          x
                            .split("/")
                            .slice(1)
                            .concat(
                              Chord.get(`${x.split("/")[0]}`).notes.slice(1)
                            )
                        )
                      : setRad(Chord.get(x).notes)
                  }
                  onMouseEnter={(e) => mouseEnt(x, e)}
                  onMouseLeave={(e) => setHRad(null)}
                  sx={{
                    display: "inline",
                    fontSize: "1rem",
                    textAlign: "center",
                    fontWeight: "600",
                    borderRadius: 10,
                    height: "100%",
                    mt: 50,
                    padding: "5px 12px 5px 12px",
                    backgroundColor: "#6D78CC",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#040C35",
                    transform: "scale(1.0)",
                    zIndex: 3,
                    transition:
                      "color 400ms ease=in-out, transform 300ms ease-in-out",
                    ":hover": {
                      color: "#FFFFFF",
                      cursor: "grab",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {x}
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
      {
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100vw",
            minHeight: "100vh",
            backgroundColor: "#00000090",
            visibility: toggleKeyboard ? "visible" : "hidden",
            opacity: toggleKeyboard ? 100 : 0,
            transition: "opacity 600ms ease-in-out",
            zIndex: 6,
          }}
        >
          <KeyShort togKey={toggleKeyboard} setKey={setToggleKeyboard} />
        </Box>
      }
      <Help />
      <Box
        opacity={opacSta ? (toggleKeyboard ? 0.2 : 1) : 0}
        width={"100%"}
        height={"100%"}
        sx={{
          transition: "opacity 300ms ease-in-out",
        }}
      >
        <Canvas
          camera={{
            position: [0, 10, 30],
            fov: 15,
            near: 0.1,
            far: 1000,
            z: 5,
          }}
          style={{
            width: "100%",
            minHeight: "100vh",
          }}
          gl={{
            powerPreference: "high-performance",
            alpha: true,
            antialias: false,
            stencil: false,
            depth: false,
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
              on={on}
              setOn={setOn}
              i={i}
              tagSound={tagSound}
              sounds={sounds}
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
              on={on}
              setOn={setOn}
              sounds={sounds}
              tagSound={tagSound}
              triggerSound={triggerSound}
              position={[x + k, y + 1, z]}
              {...pageProps}
            />
          ))}
         
        </Canvas>
      </Box>
      <Footer
        ref0={transRef0}
        ref1={transRef1}
        transpose={transpose}
        setTranspose={setTranspose}
        range={range}
        setRange={setRange}
        vr={volRange}
        sVr={setVolRange}
      />
    </Box>
  );
}

export default MyApp;

function getRandom() {
  var num = Math.floor(Math.random() * 10) + 1;
  num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
  return num;
}

function generateStars() {}
