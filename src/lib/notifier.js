export const success = (addNotification, {title, message}) => {
  addNotification({
    position: 'top-right',
    heading: title,
    type: 'success',
    text: message,
    removeAfter: 4000
  });
}

export const error = (addNotification, {title, message}) => {
  addNotification({
    position: 'top-right',
    heading: title,
    type: 'error',
    text: message,
    removeAfter: 4000
  });
}
