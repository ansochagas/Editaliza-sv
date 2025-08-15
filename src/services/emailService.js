const sgMail = require('@sendgrid/mail');

if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log('✅ SendGrid API Key configurada.');
} else {
    console.warn('⚠️ SENDGRID_API_KEY não configurada. O envio de e-mails será desativado.');
}

const sendEmail = async (to, subject, htmlContent, textContent) => {
    if (!process.env.SENDGRID_API_KEY) {
        console.error('Erro: SENDGRID_API_KEY não está configurada. E-mail não enviado para', to);
        return;
    }

    const msg = {
        to: to,
        from: {
            email: process.env.SENDGRID_FROM_EMAIL || 'nao-responda@editaliza.com.br',
            name: process.env.SENDGRID_FROM_NAME || 'Equipe Editaliza'
        },
        subject: subject,
        html: htmlContent,
        text: textContent || htmlContent.replace(/<[^>]*>?/gm, ''), // Fallback para texto simples
    };

    try {
        await sgMail.send(msg);
        console.log('E-mail enviado com sucesso para', to);
    } catch (error) {
        console.error('Erro ao enviar e-mail para', to, ':', error.response?.body || error.message);
        if (error.response) {
            console.error(error.response.body);
        }
        throw new Error('Falha ao enviar e-mail.');
    }
};

// Função específica para redefinição de senha
const sendPasswordResetEmail = async (userEmail, resetToken) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password.html?token=${resetToken}`;
    const subject = 'Redefinição de Senha - Editaliza';
    const htmlContent = `
        <p>Olá,</p>
        <p>Recebemos uma solicitação para redefinir a senha da sua conta Editaliza.</p>
        <p>Para redefinir sua senha, clique no link abaixo:</p>
        <p><a href="${resetLink}">Redefinir Senha</a></p>
        <p>Se você não solicitou esta redefinição, por favor, ignore este e-mail.</p>
        <p>Este link expirará em 1 hora.</p>
        <p>Atenciosamente,</p>
        <p>Equipe Editaliza</p>
    `;
    const textContent = `Olá,

Recebemos uma solicitação para redefinir a senha da sua conta Editaliza.

Para redefinir sua senha, clique no link: ${resetLink}

Se você não solicitou esta redefinição, por favor, ignore este e-mail.

Este link expirará em 1 hora.

Atenciosamente,
Equipe Editaliza`;

    await sendEmail(userEmail, subject, htmlContent, textContent);
};

module.exports = {
    sendEmail,
    sendPasswordResetEmail
};
