import { patch } from "@/services/methods/patch";
import { get } from "../../methods/get";

export default async function NotificationsService() {
  async function fetchNotifications(): Promise<INotification[]> {
    const response = await get<{notifications: INotification[]}>(`/notifications`);
    return response.notifications
  }

  async function readNotification(notificationId: string): Promise<void> {
    await patch(`/notifications/${notificationId}/read`);
  }

  return {
    fetchNotifications,
    readNotification,
  };
}
