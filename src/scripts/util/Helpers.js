export class Helpers {
    static shuffle(array) {
        return [...array].sort(() => Math.random() - 0.5);
    }
}
