export default (req, res) => {
  const client_id = process.env.OAUTH_CLIENT_ID;
  
  if (!client_id) {
    return res.status(500).send("Error: Vercel settings mein OAUTH_CLIENT_ID nahi mil rahi. Project Settings > Environment Variables check karein.");
  }

  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`;
  res.redirect(url);
};
