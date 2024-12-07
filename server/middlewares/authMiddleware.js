export function requireSessionAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }
  next();
}
