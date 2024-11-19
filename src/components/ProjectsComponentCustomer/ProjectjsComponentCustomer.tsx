"use client";
import { useProjectContext } from "@/context/ProjectContext";
import { DragEvent, useEffect, useState } from "react";
import CardStatus from "./CardStatus/CardStatus";

export default function ProjectsComponentCustomer() {
  const { fetchProjectsByUser, projectsUser } = useProjectContext();

  useEffect(() => {
    fetchProjectsByUser();
  }, []);

  return (
    <div className="w-full flex items-center justify-center mt-2">
        <div className="flex md:flex-row flex-col gap-3 max-w-[1200px] w-full md:justify-between md:items-start items-center">
        <div className="md:max-w-[380px] max-w-[20px] w-full">
          <CardStatus
            status={"WAITING"}
            projects={projectsUser?.filter(
              (item) => item.statusProject === "WAITING",
            )}
          />
        </div>
        <div className="md:max-w-[380px] max-w-[220px] w-full">
          <CardStatus
            status={"IN_PROGRESS"}
            projects={projectsUser?.filter(
              (item) => item.statusProject === "IN_PROGRESS",
            )}
          />
        </div>
        <div className="md:max-w-[380px] max-w-[220px] w-full">
          <CardStatus
            status={"DONE"}
            projects={projectsUser?.filter(
              (item) => item.statusProject === "DONE",
            )}
          />
        </div>
      </div>
    </div>
  );
}
