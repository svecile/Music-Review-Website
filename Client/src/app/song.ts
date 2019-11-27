export class Song {
    constructor(
        public email: string,
        public password: string,
        header: string,
        title: string,
        artist: string,
        album: string,
        year: number,
        comment: string,
        zeroByte: number,
        track: number,
        genre: string,
        submittedBy: string,
        submittedOn: string,
        numRatings: number,
        averageRating: number,
        hidden: boolean
    ){}
}
