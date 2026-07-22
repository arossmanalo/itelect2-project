
export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`
console.log(formatDate(new Date("2026-07-22")))

export const validateTask=( {title,dueDate} = {} )=> Boolean(title && dueDate);
console.log(validateTask());

export const mergeTaskUpdate = (original,...updates) => Object.assign({},original,...updates);
console.log(mergeTaskUpdate({title:"Old"},{title:"New"}));

export class TaskValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "TaskValidationError";
  }
}

export function createTask(taskData) {
  const isValid = validateTask(taskData);

  if (!isValid) {
    throw new TaskValidationError("Invalid task data");
  }

  return {
    id: Date.now(),
    completed: false,
    ...taskData,
  };
}