export class UbuntuCodename
{
    public readonly Adjective: string
    public readonly Noun: string

    public get FullName(): string
    {
        return `${this.Adjective} ${this.Noun}`;
    }
}

