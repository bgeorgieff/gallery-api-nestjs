export const Email = {
  sender: process.env.SENDER_EMAIL,
  to: process.env.EMAIL_STR,
  subject: (user: string) => {
    return `You have new message from ${user}`;
  },
  body: (message: string, paintingId: string) =>
    `<div>This is about painting <b>${paintingId}</b></div>
     <div>${message}</div>`,
} as const;
