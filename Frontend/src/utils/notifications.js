const NOTIFICATIONS_KEY = "quizora_notifications";

export function addNotification(message, type = "info") {
  const notifications = getNotifications();
  const notification = {
    id: Date.now().toString(),
    message,
    type,
    timestamp: new Date().toISOString(),
    read: false,
  };
  notifications.unshift(notification);
  if (notifications.length > 50) {
    notifications.length = 50;
  }
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  return notification;
}

export function getNotifications() {
  try {
    return JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function markAllAsRead() {
  const notifications = getNotifications();
  notifications.forEach((n) => (n.read = true));
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

export function clearNotifications() {
  localStorage.removeItem(NOTIFICATIONS_KEY);
}
