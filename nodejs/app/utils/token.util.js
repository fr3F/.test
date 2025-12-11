import jwt from "jsonwebtoken";

const SECRET = "secret-key";

export function genererToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "1d" }
  );
}
