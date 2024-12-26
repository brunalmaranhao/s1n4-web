"use client";
import { useProjectContext } from "@/context/ProjectContext";
import { useEffect, useState } from "react";
import CardListProject from "./CardListProject/CardListProject";
import SkeletonCardListProject from "../SkeletonCardListProject/SkeletonCardListProject";

export default function ProjectsComponent() {
  const { listProjects, fetchListProjectByUser } = useProjectContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    await fetchListProjectByUser();
    setLoading(false);
  }

  return (
    <div className="w-full flex items-center justify-center mt-2">
      <div className="flex md:flex-row flex-col gap-3 p-3 w-full max-w-[1200px] overflow-x-auto [&::-webkit-scrollbar]:h-3
[&::-webkit-scrollbar-track]:bg-gray-100
[&::-webkit-scrollbar-thumb]:bg-gray-300
dark:[&::-webkit-scrollbar-track]:bg-neutral-700
dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        {listProjects.length > 0 ? (
          <>
            {listProjects.map((listProject, index) => (
              <div key={listProject.id} className={`w-[360px] flex-shrink-0 `}>
                <CardListProject
                  projects={listProject.projects}
                  name={listProject.name}
                  listProjectId={listProject.id}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            {loading ? (
              <SkeletonCardListProject />
            ) : (
              <p className="text-black dark:text-white">
                Não existem projetos cadastrados.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
