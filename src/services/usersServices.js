// const fs = require('fs');
// const path = require('path');
// const bcrypt = require('bcrypt');

// const usersFilePath = path.join(__dirname, '../data/users.json');

// const userService = {
//   register: async (username, password, email, birthDate, address, profile, avatar) => {
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);

//       const usersData = fs.readFileSync(usersFilePath, 'utf-8');
//       const data = JSON.parse(usersData);

//       if (!Array.isArray(data.users)) {
//         console.error('Users is not an array:', data.users);
//         throw new Error('Internal Server Error');
//       }

//       const id = data.users.length + 1;

//       const newUser = {
//         id,
//         username,
//         password: hashedPassword,
//         email,
//         birthDate,
//         address,
//         profile,
//         avatar,
//       };

//       data.users.push(newUser);

//       fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), 'utf-8');

//       return newUser;
//     } catch (error) {
//       console.error('Error al registrar usuario:', error);
//       throw new Error('Internal Server Error');
//     }
//   },

//   authenticate: async (username, password) => {
//     try {
//       const usersData = fs.readFileSync(usersFilePath, 'utf-8');
//       const users = JSON.parse(usersData).users;

//       const user = users.find((u) => u.username === username);

//       if (!user) {
//         return null;
//       }

//       const isPasswordValid = await bcrypt.compare(password, user.password);

//       if (!isPasswordValid) {
//         return null;
//       }

//       return user;
//     } catch (error) {
//       console.error('Error al autenticar usuario:', error);
//       throw new Error('Internal Server Error');
//     }
//   },
// };

// module.exports = userService;