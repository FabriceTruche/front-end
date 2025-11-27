import {
    ViewportInfoCellBase,
    ViewportData,
    ViewportHeaderStyle,
    ViewportRange,
    IViewportManager
} from "./ViewportDefinitions";

export const defaultViewportRange: ViewportRange = {
    rowStart: 0,
    rowEnd: 0,
}
export class ViewportManager implements IViewportManager {
    private _viewportGap: number;

    constructor(viewportHeight: number, viewportRowHeight: number, rowsCount: number, rowsHeaderCount: number = 0, viewportGap:number=2) {
        this._viewportHeight = viewportHeight
        this._viewportRowHeight = viewportRowHeight
        this._rowsCount = rowsCount
        this._viewportTop = 0
        this._rowsHeaderCount = rowsHeaderCount
        this._viewportGap = viewportGap
        this._colsCount = 1
    }

    private _rowsHeaderCount: number;
    private _viewportHeight: number
    private _viewportTop: number
    private _viewportRowHeight: number
    private _rowsCount: number
    private _colsCount: number

    private get viewportRowGapHeight() { return this._viewportGap+this._viewportRowHeight }

    public setColsCount(value: number) {
        this._colsCount = value;
    }

    public getColsCount(): number {
        return this._colsCount
    }

    public getViewportGap(): number {
        return this._viewportGap
    }

    public getRowsHeaderCount(): number {
        return this._rowsHeaderCount;
    }

    public setRowsHeaderCount(value: number) {
        this._rowsHeaderCount = value;
    }

    public isRowVisible(rowIndex: number) {
        return !(rowIndex > this.lastVisibleRow() || rowIndex < this.firstVisibleRow())
    }

    public getViewportRowHeight(): number {
        return this._viewportRowHeight
    }

    public setRowsCount(value: number) {
        this._rowsCount = value;
    }

    public setViewportRowHeight(value: number) {
        this._viewportRowHeight = value;
    }

    public getViewportHeight() {
        return this._viewportHeight
    }

    public getViewportContentHeight() {
        return (this._rowsCount * this.viewportRowGapHeight)
    }

    public setViewportTop(value: number) {
        this._viewportTop = value;
    }

    public firstVisibleRow(): number {
        return Math.trunc(this._viewportTop / this.viewportRowGapHeight) + 1
    }

    public lastVisibleRow(): number {
        return Math.trunc((this._viewportTop + this._viewportHeight) / this.viewportRowGapHeight) + 1
    }

    public getVisibleRowsCount(): number {
        return 1 + (this.lastVisibleRow() - this.firstVisibleRow())
    }

    public getRowsCount(): number {
        return this._rowsCount;
    }

    public getViewportRange(): ViewportRange {
        return {
            rowStart: this.firstScrollableVisibleRow(),
            rowEnd: this.lastVisibleRow(),
        }
    }

    public getViewportTop(): number {
        return this._viewportTop
    }

    public firstScrollableVisibleRow(): number {
        return this.firstVisibleRow() + this._rowsHeaderCount
    }

    public getScrollableRowsCount(): number {
        return 1 + (this.lastVisibleRow() - this.firstScrollableVisibleRow())
    }

    public fixedRowStyle(y:number): ViewportHeaderStyle {
        return ({
            position: "sticky",
            top: (y - 1) * this.viewportRowGapHeight + "px"
        })
    }

    // private fixedExtensionStyle(y:number): ViewportHeaderStyle {
    //     return ({
    //         position: "sticky",
    //         top: (((y - 1) * this.viewportRowGapHeight)-10) + "px"
    //     })
    // }

    public isVisibleRow(rowIndex: number): boolean {
        return (
            (rowIndex >= this.firstScrollableVisibleRow() && rowIndex <= this.lastVisibleRow()) ||
            (rowIndex <= this.getRowsHeaderCount())
        )
    }

    public isHeaderRow(rowIndex: number): boolean {
        return (rowIndex <= this.getRowsHeaderCount())
    }

    public projectExtension<T extends ViewportInfoCellBase>(collection: T[]): ViewportData<T>[] {
        const isOverTop=(item: T) => {
            const firstScrollable=this.firstVisibleRow()+this.getRowsHeaderCount()
            if ((firstScrollable>item.y) && (firstScrollable<(item.y+item.ySpan)))
                return true
            return false
        }

        let extensionCells:ViewportData<T>[] = []

        collection.filter((item: T) => isOverTop(item)).forEach((item: T) => {
            // const yFixExtension=1+this.getRowsHeaderCount()
            const top = -10 + (this._viewportRowHeight*this._rowsHeaderCount)+(this._viewportGap*(this._rowsHeaderCount-1))+"px"

            extensionCells.push({
                data: item,
                key: "OVERTOP-" + item.id,
                isRowLimit: false,
                isHeader: false,
                fixedStyle: {
                    position: "sticky",
                    top: top,
                }
            })
        })

        return extensionCells
    }

    public projectCells<T extends ViewportInfoCellBase>(collection: T[]): ViewportData<T>[] {
        const isVisibleBlock=(item: T) => {
            if (item.y <= this.getRowsHeaderCount())
                return true

            if ((this.firstVisibleRow() > (item.y + item.ySpan)) || (this.lastVisibleRow() < item.y))
                return false

            return true
        }

        const res:ViewportData<T>[] = collection.filter((item: T) => isVisibleBlock(item)).map((item: T) => {
            let yVirtual:number = item.y
            let yVirtualSpan:number = item.ySpan
            let fixedRowStyle:any={}
            let key:string=item.id
            const isRowLimit = item.y === this.firstScrollableVisibleRow() || item.y === this.lastVisibleRow()

            if (item.y <= this.getRowsHeaderCount())
                fixedRowStyle = this.fixedRowStyle(item.y)

            return ({
                data: item,
                key: key,
                yVirtual: yVirtual,
                ySpanVirtual: yVirtualSpan,
                isRowLimit: isRowLimit,
                isHeader: this.isHeaderRow(item.y),
                fixedStyle: fixedRowStyle
            })
        })

        return res
    }
}

