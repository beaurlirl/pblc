import { LostWorld, StandardReality, Image } from "spacesvr";
import Link from "../ideas/Link";
import Title from "../ideas/Title";
import Analytics from "../ideas/Analytics";

export default function Hub() {
  const numButtons = 3; // Total number of buttons
  const spacing = 2; // Adjust for the overall spacing
  const closerSpacing = 1; // Adjust for how close you want the outer buttons to be

  return (
    <StandardReality
      environmentProps={{ dev: process.env.NODE_ENV === "development" }}
    >
      <Analytics />
      <LostWorld />
      <group position-z={-2.25}>
        <Title
          position-y={1.2}
          position-z={-0.75}
          image="https://d27rt3a60hh1lx.cloudfront.net/spacesvr/spacesvr.png"
        >
          public property
        </Title>
        <group position-y={0.8}>
          {[
            "/multiplayer",
            "/workshop",
            "https://github.com/musehq/spacesvr",
          ].map((href, index) => (
            <Link
              key={index}
              href={href}
              position-x={
                index === 0
                  ? (index - (numButtons - 1) / 2) * closerSpacing // Outer left button
                  : index === 2
                  ? (index - (numButtons - 1) / 2) * closerSpacing // Outer right button
                  : (index - (numButtons - 1) / 2) * spacing // Center button
              }
            >
              {index === 0
                ? "created by tint"
                : index === 1
                ? "visit instagram"
                : "know when we launch"}
            </Link>
          ))}
        </group>
      </group>
    </StandardReality>
  );
}
