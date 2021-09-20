export class User{

    constructor(
        public _id: string,
        public identificador: String,
        public name: String,
        public lastname: String,
        public username: String,
        public rol: String,
        public email: String,
        public password: String,
        public image: String
    ){}  
}