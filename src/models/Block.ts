import SHA256 from 'crypto-js/sha256'

export class Block {
    public hash: string;

    constructor(
        public readonly index: number,
        public readonly timestamp: number,
        public readonly data: any,
        public readonly previousHash: string = '',
        public nonce: number = 0 // PoWで使用
    ) {
        this.hash = this.calculateHash();
    }

    public calculateHash(): string {
        return SHA256(
            this.index +
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.data) +
            this.nonce
        ).toString();
    }

    public mineBlock(difficulty: number): void {
        const target = Array(difficulty + 1).join("0");

        while (this.hash.substring(0, difficulty) !== target) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log(`Block Mined: ${this.hash}`);
    }
}
