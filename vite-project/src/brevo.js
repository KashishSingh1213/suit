/**
 * Sends a transactional email containing the verification OTP code using Brevo API
 */
export async function sendBrevoOtp(toEmail, otpCode) {
  const apiKey = "YOUR_BREVO_API_KEY"; // Replace with your actual Brevo API key
  
  if (apiKey === "YOUR_BREVO_API_KEY" || !apiKey) {
    console.warn("Brevo API Key is not configured. Falling back to local debug simulation mode.");
    return false; // Indicates simulation fallback
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: "Gurnaaz Luxury", email: "info@gurnaaz.com" },
        to: [{ email: toEmail }],
        subject: "Your Gurnaaz Verification Code",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #111111; max-width: 600px; margin: 0 auto; border: 1px solid #BCA58A;">
            <h2 style="color: #BCA58A; font-weight: normal; border-bottom: 1px solid #BCA58A; padding-bottom: 10px;">Gurnaaz Luxury Verification</h2>
            <p>Welcome to Gurnaaz Luxury Couture.</p>
            <p>Your one-time password (OTP) verification code is:</p>
            <div style="background: #FAF9F6; border: 1px solid rgba(188, 165, 138, 0.2); padding: 15px; font-size: 24px; font-weight: bold; text-align: center; letter-spacing: 5px; color: #111111; margin: 20px 0;">
              ${otpCode}
            </div>
            <p style="font-size: 12px; color: #6B6B6B;">This code is valid for 10 minutes. If you did not request this code, please ignore this email.</p>
          </div>
        `
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Brevo API Error: ${response.status} - ${errorText}`);
    }
    
    console.log("Brevo OTP Email sent successfully!");
    return true;
  } catch (error) {
    console.error("Error sending OTP email via Brevo: ", error);
    return false;
  }
}
