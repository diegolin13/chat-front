export class Usuario {
    public name: string;
    public sala: string;

    constructor(name: string) {
        this.name = name;
        this.sala = 'sin-sala';
    }
}