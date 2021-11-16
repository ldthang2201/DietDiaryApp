import * as bcrypt from 'bcrypt';

const SALT = 10;

export function encodePassword(rawPassword: string) {
    return bcrypt.hashSync(rawPassword, SALT);
}

export function comparePassword(rawPassword:string, hashPassword: string) {
    return bcrypt.compareSync(rawPassword, hashPassword, )
}