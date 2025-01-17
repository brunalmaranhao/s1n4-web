"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";

type ProjectUpdateContextType = {
  selectedProjectUpdate?: IProjectUpdates;
  handleSelectedProjectUpdate: (
    projectUpdate: IProjectUpdates | undefined,
  ) => void;
  visibleModal?: "remove-comment" | "remove-project-update";
  selectedComment?: IComment;
  handleSelectedComment: (comment: IComment | undefined) => void;
  handleSetVisibleModal: (
    value: "remove-comment" | "remove-project-update" | undefined,
  ) => void;
};

const ProjectUpdateContext = createContext<
  ProjectUpdateContextType | undefined
>(undefined);

export const ProjectUpdateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedProjectUpdate, setSelectedProjectUpdate] = useState<
    IProjectUpdates | undefined
  >();
  const [selectedComment, setSelecteComment] = useState<IComment | undefined>();

  const [visibleModal, setVisibleModal] = useState<
    "remove-comment" | "remove-project-update" | undefined
  >(undefined);

  function handleSelectedProjectUpdate(
    projectUpdate: IProjectUpdates | undefined,
  ) {
    setSelectedProjectUpdate(projectUpdate);
  }

  function handleSelectedComment(comment: IComment | undefined) {
    setSelecteComment(comment);
  }

  function handleSetVisibleModal(
    value: "remove-comment" | "remove-project-update" | undefined,
  ) {
    setVisibleModal(value);
  }

  const contextValue: ProjectUpdateContextType = {
    selectedProjectUpdate,
    handleSelectedProjectUpdate,
    visibleModal,
    handleSetVisibleModal,
    selectedComment,
    handleSelectedComment,
  };

  return (
    <ProjectUpdateContext.Provider value={contextValue}>
      {children}
    </ProjectUpdateContext.Provider>
  );
};

export const useProjectUpdateContext = () => {
  const context = useContext(ProjectUpdateContext);
  if (!context) {
    throw new Error(
      "useProjectUpdateContext deve ser usado dentro de um ProjectUpdateProvider",
    );
  }
  return context;
};
