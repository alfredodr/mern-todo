const htmlEmailReset = ({ url, text }) => {
  return `
      <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%; ">
          <h1 style="text-align: center;">Mern Auth Password Reset Request.</h1>
  
          <p>Someone requested a password reset for your account. If this was you, please click below to reset your password.</p>
  
          <a href=${url} style="background: #006400; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${text}</a>
  
          <p>If the button doesn't work for any reason, you can also click on the link below:</p>
  
          <a href=${url}>${url}</a>
      </div>
    `;
};

export default htmlEmailReset;
