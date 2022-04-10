import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";

interface IPortalProps {
  className?: string;
  el?: string;
}
export const Portal: React.FC<IPortalProps> = ({
  children,
  className = "root-portal",
  el = "div",
}) => {
  const [container, setContainer] = useState<null | Element>(null);

  useEffect(() => {
    const container = document.createElement(el);
    container.classList.add(className);
    document.body.appendChild(container);
    setContainer(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [className, el]);

  return container ? ReactDOM.createPortal(children, container) : null;
};
