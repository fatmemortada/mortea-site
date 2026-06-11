// Mortéa Phase 27 — Notification System

function createNotification(userId, type, message) {
  const notification = {
    user_id: userId,
    notification_type: type,
    message,
    read: false,
    created_at: new Date().toISOString()
  };

  console.log("Notification created:", notification);
  return notification;
}

function markNotificationRead(notificationId) {
  console.log("Notification marked as read:", notificationId);
}
