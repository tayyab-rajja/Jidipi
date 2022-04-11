import { createContext, useContext } from "react";

const SideBarContext = createContext<boolean | undefined>(undefined);
const SideBarUpdateContext = createContext<VoidFunction | undefined>(undefined);

interface ISideBarProvider {
  isOpen: boolean;
  close: VoidFunction;
}
// Context provider
export const SideBarProvider: React.FC<ISideBarProvider> = ({
  children,
  isOpen,
  close,
}) => {
  return (
    <SideBarUpdateContext.Provider value={close}>
      <SideBarContext.Provider value={isOpen}>
        {children}
      </SideBarContext.Provider>
    </SideBarUpdateContext.Provider>
  );
};

// Context hooks
export const useSideBar = () => {
  const state = useContext(SideBarContext);
  const close = useContext(SideBarUpdateContext);

  if (state === undefined || close === undefined) {
    throw new Error("useSideBar must be used within a SideBarProvider");
  }

  return { isOpen: state, close };
};
