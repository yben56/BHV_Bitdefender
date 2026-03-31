export async function validateFile(file) { // close too pure function (file external dependency)
    // 1. check if file is selected
    if (!file) return false;

    //2. check file extension
    const allowedExt = ['key', 'asc', 'pgp'];
    const ext = file.name.split('.').pop().toLowerCase();
    if (!allowedExt.includes(ext)) return false;

    // 3. check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) return false;

    // 4. PGP header
    const text = await file.text();
    if (!text.includes('BEGIN PGP PRIVATE KEY BLOCK')) return false;

    return true;
}

export function validatePassword(password) { // pure function, no side effects
    const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    return regex.test(password);
}