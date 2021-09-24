export class Book{

    constructor(
        public _id: string,
        public authorBook: String,
        public titleBook: String,
        public editionBook: String,
        public wordsBook: [],
        public descriptionBook: String,
        public themesBook: String,
        public copiesBooks: Number,
        public avaliblesBooks: Number,
        public cover: String,
        public loanBooks: Number
    ){}  
}