const pipedreamUrl =
  "https://en5tlw72m73t4fb.m.pipedream.net";

export const submitForm = async (form: HTMLFormElement) => {
  try {
    let requestBody = new FormData(form);
    const res = await fetch(pipedreamUrl, {
      method: "POST",
      body: requestBody,
    });
    return res;
  } catch (error) {
    console.log("Something went wrong - ", error);
  }
};
