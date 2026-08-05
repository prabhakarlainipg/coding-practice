export function ErrorComp() {
    throw new Error("Component crashed");

    return <div>This will not render</div>;
}