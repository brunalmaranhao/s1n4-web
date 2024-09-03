import { Badge } from "@nextui-org/react";
import { MdNotifications } from "react-icons/md";

export default function Notification() {
  return (
    <>
      <Badge content="5" color="danger" shape="rectangle" showOutline={false}>
        <MdNotifications size={22} />
      </Badge>
    </>
  );
}
