
type CardProjectProps = {
  project: IProject;
};

export default function CardProject({ project }: CardProjectProps) {
  return (
    <div
      key={project.id}
      className="bg-white p-2 my-2 flex flex-col gap-1 rounded-md text-black"
    >
      <div className="flex flex-row justify-between text-black">
        <p className="text-xs">{project.customer.corporateName}</p>
        {/* <ActionsCardProject project={project} /> */}
      </div>
      <p className="text-md">{project.name}</p>
    </div>
  );
}
