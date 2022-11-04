export function loadScriptFacebook(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
      const existingScript = document.getElementById("facebook");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://connect.facebook.net/en_US/sdk.js";
        script.id = "facebook";
        document.body.appendChild(script);
        script.onload = () => {
          resolve(true);
        };
      }
      if (existingScript) resolve(true);
    } catch (e) {
      reject(false);
    }
  });
}
