
import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei"

import * as THREE from "three"
import Lights from "./Lights"
import { Suspense } from "react"
import IPhone from "./IPhone"
import Loader from "./Loader"

const ModelView = ({index, groupRef, gsapType, controlRef, setRotationState, item, size}) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      {/* Ambiant light*/}
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => {
          const angle = controlRef.current.getAzimuthalAngle();
          console.log("Captured angle for", gsapType, ":", angle);
          setRotationState(angle);
        }}
      />

      <group ref={groupRef} name={`${index === 1} ? 'small' : 'large'`}>
        <Suspense fallback={<Loader />}>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
}

export default ModelView