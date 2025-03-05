module.exports = (req, res, next) => {
  console.log("User role:", req.user.role); // Debug log

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};