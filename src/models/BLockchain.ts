import {Block} from './Block';

export class Blockchain {
    private chain: Block[];
    private readonly difficulty: number = 2;

    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    private createGenesisBlock(): Block {
        return new Block(0, Date.now(), "Genesis Block", "0");
    }

    public getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    public addBlock(newData: any): void {
        const previousBlock = this.getLatestBlock();
        const newBlock = new Block(
            previousBlock.index + 1,
            Date.now(),
            newData,
            previousBlock.hash
        );

        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    public isChainValid(): boolean {
        for (let i = 0; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) return false;

            if (currentBlock.previousHash !== previousBlock.hash) return false;
        }
        return true;
    }
}
