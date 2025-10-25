// Fix: Removed Node.js Buffer-based polyfills for btoa/atob which are not available in the browser.
// The `btoa` function is a standard browser API and can be used directly.
function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

export async function fileToGenerativePart(file: File) {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                // The result is an ArrayBuffer, convert it to Base64
                resolve(arrayBufferToBase64(reader.result as ArrayBuffer));
            } else {
                // Handle the case where reader.result is null, though it's unlikely with readAsArrayBuffer
                resolve('');
            }
        };
        reader.readAsArrayBuffer(file);
    });

    return {
        inlineData: {
            data: await base64EncodedDataPromise,
            mimeType: file.type,
        },
    };
}
