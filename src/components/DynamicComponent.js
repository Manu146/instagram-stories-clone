import React from "react";

export default function DynamicComponent({ component, onLoad, loading }) {
  if (component.type === "img")
    return (
      <>
        <img
          src={component.preview}
          style={{ display: loading ? "block" : "none" }}
        ></img>
        <img
          src={component.src}
          onLoad={onLoad}
          style={{ display: loading ? "hidden" : "block" }}
        />
      </>
    );
}
