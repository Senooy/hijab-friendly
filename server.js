const express = require('express');
const redaxios = require('redaxios');

const app = express();
const PORT = 5000;

app.use(express.json());

app.post('/verify-recaptcha', async (req, res) => {
    const { captchaValue } = req.body;

    try {
        const response = await redaxios.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: process.env.REACT_APP_GOOGLE_RECAPTCHA_SECRET_KEY,
                response: captchaValue
            }
        });

        const { success } = response.data;

        if (success) {
            res.json({ success: true, message: 'Captcha verified successfully.' });
        } else {
            res.json({ success: false, message: 'Failed to verify captcha.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
