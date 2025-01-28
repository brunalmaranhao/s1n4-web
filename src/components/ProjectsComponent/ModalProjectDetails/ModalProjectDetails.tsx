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
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";
import debounce from "lodash.debounce";
import { IoChevronDownSharp } from "react-icons/io5";
import {
  MdAccountCircle,
  MdAttachMoney,
  MdCalendarMonth,
  MdOutlineTableChart,
  MdSpeakerNotes,
  MdSubject,
} from "react-icons/md";
import ProjectUpdateComponent from "../ProjectUpdateComponent/ProjectUpdateComponent";
import { useEffect, useState } from "react";
import ProjectsService from "@/services/models/projects";
import { handleAxiosError } from "@/services/error";
import toast from "react-hot-toast";
import MoveProject from "./MoveProject/MoveProject";
import { format } from "date-fns";
import ProjectDateComponent from "@/components/ProjectDateComponent/ProjectDateComponent";
import ResponsibleProjectComponent from "@/components/ReponsiblesProject/ResponsibleProject";

export default function ModalProjectDetails() {
  const {
    selectedProjectEdit,
    setSelectedProjectEdit,
    isOpenModalProjectDetails,
    onCloseModalProjectDetails,
    fetchListProjectByCustomer,
    selectedCustomerFilter,
    setListProjectName,
    listProjectName,
  } = useProjectContext();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { handleCleanTagsProject } = useTagContext();
  const [currentName, setCurrentName] = useState(selectedProjectEdit?.name);
  function onClose() {
    onCloseModalProjectDetails();
    setSelectedProjectEdit(undefined);
    handleCleanTagsProject();
    if (selectedCustomerFilter) {
      fetchListProjectByCustomer(selectedCustomerFilter);
    }
  }

  useEffect(() => {
    if (selectedProjectEdit) {
      setCurrentName(selectedProjectEdit.name);
      setListProjectName(selectedProjectEdit.listProjects.name);
    }
  }, [selectedProjectEdit]);

  useEffect(() => {
    if (currentName && currentName !== selectedProjectEdit?.name) {
      debouncedUpdateName(currentName);
    }
    return () => {
      debouncedUpdateName.cancel();
    };
  }, [currentName]);

  const debouncedUpdateName = debounce(handleEditName, 300);

  async function handleEditName(updatedName: string) {
    if (!updatedName.trim() || !selectedProjectEdit) {
      return;
    }
    try {
      const { updateName } = await ProjectsService();
      await updateName(selectedProjectEdit.id, updatedName);
    } catch (error) {
      const customError = handleAxiosError(error);
      toast.error(customError.message);
    }
  }

  return (
    <Modal
      isOpen={isOpenModalProjectDetails}
      onOpenChange={onClose}
      size="2xl"
      className="bg-[#F2F4F8] dark:bg-[#1e1e1e]"
      placement="top"
      scrollBehavior="inside"
      backdrop="blur"
    >
      <ModalContent className="text-black dark:text-white">
        {(onClose) => (
          <>
            <ModalHeader className="mb-[-10px] w-full">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex w-full gap-1  items-start">
                  <MdOutlineTableChart className="text-[#F57B00] text-[24px] mt-[1px]" />
                  {/* <p className="text-[24px] font-bold max-w-[500px] truncate">
                    {selectedProjectEdit?.name}
                  </p> */}
                  <input
                    className="text-black dark:text-white text-[24px] bg-transparent outline-none w-full"
                    value={currentName}
                    onChange={(e) => setCurrentName(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3 ml-7">
                  <p className="text-[16px] font-normal">
                    {selectedProjectEdit?.customer?.name}
                  </p>
                  <div className="w-[4px] h-[4px] rounded-full bg-[#878D96]" />
                  <p className="text-[16px] font-normal">Status:</p>
                  <Popover
                    shadow="lg"
                    offset={10}
                    isOpen={isPopoverOpen}
                    placement="bottom"
                    shouldBlockScroll={false}
                    onOpenChange={setIsPopoverOpen}
                  >
                    <PopoverTrigger>
                      <Button
                        className="bg-[#23CF5C] p-0 px-4 h-7 text-[12px] dark:text-white"
                        onClick={() => setIsPopoverOpen(true)}
                      >
                        {listProjectName}
                        <IoChevronDownSharp />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[380px]">
                      {(titleProps) => (
                        <>
                          {selectedProjectEdit && (
                            <MoveProject
                              listProject={selectedProjectEdit.listProjects}
                              projectId={selectedProjectEdit.id}
                              onClose={() => setIsPopoverOpen(false)}
                            />
                          )}
                        </>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </ModalHeader>
            <ModalBody
              className="mb-10 flex flex-col gap-2 text-black dark:text-white [&::-webkit-scrollbar]:w-2
[&::-webkit-scrollbar-track]:bg-gray-100
[&::-webkit-scrollbar-thumb]:bg-gray-300
dark:[&::-webkit-scrollbar-track]:bg-neutral-700
dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            >
              <Divider />
              <div className="flex w-full">
                {/* Tags */}
                <div className="w-[49%]">
                  <TagComponent />
                </div>

                <div>
                  <Divider orientation="vertical" />
                </div>
                {/* Inicio e fim do projeto */}
                <div className="w-[49%] pl-6">
                  {selectedProjectEdit?.start &&
                    selectedProjectEdit?.deadline && (
                      <ProjectDateComponent
                        start={selectedProjectEdit?.start}
                        deadline={selectedProjectEdit?.deadline}
                      />
                    )}
                </div>
              </div>

              <Divider />
              {/* Responsáveis */}
              <div className="flex w-full">
                <div className="w-[49%]">
                  <ResponsibleProjectComponent
                    responsibles={
                      selectedProjectEdit?.customer?.responsibleParties
                    }
                  />
                </div>
                <div>
                  <Divider orientation="vertical" />
                </div>
                {/* Budget */}
                <div className="flex flex-col w-[49%] pl-6">
                  <div className="flex gap-1 items-center">
                    <MdAttachMoney className="text-[#F57B00] text-[24px]" />
                    <h2 className="text-[24px] font-bold">Budget do projeto</h2>
                  </div>
                  <p className="text-[16px] font-normal ml-7">
                    {selectedProjectEdit?.budget &&
                      formatter.format(selectedProjectEdit?.budget)}
                  </p>
                </div>
              </div>

              {/* Description */}
              <Divider />
              {selectedProjectEdit?.description && (
                <div
                  className="flex pr-5 flex-col min-h-[100px] max-h-[320px] overflow-y-auto [&::-webkit-scrollbar]:w-2
[&::-webkit-scrollbar-track]:bg-gray-100
[&::-webkit-scrollbar-thumb]:bg-gray-300
dark:[&::-webkit-scrollbar-track]:bg-neutral-700
dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 "
                >
                  <div className="flex gap-1 items-center">
                    <MdSubject className="text-[#F57B00] text-[24px]" />
                    <h2 className="text-[24px] font-bold">Descrição</h2>
                  </div>
                  <div className="ml-7 mt-2">
                    <RichTextViewer
                      content={selectedProjectEdit?.description}
                    />
                  </div>
                </div>
              )}

              {/* Tasks */}
              <Divider />
              <div className="flex flex-col">
                <div className="flex gap-1 items-center">
                  <MdSpeakerNotes className="text-[#F57B00] text-[24px]" />
                  <h2 className="text-[24px] font-bold">Atividades</h2>
                </div>

                <div className="flex-col ml-7 mt-3">
                  <ProjectUpdateComponent />
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
