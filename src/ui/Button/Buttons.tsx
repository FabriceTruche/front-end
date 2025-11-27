import * as React from "react";
import "./buttons.css"
import {Children, cloneElement, ReactElement, useState} from "react";
import {ButtonProps} from "./Button";

export type ButtonContainerProps = {
    children: ReactElement|ReactElement[]
}
export const Buttons = (props:ButtonContainerProps) => {
    const [activeButton,setActiveButton]=useState(-1)

    const getClassName=(idx:number)=>{
        return "xbg-button" + ((idx===activeButton) ? " xbg-button-selected" : "")
    }

    return (
        <div className="xbg-container">
            {Children.map(props.children, (child: ReactElement, index: number) => {
                if (!React.isValidElement(child))
                    return null;

                const element = child as ReactElement<ButtonProps>
                const newProps = {
                    key: index,
                    onClick: (e: any) => {
                        if (element.props.onClick !== undefined)
                            element.props.onClick(e)
                        setActiveButton(index)
                    },
                    className: getClassName(index)
                }
                return cloneElement(element, newProps)
            })
            }

        </div>)
}


/*                    return (
                        <div
                            key={index}
                            {...element.props}
                            onClick={(e:any)=>{
                                if (child.props.onClick!==undefined) {
                                    child.props.onClick(e)
                                }
                                setActiveButton(index)
                            }}
                            className={getClassName(index)}
                        >
                            {child.props.children}
                        </div>
                    )



            {Children.map(props.children, (child: ReactElement, index: number) => {
                const typeName = (typeof child.type === "string") ? child.type : child.type.name;

                if (typeName === "XButton") {
                    // Utiliser cloneElement pour modifier l'enfant sans le recréer
                    return cloneElement(child, {
                        key: index, // C'est crucial d'ajouter la clé
                        className: getClassName(index), // Remplace/ajoute la classe
                        onClick: (e: any) => {
                            // Appel de la fonction onClick originale s'il y en a une
                            if (child.props.onClick) {
                                child.props.onClick(e);
                            }
                            // Appel de votre propre logique
                            setActiveButton(index);
                        }
                    });
                }
                // ... gestion des erreurs ...
                console.log(`XButtons component : error : <${typeName}> not allowed on children for XButtons component`);
                return null;
            })}

*/