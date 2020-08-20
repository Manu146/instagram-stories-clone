import React from "react";

export default function DynamicComponent(component) {
  if (component.type === "img")
    return React.createElement("img", { src: component.src });
}
