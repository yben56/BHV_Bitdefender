export const KeyManager = (() => {
    let decryptedKey = null; // closure variable to store decrypted key

    return {
        setKey: (keyObj) => { decryptedKey = keyObj; }, // set  decryptedKey
        decryptMessage: async (armoredEncryptedMessage) => {
            if (!decryptedKey) {
                throw new Error("Key not loaded or unlocked");
            }

            // use decrypted public key to degrypt private encrypted message
            const message = await openpgp.readMessage({ 
                armoredMessage: armoredEncryptedMessage 
            });

            const { data: decrypted } = await openpgp.decrypt({
                message,
                decryptionKeys: decryptedKey
            });

            return decrypted;
        },
        hasKey: () => decryptedKey !== null, // SPA can identify key decrypted or not
        clear: () => { decryptedKey = null; } // for logout
    };
})();