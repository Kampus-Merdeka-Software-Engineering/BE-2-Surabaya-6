const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
module.exports = prisma;

const { hash } = require('bcrypt');


async function createuser(req, res) {
  const { name, email, password } = req.body;

  try {
    // Periksa apakah pengguna dengan email tersebut sudah ada
    const existingUserByEmail = await prisma.users.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return res.status(409).json({ user: null, message: "User with this email already exists" });
    }

    // Buat pengguna baru
    const hashedPassword = await hash (password, 10)
    const newUser = await prisma.users.create({
      data: {
        name, email, password: hashedPassword
      },
    });
    return res.status(201).json({ user: newUser, message: "User created successfully" });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ user: null, message: "Internal server error" });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Temukan pengguna berdasarkan email
    const existingUser = await prisma.users.findUnique({
      where: { email: email },
    });

    // Periksa apakah pengguna ditemukan dan kata sandi cocok
    if (!existingUser || !(await comparePassword(password, existingUser.password))) {
      return res.status(401).json({ user: null, message: "Invalid email or password" });
    }

    // Kirim respons berhasil
    return res.status(200).json({ user: existingUser, message: "Login successful" });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ user: null, message: "Internal server error" });
  }
}

// Fungsi bantu untuk membandingkan kata sandi
async function comparePassword(inputPassword, hashedPassword) {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing passwords: ' + error.message);
  }
}


async function getusers(req, res) {
  try {
    const posts = await prisma.users.findMany();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


async function resetPassword(req, res) {
  const { email, newPassword } = req.body;

  try {
      // Check if the user with the provided email exists
      const user = await prisma.users.findUnique({
          where: { email: email },
      });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      console.log('Before hashing:', newPassword);

      // Hash the new password
      const hashedPassword = await hash(newPassword, 10);

      console.log('After hashing:', hashedPassword);

      // Update the user's password
      await prisma.users.update({
          where: { id: user.id },
          data: { password: hashedPassword },
      });

      res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = { createuser,getusers, loginUser, comparePassword, resetPassword };


// async function getuserbyid(req, res) {
//   const postId = parseInt(req.params.id);

//   try {
//     const post = await prisma.users.findUnique({
//       where: {
//         id: postId,
//       },
//     });

//     if (post) {
//       res.status(200).json(post);
//     } else {
//       res.status(404).json({ error: 'Post not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

