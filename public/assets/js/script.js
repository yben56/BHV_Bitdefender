"use strict";

$(function () {
    $('.btn-toggle-password').on('click', async () => {
        const passwordField = $('.password-field');
        const toggleIcon = $('.toggle-icon');
        const type = passwordField.attr('type') === 'password' ? 'text' : 'password';

        passwordField.attr('type', type);
        toggleIcon.toggleClass('bi-eye bi-eye-slash');
    });
});

/**
 * Your code goes here :-)
 */

import { validateFile, validatePassword } from './units/validation.js';
import { decryptPrivateKey } from './units/crypto.js';
import { KeyManager } from './units/KeyManager.js';

// intergration
$(function () {
    $('#btn-load-key').on('click', async (e) => {
        e.preventDefault();

        // 0. erase previous results
        $('.privkey-date').text('');
        $('#key-timestamp').text('');
        $('.privkey-loaded').removeClass('visually-hidden').addClass('visually-hidden');
        $('.privkey-loaded-error').removeClass('visually-hidden').addClass('visually-hidden');
        $('.privkey-error').text('');


        // 1. form validation
        const form = document.querySelector('form[name="loadkey"]');

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // 2. get data
        const file = $('#key-file')[0].files[0];      
        let password = $('#loadPassword').val();
        
        // 3. validation
        const validFile = await validateFile(file);
        const validPassword = validatePassword(password);

        // 4. display errors
        $('.file-error').toggleClass('d-none', validFile);
        $('.password-error').toggleClass('d-none', validPassword);
        if (!validFile || !validPassword) return;

        // 5. decrypt private key
        let decryptResult = await decryptPrivateKey(file, password);
        const success = decryptResult.success;
        $('.privkey-loaded').toggleClass('visually-hidden', !success);
        $('.privkey-loaded-error').toggleClass('visually-hidden', success);

        $('.privkey-error').text(decryptResult.message);

        if (success) {
            // 6. display timestamp if decryption successful
            const now = new Date();
            $('.privkey-date').text(now.toLocaleDateString());
            $('#key-timestamp').text(now.toLocaleTimeString());

            // 7. store decrypted key in closure
            KeyManager.setKey(decryptResult.key);
            // KeyManager.getKey(); // example of retrieving the key
        } else {
            KeyManager.clear(); // clear any existing key on failure
        }

        // 8. clear sensitive data from memory
        $('#loadPassword').val('');
        decryptResult = null;
        password = null;

    });
});