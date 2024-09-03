const adminMiddleware = {
  protectAdmin: (req, res, next) => {
    const apiKey = req.headers["authorization"];
    console.log("Received API Key:", apiKey); // Log received API key

    if (apiKey !== process.env.ADMIN_API_KEY) {
      return res.status(403).json({ error: "Forbidden: Invalid API key" });
    }

    next();
  },
};

module.exports = adminMiddleware;
