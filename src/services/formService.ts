const pipedreamUrl = 'https://en5tlw72m73t4fb.m.pipedream.net';

// Returns true only when the endpoint confirms it received the message, so the
// UI never shows "thank you" for a message that was lost.
export const submitForm = async (form: HTMLFormElement): Promise<boolean> => {
  try {
    const res = await fetch(pipedreamUrl, {
      method: 'POST',
      body: new FormData(form),
    });
    return res.ok;
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return false;
  }
};
