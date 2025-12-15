
export type ImageProps = {
    children: string
}

export const Img = (props: ImageProps) => {
    return (
        <span className="material-symbols-outlined">
            {props.children}
        </span>
    )
}