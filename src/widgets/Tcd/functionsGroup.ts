
export type FuncType = (values: any[]) => any

export const functionsGroup: {[prop: string]: FuncType} = {
    sum: (values: number[]): number => {
        return values.reduce((acc:number,currValue:number)=>acc+currValue,0)
    },
    avg: (values: number[]): number => {
        if (values.length===0)
            return 0
        return values.reduce((acc:number,currValue:number)=>acc+currValue,0) / values.length
    },
    count: (values: any[]): number => {
        return values.length
    },
}





// export interface IFuncGroup<TValue,TGroup> {
//     name: string
//     func: FuncType<TValue,TGroup>
// }
// export class _FuncGroup<TValue, TGroup> implements IFuncGroup<TValue, TGroup> {
//
//     private readonly _name: string
//     private readonly _func: FuncType<TValue, TGroup>
//
//     constructor(name: string, funcGroup: FuncType<TValue, TGroup>) {
//         this._name = name
//         this._func = funcGroup
//     }
//
//     public get name(): string { return this._name}
//     public get func(): FuncType<TValue, TGroup> { return this._func }
// }
