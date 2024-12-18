"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";
import { useDisclosure } from "@nextui-org/react";

type TagContextType = {
  selectedTag?: ITag;
  handleSelectedTag: (tag: ITag | undefined) => void;
  visibleModal: "create" | "edit" | "remove" | "tags";
  handleSelectedVisibleModal: (
    value: "create" | "edit" | "remove" | "tags"
  ) => void;
  tagsCreated: ITag[];
  tags: ITag[];
  handleSetTags: (tags: ITag[]) => void;
  handleSetTagsCreated: (data: ITag) => void;
  handleCleanTagsCreated: () => void;
  handleUpdateTag: (data: { id: string; name: string; color: string }) => void;
  handleRemoveTag: (tag: ITag) => void
  handleCleanTagsProject: () => void
};

const TagContext = createContext<TagContextType | undefined>(undefined);

export const TagProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedTag, setSelectedTag] = useState<ITag | undefined>();
  const [tagsCreated, setTagsCreated] = useState<ITag[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);

  const [visibleModal, setVisibleModal] = useState<
    "create" | "edit" | "remove" | "tags"
  >("tags");

  function handleSelectedTag(tag: ITag | undefined) {
    setSelectedTag(tag);
  }

  function handleRemoveTag(tag: ITag){
    const tagsFiltered = tags.filter((item) => item.id !== tag.id)
    setTags(tagsFiltered)
  }

  function handleSetTagsCreated(data: ITag) {
    const existTag = tags.find((item) => item.id === data.id)
    if(existTag) return
    setTagsCreated((prevState) => [
      ...prevState,
      {
        id: data.id,
        name: data.name,
        color: data.color,
        customerId: data.customerId,
        createdAt: data.createdAt,
        status: data.status,
      },
    ]);
    
    
    setTags((prevState) => [...prevState, data]);
  }

  function handleSetTags(tags: ITag[]) {
    setTags(tags);
  }

  function handleUpdateTag(data: { id: string; name: string; color: string }) {
    for (let tag of tags) {
      if (tag.id === data.id) {
        tag.name = data.name;
        tag.color = data.color;
      }
    }
  }

  function handleSelectedVisibleModal(
    value: "create" | "edit" | "remove" | "tags"
  ) {
    setVisibleModal(value);
  }
  function handleCleanTagsCreated() {
    setTagsCreated([]);
  }

  function handleCleanTagsProject() {
    setTags([]);
  }

  const contextValue: TagContextType = {
    selectedTag,
    handleSelectedTag,
    visibleModal,
    handleSelectedVisibleModal,
    handleSetTagsCreated,
    tagsCreated,
    handleCleanTagsCreated,
    handleSetTags,
    handleUpdateTag,
    tags,
    handleRemoveTag,
    handleCleanTagsProject
  };

  return (
    <TagContext.Provider value={contextValue}>{children}</TagContext.Provider>
  );
};

export const useTagContext = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTagContext deve ser usado dentro de um TagProvider");
  }
  return context;
};
