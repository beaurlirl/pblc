import { useRef, useEffect, MutableRefObject } from "react";
import { Global, css } from "@emotion/react";
import { Vector3 } from "three";
import dynamic from "next/dynamic"; // Import next/dynamic for dynamic imports
import { useEnvironment } from "../../../Environment";

// Dynamically import nipplejs only on the client-side
const nipplejs = dynamic(() => import("nipplejs"), { ssr: false });

type NippleMovementProps = {
  direction: MutableRefObject<Vector3>;
};

/**
 * NippleMovement gives the player a direction to move by taking
 * input from a nipple (joystick).
 *
 * Direction is stored as a Vector3 with the following format
 *    x: left/right movement, + for right
 *    y: forward/back movement, + for forwards
 *    z: up/down movement, + for up
 *
 * @param props
 * @constructor
 */
const NippleMovement = (props: NippleMovementProps) => {
  const { direction } = props;

  const nipple = useRef(null); // Initialize nipplejs with null ref
  const nippleContainer = useRef<HTMLElement>(null); // For the nipple container
  const { containerRef } = useEnvironment();

  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      // Create a div element to hold the nipplejs controller
      nippleContainer.current = document.createElement("div");
      nippleContainer.current.style.position = "fixed";
      nippleContainer.current.style.left = "0";
      nippleContainer.current.style.bottom = "0";
      nippleContainer.current.style.width = "40%";
      nippleContainer.current.style.maxWidth = "160px";
      nippleContainer.current.style.height = "25%";
      nippleContainer.current.style.height = "160px";
      nippleContainer.current.style.zIndex = "5";
      nippleContainer.current.classList.add("nipple-container");
      containerRef.current.appendChild(nippleContainer.current);

      // Initialize nipplejs
      const nippleInstance = nipplejs.create({
        zone: nippleContainer.current,
        mode: "static",
        position: { left: "50%", top: "50%" },
        color: "#fff",
        size: 120,
        restOpacity: 0.75,
      });

      nippleInstance.on("move", (evt, data) => {
        const x = (data.distance / 60) * Math.cos(data.angle.radian);
        const z = (-data.distance / 60) * Math.sin(data.angle.radian);
        direction.current.set(x, 0, z);
      });

      nippleInstance.on("end", () => {
        direction.current.set(0, 0, 0);
      });

      nippleContainer.current.addEventListener("touchstart", (ev) => {
        ev.preventDefault();
      });

      nipple.current = nippleInstance; // Store the nipplejs instance in ref

      return () => {
        if (nipple.current) nipple.current.destroy(); // Cleanup on unmount
      };
    }
  }, [containerRef]); // Dependency array to run the effect after mounting

  const nippleStyles = css`
    .nipple-container > * > .front,
    .nipple-container > * > .back {
      background: radial-gradient(white, white 64%, black 86%) !important;
    }
  `;

  return <Global styles={nippleStyles} />;
};

export default NippleMovement;
