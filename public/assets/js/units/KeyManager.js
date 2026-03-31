export const KeyManager = (() => { // store closure, not pure function (manages state)
    let decryptedKey = null; // closure variable to store decrypted key

    return {
        setKey: (keyObj) => { decryptedKey = keyObj; },
        getKey: () => decryptedKey,
        clear: () => { decryptedKey = null; }
    };
})();