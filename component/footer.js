export const Footer = ({ transpose, setTranspose }) => {
  return (
    <div
      style={{
        width: "100%",
        position: "fixed",
        bottom: 20,
        left: 0,
        textAlign: "center",
        lineHeight: "70%",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          margin: "0 20px 0 0px",
          display: "flex",
          flexDirection: "column-reverse",
          lineHeight: "200%",
          width: "100px",
        }}
      >
        <span style={{ margin: "0 4px" }}>transpose</span>
        <span style={{ margin: "0 4px" }}>{transpose && transpose > 0 ? `+${transpose/100}` : `${transpose/100}`}</span>
        <div>
          {" "}
            {['-', '+'].map((x,i) =>       <span key={i}
            onClick={() => setTranspose(x === '+' ? transpose + 100 : transpose - 100)}
            style={{ margin: "0 4px", fontSize: "2em", cursor: 'pointer' }}
          >
            {x}
          </span>)}
        </div>
      </div>
      <div>
        {" "}
        <h3 style={{ color: "#5FACD7" }}>Chord Finder</h3>
        <span
            onClick={() => window.location.replace('https://rasha.world')}
          style={{
            color: "#181D45",
            padding: "0 10px",
            borderRadius: 5,
            backgroundColor: "#5FACD7",
            fontSize: "1rem",
            cursor: 'pointer'
          }}
        >
          developed by Rasha Rahman
        </span>
        <h3 style={{ color: "white", opacity: 0.3 }}>
          choose different orbs and press 'SPACE' to hear them!
        </h3>
      </div>
      <div>
          <span style={{width: 20}}> sick website
          </span>
        </div>
    </div>
  );
};
