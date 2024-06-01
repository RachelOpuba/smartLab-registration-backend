const HTML_TEMPLATE = (firstName, lastName, planName) => `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Confirmation</title>
</head>
<body>
    <div>
        <h2>Hello ${firstName} ${lastName},</h2>
        <p>Thank you for registering for the <strong>${planName}</strong> plan. We have received your payment and your registration is confirmed.</p>
        <p>Best regards,</p>
        <p>SmartLab</p>
    </div>
</body>
</html>
`;

module.exports = HTML_TEMPLATE;
