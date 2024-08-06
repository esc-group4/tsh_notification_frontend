export default async function registerUser(name, id) {
   
  if (name === null ) {
        console.log("user did not enter any input");
        return null;
    }
    try {
        const response = await fetch(`http://localhost:3001/staff/submit/${name}/${id}`);
        if (response.ok === false) {
          throw new Error('Network response was not ok');
        }
        console.log("User is registered");
        return name;
      } catch (error) {
        console.error('Error registering user', error);
        return null;
      }
};