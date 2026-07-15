 console.log('Server starting...');

 import {formatDate, validateTask, mergeTaskUpdate} from './utils.js';

 console.log(formatDate(new Date("2026-07-22")));
 console.log(validateTask());
 console.log(mergeTaskUpdate({title:"Old"},{title:"New"}));
