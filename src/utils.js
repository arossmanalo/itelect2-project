
export const formatDate = (date) => `Due: ${date.toLocaleDateString()}`
console.log(formatDate(new Date("2026-07-22")))

export const validateTask=( {title,dueDate} = {} )=> Boolean(title && dueDate);
console.log(validateTask());

export const mergeTaskUpdate = (original,...updates) => Object.assign({},original,...updates);
console.log(mergeTaskUpdate({title:"Old"},{title:"New"}));