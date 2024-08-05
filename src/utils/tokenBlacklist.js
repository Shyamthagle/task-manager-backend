const blacklistedTokens = new Set(); // In-memory store for blacklisted tokens

// Add a token to the blacklist
const add = (token) => {
  blacklistedTokens.add(token);
};

// Check if a token is blacklisted
const isBlacklisted = (token) => {
  return blacklistedTokens.has(token);
};

module.exports = {
  add,
  isBlacklisted,
};
