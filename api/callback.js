export default async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Error: GitHub se code nahi mila.");
  }

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).send(`GitHub Error: ${data.error_description || data.error}`);
    }

    // Ye script aapke admin panel ko "Login Success" ka signal degi
    const script = `
      <script>
        (function() {
          function recieveMessage(e) {
            console.log("Sending message back to opener...");
            window.opener.postMessage(
              'authorization:github:success:{"token":"${data.access_token}","provider":"github"}',
              e.origin
            );
          }
          window.addEventListener("message", recieveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })()
      </script>
    `;
    res.send(script);
  } catch (error) {
    res.status(500).send(`Server Error: ${error.message}`);
  }
};
