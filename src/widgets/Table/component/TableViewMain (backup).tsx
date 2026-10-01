export {}

// import {useMemo, useState} from "react";
// import {TableConfig} from "../TableConfig";
// import {createTableManager, ITableManager} from "../TableManager";
// import {createTableViewManager, ITableViewManager} from "../TableViewManager";
// import {ICell} from "../../common/Cell";
// import {GridView} from "../../common/GridView";
//
// export type TableViewMainProps = {
//     data: any[]
//     config: TableConfig
// }
//
// export const TableViewMain = (props: TableViewMainProps) => {
//     const [isConfigOpen, setIsConfigOpen] = useState(false);
//
//     // 1. Model
//     const tm: ITableManager = useMemo(() => {
//         return createTableManager()
//     }, [props.config]);
//
//     // 2. View
//     const tv: ITableViewManager<any> = useMemo(() => {
//         const v: ITableViewManager<any> = createTableViewManager()
//
//         tm.buildTable(props.data, props.config)
//         v.buildTableView(tm)
//
//         return v
//     }, [tm]);
//
//     // 2. Objet de configuration centralisé
//     const gridConfig = {
//         rowHeight: 26,
//         gridHeight: 300,
//         stickyCols: 0,
//         stickyRightCols: 0,
//         stickyRows: 1,
//     };
//
//     const cells: ICell[] = tv.cells;
//
//     return (
//         <div className="app-container">
//             <header className="app-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
//                 <div>
//                     <h1>Tableau</h1>
//                     <p>Exemple</p>
//                 </div>
//                 {/*<button className="btn-apply-elegant" onClick={() => setIsConfigOpen(true)}>*/}
//                 {/*    ⚙️ Configurer*/}
//                 {/*</button>*/}
//             </header>
//
//             <main className="grid-wrapper">
//                 <GridView
//                     cells={cells}
//                     columnsWidth={tv.columnsWidth}
//                     rowHeight={gridConfig.rowHeight}
//                     height={gridConfig.gridHeight}
//                     stickyCols={gridConfig.stickyCols}
//                     stickyRightCols={gridConfig.stickyRightCols}
//                     stickyRows={gridConfig.stickyRows}
//                     gap={0}
//                 />
//             </main>
//
//             {/* LA POPUP MODALE */}
//             {isConfigOpen && (
//                 <div className="tcd-modal-overlay">
//                     <div className="tcd-modal-content">
//                         {/*<TcdConfPanel*/}
//                         {/*    // allColumns={tcd.columns.map((c:ITcdColumn)=>c.name)}*/}
//                         {/*    config={props.config}*/}
//                         {/*    tcdData={tcd.data}*/}
//                         {/*    onCancel={() => setIsConfigOpen(false)}*/}
//                         {/*    onApply={(config: TcdConfig) => {*/}
//                         {/*        console.log("Config Appliquée", config);*/}
//                         {/*        setIsConfigOpen(false);*/}
//                         {/*        // Note: Ici, vous devrez probablement appeler une méthode*/}
//                         {/*        // de props.tcd pour appliquer rows/cols/measures/filters*/}
//                         {/*    }}*/}
//                         {/*/>*/}
//                     </div>
//                 </div>
//             )}
//
//             <footer className="app-footer">
//                 {/*Status: Virtualisation Active | {tcdv.cells.length} cellules chargées | {tcd.data.length} lignes*/}
//                 {/*<br/>*/}
//                 {/*Info: {tcdv.viewColumns.length} Virtuals Columns*/}
//             </footer>
//         </div>
//     );
// };