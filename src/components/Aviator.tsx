import React from "react";
import * as PIXI from "pixi.js";
import {
  Stage,
  Container,
  withPixiApp,
  Sprite,
  Graphics,
  useTick,
} from "@inlet/react-pixi";

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const Inner = () => {
  const [x, setX] = React.useState(0);
  const mask = React.useRef<any>();
  const i = React.useRef(0);

  useTick((delta) => {
    i.current += 0.05 * delta;
    setX(Math.cos(i.current) * 100);
  });

  return (
    <Container position={[250, 250]}>
      <Sprite
        image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
        scale={[4, 4]}
        anchor={0.5}
        mask={mask.current}
      />
      <Graphics
        x={x}
        draw={(g) => {
          g.beginFill(0x000000);
          g.drawCircle(-25, -25, 50);
          g.endFill();
        }}
        ref={mask}
      />
    </Container>
  );
};

const Aviator = () => (
  <Stage width={500} height={500} options={{ backgroundColor: 0xcccccc }}>
    <Inner />
  </Stage>
);

export default Aviator;
