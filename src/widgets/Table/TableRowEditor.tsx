import {Form} from "../../containers/Form/Form";
import {TextInput} from "../../ui/Text/TextInput";
import {Popup} from "../../containers/Popup/Popup";
import {GridCellData} from "./Table";
import {Column} from "../../common/common";
import {Editor} from "../Editor/Editor";

export type EditRowProps = {
    show: boolean
    row:GridCellData
    onOk?: ()=>void
    onCancel?: ()=>void
}

export const TableRowEditor = (props: EditRowProps) => {

    if (!props.show)
        return <div />

    // const controls = (props.row===undefined) ? [] : Object.keys(props.row).map((k:string)=> {
    //     const valueOf=(obj: any,field: string) => (obj!==undefined) ? obj[field] : "?"
    //     return (
    //         <TextInput name={k} label={k} defaultValue={valueOf(props.row,k)}/>
    //     )
    // })

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
                object={props.row}
            />
        </Popup>
    )
}
