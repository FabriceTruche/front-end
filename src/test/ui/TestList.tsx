import {List} from "../../ui/List/List";
import React from "react";
import { Form } from "../../containers/Form/Form";
import {SimpleList} from "../../ui/List/SimpleList";
import {helper} from "../../common/Helper";

const items: string[] = helper.genWordsArray(10,30)

export const TestList = () => (
    <Form>
        <List
            items={items.map((v: string) => ({value: v, label: v}))}
            label={"List"}
            name={"list"}
        />
        <List
            items={items.map((v: string) => ({value: v, label: v}))}
            label={"List"}
            name={"list"}
            multiple={true}
        />
        <SimpleList items={items} />
    </Form>
)
