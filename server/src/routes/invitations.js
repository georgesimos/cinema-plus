const express = require('express');
const auth = require('../middlewares/auth');
const mail = require('../utils/mail');

const router = new express.Router();

const createMailOptions = (data) => {
  const { to, host, movie, date, time, cinema, image, seat } = data;

  const htmlContent = `
                <h1><strong>Invitation For Movie</strong></h1>
                <p>Hi, You have been invited by ${host}</p>
                <p>Movie name: ${movie}</p>
                <p>Date: ${date}</p>
                <p>Time: ${time}</p>
                <p>Cinema name: ${cinema}</p>
                <p>Cinema seat: ${seat}</p>
                <img src="${image}" alt="cinema Image"/>
                <br/>
              `;
  return {
    from: 'geosimos91@gmail.com',
    to,
    subject: 'Cinema + Invitation',
    html: htmlContent,
  };
};

// Send Invitation Emails
router.post('/invitations', auth.simple, async (req, res) => {
  const invitations = req.body;
  const promises = invitations.map((invitation) => {
    const mailOptions = createMailOptions(invitation);
    return mail
      .sendEMail(mailOptions)
      .then(() => ({
        success: true,
        msg: `The Invitation to ${mailOptions.to} was sent!`,
      }))
      .catch((exception) => ({ success: false, msg: exception }));
  });

  Promise.all(promises).then((result) => res.status(201).json(result));
});
module.exports = router;
