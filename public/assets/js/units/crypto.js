export async function decryptPrivateKey(file, password) { // not pure function (file external dependency)
    try {
        const fileContent = await file.text();
        const privKeyObj = await openpgp.readPrivateKey({ armoredKey: fileContent }); // load private key
        const decryptedKey = await openpgp.decryptKey({
            privateKey: privKeyObj,
            passphrase: password
        });

        return {
            success: true,
            message: "Decryption successful",
            key: decryptedKey
        };

    } catch (err) {
        // console.error("Decrypt key error:", err);
        return {
            success: false,
            message: err.message || "Unknown error",
            key: null
        };
    }
}

/*
export async function encryptMessage(pubKey, message) {...}
*/