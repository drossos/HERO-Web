var crypto = require('crypto');


function Encrypt() {

    saltGenerator(length) {
        //returns salt
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
    }

    sha512Encrypt(password, salt) {
        var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest('hex');
        //return password + salt hashed value
        return value;
    }

    verrifyPassword(encrypted, salt, input) {
        if (sha512Encrypt(input, salt) === encrypted)
            return true;
        return false;
    }
}