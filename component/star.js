

export const Star = (props) => {
    var img = `https://localhost:3000/star.png`
    return (
        <mesh visible userData={{ hello: 'world' }} {...props}>
  <sphereGeometry args={[0.5, 32, 32]} />
  <meshBasicMaterial color="0xffffff">
  <texture attach="map" image={img} onUpdate={self => img && (self.needsUpdate = true)} />
  </meshBasicMaterial>
</mesh>
    )
}