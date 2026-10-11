import {useMemo, useState} from "react";
import {TableConfig} from "./TableConfig";
import {createTableManager, ITableManager} from "./TableManager";
import {createTableViewManager, ITableViewManager} from "./TableViewManager";
import {ICell, TypeCell} from "../common/Cell";
import {GridView} from "../common/GridView";
import {TableFilterBar} from "./TableFilterBar";
import {Button} from "../Button";
import {Buttons} from "../Buttons";

export type TableViewMainProps = {
    initialData: any[]
    config: TableConfig
    title?: string
    add?:boolean
    canDeleteRow?:boolean
    modify?:boolean
    onClick?: (cell: ICell, row: any)=>void
    onAdd?: () => void
    onDeleteRow? :(row: any) => void
}

export const TableViewMain = (props: TableViewMainProps) => {
    const [data, setData] = useState(props.initialData);
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [showFilters, setShowFilters] = useState(false);

    // 1. Model
    const tm: ITableManager = useMemo(() => {
        return createTableManager()
    }, [props.config]);

    // 2. View
    const tv: ITableViewManager<any> = useMemo(() => {
        const v: ITableViewManager<any> = createTableViewManager()

        tm.buildTable(data, props.config)
        v.buildTableView(tm)

        return v
    }, [tm,data]);

    // 2. Objet de configuration centralisé
    const gridConfig = {
        rowHeight: 26,
        gridHeight: 500,
        stickyCols: 2,
        stickyRightCols: 0,
        stickyRows: 1,
    };

    const cells: ICell[] = tv.cells;

    return (
        <div className="app-container">
            <header className="app-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
                <div>
                    <h1>{props.title ?? "<no title>"}</h1>
                </div>
            </header>

            {/* Barre d'actions au-dessus de la grille */}
            <div style={{ marginBottom: "12px", display: "flex", justifyContent: "flex-start" }}>
                <Buttons saveState={false}>
                    <Button
                        onClick={() => props.onAdd && props.onAdd()}
                    >
                        Add
                    </Button>
                    <Button
                        onClick={()=>setShowFilters((f: boolean)=>!f)}
                    >
                        Filters
                    </Button>
                </Buttons>

            </div>

            <main className="grid-wrapper">

                <GridView
                    cells={cells}
                    columnsWidth={tv.columnsWidth}
                    rowHeight={gridConfig.rowHeight}
                    height={gridConfig.gridHeight}
                    stickyCols={gridConfig.stickyCols}
                    stickyRightCols={gridConfig.stickyRightCols}
                    stickyRows={gridConfig.stickyRows}
                    stickyFooterRows={0}
                    gap={0}
                    canDeleteRow={props.canDeleteRow}
                    onClick={(cell:ICell)=>{
                        // cas du click sur colonne pour trier
                        if (cell.typeCell === TypeCell.header) {
                            tm.toggleSort(cell.column.name,false)
                            setData(tm.data)
                            return
                        }

                        if (props.onClick) {
                            props.onClick(cell, tm.rowAt(cell.rect.y-1))
                        }
                    }}
                    onDeleteButtonClick={(y:number) => {
                        if (props.onDeleteRow)
                            props.onDeleteRow(tm.rowAt(y-1))
                    }}
                >
                    {showFilters && (
                        <TableFilterBar
                            config={props.config}
                            columnsWidth={tv.columnsWidth}
                            onFilterChange={(newFilters) => {
                                setFilters(newFilters)
                                console.log(newFilters)
                            }}
                        />
                    )}

                </GridView>
            </main>

            <footer className="app-footer">
            </footer>
        </div>
    );
};


//
//
//
// {/*<button*/}
// {/*    style={{*/}
// {/*        backgroundColor: "#aaa",*/}
// {/*        color: "#fff",*/}
// {/*        border: "none",*/}
// {/*        padding: "10px 20px",*/}
// {/*        margin: "10px",*/}
// {/*        borderRadius: "6px",*/}
// {/*        fontSize: "10px",*/}
// {/*        fontWeight: "bold",*/}
// {/*        cursor: "pointer",*/}
// {/*        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",*/}
// {/*        transition: "background-color 0.2s"*/}
// {/*    }}*/}
// {/*    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#00a884"}*/}
// {/*    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#00b894"}*/}
// {/*>*/}
// {/*    Add*/}
// {/*</button>*/}
// {/*<button*/}
// {/*    onClick={() => props.onAdd && props.onAdd()}*/}
// {/*    style={{*/}
// {/*        backgroundColor: "#aaa",*/}
// {/*        color: "#fff",*/}
// {/*        border: "none",*/}
// {/*        padding: "10px 20px",*/}
// {/*        margin: "10px",*/}
// {/*        borderRadius: "6px",*/}
// {/*        fontSize: "10px",*/}
// {/*        fontWeight: "bold",*/}
// {/*        cursor: "pointer",*/}
// {/*        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",*/}
// {/*        transition: "background-color 0.2s"*/}
// {/*    }}*/}
// {/*    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#00a884"}*/}
// {/*    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#00b894"}*/}
// {/*>*/}
// {/*    Filters*/}
// {/*</button>*/}
