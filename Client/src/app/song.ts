export class Song {
    constructor(
        public header: string,
        public title: string,
        public artist: string,
        public album: string,
        public year: number,
        public comment: string,
        public zeroByte: number,
        public track: number,
        public genre: string,
        public submittedBy: string,
        public submittedOn: string,
        public numRatings: number,
        public averageRating: number,
        public hidden: boolean
    ){}
}
