type ButtonProps = {
    label: string;
}
function Button({label}: ButtonProps) {
    return <button className="button">{label}</button>;
}
export default Button;

