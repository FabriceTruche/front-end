import {createCell, ICell, TypeCell} from "./Cell";
import {Rect} from "./Rect";
import {IColumn} from "./Column";

export interface IGridViewManager {
    columnsWidth: number[];
    maxY: number;               // permet de récupérer la dernière ligne pour gérer les footer sticky

    getColummnWidth(column: number): number
}

export abstract class _GridViewManager implements IGridViewManager {
    private PADDING_SECURE = 26 // Espacement de sécurité global (marge gauche + droite)
    private DEFAULT_WIDTH = 100 // if context is null

    private _canvas: HTMLCanvasElement = document.createElement('canvas');
    private _columnsWidthMap = new Map<number, number>(); // largeur en pixel de la colonne
    protected _maxY: number = 0

    public get maxY(): number { return this._maxY; }

    public get columnsWidth(): number[] {
        const widths: number[] = []

        this._columnsWidthMap.forEach((v: number) => {
            widths.push(v)
        })

        return widths
    }

    public getColummnWidth(column: number): number {
        const w = this._columnsWidthMap.get(column)

        return (w===undefined) ? -1 : w
    }

    protected registerCell(
        tc: TypeCell,
        rect: Rect,
        value: any,
        column: IColumn,
        isLabel: boolean): ICell {

        const cell : ICell = createCell(
            tc,
            rect,
            value,
            column,
            isLabel,
        )

        if (rect.y > this._maxY)
            this._maxY = rect.y

        // calculate width of cell (column)
        const w = this.calculateWidth(cell)
        // const w = 100

        // modify max if any
        const cw = this._columnsWidthMap.get(rect.x)
        if (cw===undefined || (w > cw))
            this._columnsWidthMap.set(rect.x,w)

        // console.log(cw,rect.x,w)

        return cell
    }

    private calculateWidth(cell: ICell): number {
        const getContext = (font: string = "12px sans-serif"):CanvasRenderingContext2D|null => {
            let context: CanvasRenderingContext2D | null = this._canvas.getContext('2d');

            if (context)
                context.font = font;

            return context
        }

        const gridFont = "12px -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, sans-serif"
        const context = getContext(gridFont)
        const formattedText = cell.getFormattedValue() || "";
        const textWidth = context ? context.measureText(formattedText).width : this.DEFAULT_WIDTH

        return Math.ceil(textWidth + this.PADDING_SECURE);
    }

}