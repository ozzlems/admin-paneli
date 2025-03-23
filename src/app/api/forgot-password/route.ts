import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'E-posta adresi gereklidir.' },
        { status: 400 }
      );
    }

    // Geçici şifre oluşturma
    const temporaryPassword = Math.random().toString(36).slice(-8);

    // Nodemailer transporter oluşturma
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Test the connection
    try {
      await transporter.verify();
    } catch (error: any) {
      console.error('SMTP connection error:', error);
      return NextResponse.json(
        { 
          message: 'E-posta sunucusuna bağlanılamadı.',
          error: error.message,
          details: 'Lütfen e-posta yapılandırmasını kontrol edin.'
        },
        { status: 500 }
      );
    }

    // E-posta gönderme işlemi
    const mailOptions = {
      from: `"Akdeniz Üniversitesi" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Şifre Sıfırlama',
      html: `
        <h2>Şifre Sıfırlama</h2>
        <p>Merhaba,</p>
        <p>Şifrenizi sıfırlamak için aşağıdaki geçici şifreyi kullanabilirsiniz:</p>
        <h3>${temporaryPassword}</h3>
        <p>Bu şifreyi kullandıktan sonra lütfen güvenliğiniz için şifrenizi değiştirin.</p>
        <p>Eğer bu isteği siz yapmadıysanız, lütfen bu e-postayı dikkate almayın.</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json(
        { message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.' },
        { status: 200 }
      );
    } catch (error: any) {
      console.error('Mail sending error:', error);
      return NextResponse.json(
        { 
          message: 'E-posta gönderilirken bir hata oluştu.',
          error: error.message,
          details: 'Lütfen daha sonra tekrar deneyin.'
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('General error:', error);
    return NextResponse.json(
      { 
        message: 'Bir hata oluştu.',
        error: error.message,
        details: 'Lütfen daha sonra tekrar deneyin.'
      },
      { status: 500 }
    );
  }
}