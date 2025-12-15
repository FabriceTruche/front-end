
export interface ITcdColumn {
    name: string
    type: string
    label: string
}

export class _Tcd implements ITcdColumn {
    private readonly _name: string
    private readonly _type: string
    private readonly _label: string

    constructor(
        name: string,
        type: string,
        label: string="",
    ) {
        this._name=name
        this._type=type
        this._label=label
    }

    public get name(): string {
        return this._name
    }

    public get type(): string {
        return this._type
    }

    public get label(): string {
        return this._label==="" ? this._name : this._label
    }
}
