 console.log('Server starting...');

import { formatDate, validateTask, mergeTaskUpdate, createTask, TaskValidationError } from './utils.js';
import { fetchSampleUsers } from './api.js';
 console.log(formatDate(new Date("2026-07-22")));
 console.log(validateTask());
 console.log(mergeTaskUpdate({title:"Old"},{title:"New"}));


 async function run() {
  try {
    console.log('\n--- Fetching Sample Users ---');
    const users = await fetchSampleUsers();
    console.log('Fetched Users:', users);

    console.log('\n--- Creating Task ---');
    const newTask = createTask({
      title: "Complete GT4 Assignment",
      dueDate: new Date("2026-07-29")
    });
    console.log('Created Task:', newTask);

  } catch (error) {
    if (error instanceof TaskValidationError) {
      console.error('Task Validation Failed:', error.name, '-', error.message);
    } else {
      console.error('Unexpected Application Error:', error.message);
    }
  }
}

run();