type ButtonProps = {
    label: string;
    setName: (name: string) => void;
}
function Button({label, setName}: ButtonProps) {
    return <button className="button" onClick={()=>setName(label)}>{label}</button>;
}
export default Button;

