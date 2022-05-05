export const login = async ({ email, password }) => {
  const promise = await new Promise((resolve, reject) => {
    if (email == "admin@login.com" && password == "admin@login.com") {
      const user = {
        id: "2f2376r6r3c93838",
        name: "John Doe",
        email: "JohnDoe@user.com",
        admin: true,
        token: "Bearer Auth token comes here",
      };
      resolve(user);
    } else {
      resolve(false);
    }
  });
  return promise;
};
