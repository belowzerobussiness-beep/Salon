export default (req, res) => {
  const client_id = process.env.OAUTH_CLIENT_ID || "VARIABLE_NAHI_MILA";
  res.send("Client ID status: " + client_id);
};
