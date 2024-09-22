export const getDateName = (date: Date) => {
  const dateString = date.toDateString();
  if (dateString === new Date().toDateString()) {
    return 'Today';
  } else if (dateString === new Date(new Date().setDate(new Date().getDate() - 1)).toDateString()) {
    return 'Yesterday';
  } else if (dateString === new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()) {
    return 'Tomorrow';
  }
  return dateString;
};
