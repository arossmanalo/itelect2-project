export async function fetchSampleUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return [];
  } finally {
    console.log("fetchSampleUsers operation completed.");
  }
}

export function fetchSampleUsersPromise() {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((users) => {
      return users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }));
    })
    .catch((error) => {
      console.error("Error fetching users:", error.message);
      return [];
    });
}