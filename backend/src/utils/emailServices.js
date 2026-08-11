import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl =
    `${process.env.FRONTEND_URL}/verify-email/${token}`;

  await transporter.sendMail({
    from: `"Export Salak" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Verifikasi Email - Export Salak",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Verifikasi Email Anda</h2>

        <p>
          Terima kasih telah mendaftar di Export Salak.
        </p>

        <p>
          Silakan klik tombol di bawah untuk memverifikasi alamat email Anda:
        </p>

        <a
          href="${verificationUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background-color: #16a34a;
            color: white;
            text-decoration: none;
            border-radius: 8px;
          "
        >
          Verifikasi Email
        </a>

        <p style="margin-top: 20px;">
          Jika Anda tidak merasa membuat akun, abaikan email ini.
        </p>
      </div>
    `,
  });
};