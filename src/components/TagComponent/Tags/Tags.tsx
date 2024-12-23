import { useTagContext } from "@/context/TagContext";
import ModalCreateTag from "./ModalCreateTag/ModalCreateTag";
import ModalTags from "./ModalTags/ModalTags";
import ModalEditTag from "./ModalEditTag/ModalEditTag";
import ModalRemoveTag from "./ModalRemoveTag/ModalRemoveTag";

export default function Tags() {
  const { visibleModal } = useTagContext();
  const modals = [
    {
      id: "tags",
      component: <ModalTags />,
    },
    {
      id: "create",
      component: <ModalCreateTag />,
    },
    {
      id: "edit",
      component: <ModalEditTag />,
    },
    {
      id: "remove",
      component: <ModalRemoveTag />,
    },
  ];
  return (
    <>
      {modals.map((modal) => (
        <>{modal.id === visibleModal && modal.component}</>
      ))}
    </>
  );
}
