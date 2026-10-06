
export type FuncObject = {
    label: string
    func: (values: any[]) => any
}
export type GroupByFunc = { [name: string]: FuncObject }

export const functionsGroup: GroupByFunc =
    {
        sum: {
            label: "Sum()",
            func: (values: number[]): number => {
                return values.reduce((acc: number, currValue: number) => acc + currValue, 0)
            }
        },
        avg: {
            label: "Average()",
            func: (values: number[]): number => {
                if (values.length === 0)
                    return 0
                return values.reduce((acc: number, currValue: number) => acc + currValue, 0) / values.length
            }
        },
        count: {
            label: "Count()",
            func: (values: any[]): number => {
                return values.length
            }
        },
    }

