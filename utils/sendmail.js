const nodemailer = require('nodemailer');
const path = require('path');

// /* using mailtrap sandbox service -----------------------------
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASSWORD,
    },
});
// */

/* using gmail service ----------------------------------------
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    // 'true' fo port 465, 'false' for all other ports
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});
// */

// fnuction to give respective EmailTmplate ----------------------
const getEmailTemplate = (email, attachmentFileName) => {
    return {
        from: `synchrotek@iserveu.co.in`,
        to: email,
        subject: `Excel file uploaded and processed`,
        text: "Excel file uploaded and processed",
        html: `
    <div style="padding: 10px padding-bottom: 20px; text-align: start">
    <br>
    <h4 style="text-align: start; width: 100%;">
        The file that you have uploaded
        In our website is processed.
    </h4>
    <h5>Here is the log: </h5>
    <h6>That excel file is provided as an attachment with this email.</h6>
    </div>
    </p>
    <hr />
    <div>Team IserveU</div>
    </div>`,
        attachments: [
            {
                filename: 'syncedExcel.xlsx',
                path: path.join(
                    __dirname,
                    '..', 'constants', 'files',
                    attachmentFileName
                ),
                cid: 'uniq-mailtrap.png'
            }
        ]
    }
}

// Sending mail utility function ------------------------------
const sendMail = async ({ email, messageToShow = "email sent", attachmentFileName }) => {
    let responseToSend;
    await transporter.sendMail(getEmailTemplate(email, attachmentFileName))
        .then(() => {
            // console.log("EMAIL SENT", emailSent);
            responseToSend = {
                success: true,
                message: messageToShow
            }
        }).catch(err => {
            responseToSend = {
                success: false,
                message: err.message
            }
        });
    return responseToSend;
}

module.exports = sendMail;