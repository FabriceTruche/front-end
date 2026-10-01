export {}

// import React, { useState, FC } from 'react';
// import {List, ListItem} from "../../../ui/List/List";
// // import {ModalWindow} from "../../../containers/__Form/ModalWindow";
// import {TextInput} from "../../../ui/Text/TextInput";
// import {Checkbox} from "../../../ui/Checkbox/Checkbox";
// import {ColumnDataTypeArray} from "../../common/ColumnDefinition";
//
// interface OptionsProps {
//     col: string;
//     onOptionChange?: (value: any, propName: string) => void
//     // onTypeFormatChange?: (typeFormat: ColumnFormatType) => void;
//     // onPrecisionChangeChange?: (precision: number) => void;
//     // onDateMaskChange?: (mask: string) => void;
//     // onSetTotalChange?: (total: boolean) => void;
// }
//
// export const Options: FC<OptionsProps> = ({ col, onOptionChange /*, onPrecisionChangeChange, onDateMaskChange */}) => {
//     const [show, setShow] = useState<boolean>(false);
//
//     return (
//         <div className="filter-wrapper">
//             <button
//                 type="button"
//                 className="btn-filter"
//                 title="Options"
//                 onClick={() => setShow(!show)}
//             >
//                 ⚙
//             </button>
//
//             {show && (
//                 <div className="filter-popover">
//                     <div className="filter-sticky-header">
//                         {/*<button type="button" className="btn-filter-action" onClick={handleSelectAll}>Tout</button>*/}
//                         {/*<button type="button" className="btn-filter-action" onClick={handleSelectNone}>Aucun</button>*/}
//                         <button type="button" className="btn-filter-ok" onClick={() => setShow(false)}>Ok</button>
//                     </div>
//                     <div className="filter-scroll">
//                         <ModalWindow>
//                             <List
//                                 items={ColumnDataTypeArray.map((v: string) => ({value: v, label: v}))}
//                                 label={"Format"}
//                                 name={"listFormat"}
//                                 multiple={false}
//                                 onChange={(val:ListItem[]) => onOptionChange && onOptionChange(val[0].value, 'format')}
//                             />
//                             <TextInput
//                                 name="mask"
//                                 inputType="text"
//                                 label="Mask"
//                                 placeholder="Saisissez un mask de date"
//                                 required={false}
//                                 data={["D","DD","M","MM","YYYY"]}
//                                 onChange={(val:ListItem[]) => onOptionChange && onOptionChange(val[0].value, 'mask')}
//                             />
//                             <TextInput
//                                 name="precision"
//                                 inputType="number"
//                                 label="Precision"
//                                 placeholder="Saisissez un nombre de décimales"
//                                 required={false}
//                                 onChange={(value: any)=>onOptionChange && onOptionChange(value, 'precision')}
//                             />
//                             <List
//                                 items={[{value: "left", label: "left"},{value: "center", label: "center"},{value: "right", label: "right"},]}
//                                 label={"Align."}
//                                 name={"align"}
//                                 multiple={false}
//                                 onChange={(value:ListItem[]) => onOptionChange && onOptionChange(value[0], 'alignment')}
//                             />
//                             <Checkbox
//                                 name={"total"}
//                                 label={"Total"}
//                                 onChange={(value:any) => onOptionChange && onOptionChange(value, 'hasTotal')}
//                             />
//
//                         </ModalWindow>
//
//                         {/*{uniqueValues.map((v: string) => (*/}
//                         {/*    <label key={v} className="filter-item">*/}
//                         {/*        <input type="checkbox"*/}
//                         {/*               checked={selected.includes(v)}*/}
//                         {/*               onChange={() => onToggle(col.name, v)}/>*/}
//                         {/*        <span className="filter-val-text">{v}</span>*/}
//                         {/*    </label>*/}
//                         {/*))}*/}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };