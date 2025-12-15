import {Popup} from "../../containers/Popup/Popup";
import {Editor} from "../Editor/Editor";
import {IColumn} from "./Column";

export type TableRowEditorProps = {
    show?: boolean
    object: any
    columns: IColumn[]
    onOk?: ()=>void
    onCancel?: ()=>void
}

export const TableRowEditor = (props: TableRowEditorProps) => {

    if (!props.show)
        return <div />

    return (
        <Popup
            title="Edit row"
            visible={props.show}
            onCancel={() => {
                props.onCancel && props.onCancel()
            }}
            onOk={() => {
                props.onOk && props.onOk()
            }}
        >
            <Editor
                object={props.object}
                columns={props.columns}
            />
        </Popup>
    )
}



// const controls = (props.row===undefined) ? [] : Object.keys(props.row).map((k:string)=> {
//     const valueOf=(obj: any,field: string) => (obj!==undefined) ? obj[field] : "?"
//     return (
//         <TextInput name={k} label={k} defaultValue={valueOf(props.row,k)}/>
//     )
// })
// editors?: any


