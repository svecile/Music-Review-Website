export class User {
    constructor(
        public email: string,
        public password: string,
        public deactivated: boolean,
        public admin: boolean
    ){}
}
