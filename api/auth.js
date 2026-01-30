export default (req, res) => {
  // Ye line aapki Vercel settings se Client ID uthayegi
  const client_id = process.env.OAUTH_CLIENT_ID;

  // Agar ID nahi mili toh ye error dikhayega
  if (!client_id) {
    return res.status(500).send("Error: OAUTH_CLIENT_ID is missing in Vercel Environment Variables.");
  }

  // Ye GitHub ke login page par redirect karega
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`;
  
  res.redirect(url);
};
