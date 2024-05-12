// import jwt from 'jsonwebtoken';

// export const generateToken = (user) => {
//   return jwt.sign(
//     {
//       _id: user._id,
//        : user. ,
//       name: user.name,
//       email: user.email,
//       department: user.department,
//       year: user.year,
//       section: user.section,
//       isAdmin: user.isAdmin,
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: '30d',
//     }
//   );
// };

// export const isAuth = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (authorization) {
//     const token = authorization.slice(7, authorization.length);
//     jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       if (err) {
//         res.status(404).send({ message: 'Invalid Token' });
//       } else {
//         req.user = decode;
//         next();
//       }
//     });
//   } else {
//     res.status(404).send({ message: 'No Token' });
//   }
// };



import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
     
      name: user.name,
      email: user.email,
      // password: user.password,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'default_secret_key', // Provide a default value
    {
      expiresIn: '1d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key', (err, decode) => {
      if (err) {
        res.status(404).send({ message: 'Invalid Token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(404).send({ message: 'No Token' });
  }
};
