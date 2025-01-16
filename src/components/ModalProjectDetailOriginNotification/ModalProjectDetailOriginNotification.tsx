"use client";
import RichTextViewer from "@/components/RichTextViewer/RichTextViewer";
import TagComponent from "@/components/TagComponent/TagComponent";
import { useProjectContext } from "@/context/ProjectContext";
import { useTagContext } from "@/context/TagContext";
import { formatter } from "@/util/formatter";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import {
  MdAttachMoney,
  MdOutlineTableChart,
  MdSpeakerNotes,
  MdSubject,
} from "react-icons/md";
import ProjectUpdateOriginNotification from "./ProjectUpdateComponent/ProjectUpdateOriginNotification";

type ModalProjectDetailOriginNotificationProps = {
  project: IProject;
  isOpenModal: boolean
  onClose: () => void
};

export default function  ModalNotification({
  project,
  isOpenModal,
  onClose
}: ModalProjectDetailOriginNotificationProps) {
  const { handleCleanTagsProject } = useTagContext();

 

  return (
    <Modal
      isOpen={isOpenModal}
      onOpenChange={onClose}
      size="xl"
      className="bg-[#F2F4F8] dark:bg-[#1e1e1e]"
      placement="top"
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent className="text-black dark:text-white">
        {(onClose) => (
          <>
            <ModalHeader className="mb-[-10px]">
              <div className="flex flex-col gap-2">
                <div className="flex w-full gap-1  items-start">
                  <MdOutlineTableChart className="text-[#F57B00] text-[24px] mt-[1px]" />
                  <p className="text-[24px] font-bold max-w-[250px] truncate">
                    {project?.name}
                  </p>
                </div>
                <div className="flex items-center gap-3 ml-7">
                  <p className="text-[16px] font-normal">Status:</p>
                  <Button className="bg-[#23CF5C] cursor-default p-0 px-4 h-7 text-[12px] dark:text-white">
                    {project?.listProjects?.name}{" "}
                    <IoChevronDownSharp />
                  </Button>
                </div>
              </div>
            </ModalHeader>
            <ModalBody
              className="flex flex-col gap-2 text-black dark:text-white [&::-webkit-scrollbar]:w-2
[&::-webkit-scrollbar-track]:bg-gray-100
[&::-webkit-scrollbar-thumb]:bg-gray-300
dark:[&::-webkit-scrollbar-track]:bg-neutral-700
dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            >
              <Divider />
              <TagComponent isCustomerUser={true} />
              <Divider />
              <div className="flex flex-col">
                <div className="flex gap-1 items-center">
                  <MdAttachMoney className="text-[#F57B00] text-[24px]" />
                  <h2 className="text-[24px] font-bold">Budget do projeto</h2>
                </div>
                <p className="text-[16px] font-normal ml-7">
                  {project?.budget &&
                    formatter.format(project?.budget)}
                </p>
              </div>

              <Divider />

              <div
                className={`flex pr-5 flex-col ${
                  project?.description
                    ? "min-h-[100px] max-h-[250px] h-full"
                    : "h-[100px]"
                }  overflow-y-auto [&::-webkit-scrollbar]:w-2
[&::-webkit-scrollbar-track]:bg-gray-100
[&::-webkit-scrollbar-thumb]:bg-gray-300
dark:[&::-webkit-scrollbar-track]:bg-neutral-700
dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 `}
              >
                <div className="flex gap-1 items-center">
                  <MdSubject className="text-[#F57B00] text-[24px]" />
                  <h2 className="text-[24px] font-bold">Descrição</h2>
                </div>
                {project?.description && (
                  <div className="ml-7 mt-2">
                    <RichTextViewer
                      content={project?.description}
                    />
                  </div>
                )}
              </div>

              <Divider />
              <div className="flex flex-col">
                <div className="flex gap-1 items-center">
                  <MdSpeakerNotes className="text-[#F57B00] text-[24px]" />
                  <h2 className="text-[24px] font-bold">Atividades</h2>
                </div>
                <div className="flex-col ml-7 mt-3">
                  <ProjectUpdateOriginNotification project={project} />
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
