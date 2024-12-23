import ModalProjectDetails from "@/components/ProjectsComponentCustomer/ModalProjectDetails/ModalProjectDetails";
import ProjectsComponentCustomer from "@/components/ProjectsComponentCustomer/ProjectjsComponentCustomer";

export default function CustomerProjects() {
  return (
    <main className="min-h-screen w-full">
      <ProjectsComponentCustomer />
      <ModalProjectDetails />
    </main>
  );
}
