"use client";

import dynamic from "next/dynamic";

//  Load the WebGL scene only in the browser (no server render).
const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => <div className="hero-canvas" aria-hidden="true" />,
});

export default function HeroCanvas() {
  return <Hero3D />;
}
