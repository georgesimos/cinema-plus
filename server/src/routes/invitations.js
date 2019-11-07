const express = require('express')
const mail = require('../utils/mail')

const router = new express.Router()

const createMailOptions = (data) => {
    const {to, host, movie, time, cinema, seat} = data;

    const htmlContent = `
                <h1><strong>Invitation For Movie</strong></h1>
                <p>Hi, You have been invited by ${host}</p>
                <p>Movie name: ${movie}</p>
                <p>Time name: ${time}</p>
                <p>Cinema name: ${cinema}</p>
                <p>Cinema seat: ${seat}</p>
                <br/>
              `;
    return  {
                from: 'geosimos91@gmail.com',
                to,
                subject: 'Movie + Invitation',
                html: htmlContent
              }
    
}

// Send Invitation Emails
router.post('/invitations', async (req, res) => {
    const invitations = req.body;
    invitations.forEach(invitation => {
      const mailOptions = createMailOptions(invitation);
      mail.sendEMail(mailOptions)
      .then(email => res.status(201).json({ success: true, msg: 'Mail sent' }) )
      .catch( (exception) => {
       res.status(200).json({ success: false, msg: exception });
   });
    })
})

module.exports = router