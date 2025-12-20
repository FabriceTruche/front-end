import "./tcdBlock.css"
import {Coord, TcdMode, DisplayValue} from "../model/TcdViewManager";

export type Cell<T extends { displayValue: ()=>string }> = {
    object: T
    coord: Coord
}
export type TcdBlockProps<T extends { displayValue: ()=>string }> = {
    origin: Coord
    mode: TcdMode
    header: string[]      // uniquement une liste de valeurs
    body: Cell<T>[]       // valeur et position
    totals: Cell<DisplayValue>[]
}
export const  TcdBlock= <T extends { displayValue: ()=>string },>(props: TcdBlockProps<T>) => {
    const style = (y: number, x: number) => (
        {
            gridArea: `${1 + props.origin.y + y} / ${1 + props.origin.x + x}`,
        }
    )
    const shift_x = props.mode===TcdMode.top ? 0 : 1
    const shift_y = 1 - shift_x

    return (
        <pre className="tcd-container">
            {props.header.map((h: string, index: number) => {
                return (
                    <div
                        key={index}
                        className={"tcd-header"}
                        style={(props.mode===TcdMode.top) ? style(0, index) : style(index, 0)}
                    >
                        {h}
                    </div>
                )
            })}

            {props.body.map((v: Cell<T>, index: number) => {
                return (
                    <div
                        key={index}
                        className={"tcd-body"}
                        style={style(shift_y + v.coord.y, shift_x + v.coord.x)}
                    >
                        {v.object.displayValue()}
                    </div>
                )
            })}

            {props.totals.map((v: Cell<DisplayValue>, index: number) => {
                return (
                    <div
                        key={index}
                        className={"tcd-total"}
                        style={style(shift_y + v.coord.y, shift_x + v.coord.x)}
                    >
                        {v.object.displayValue()}
                    </div>
                )
            })}

        </pre>
    )
}




// const styleLeft = (y: number, x: number) => (
//     {
//         gridArea: `${1 + props.origin.x + x} / ${1 + props.origin.y + y}`,
//     }
// )
// const style = (y: number, x: number) => (props.mode===TcdMode.top) ? styleTop(y,x) : styleLeft(y,x)

