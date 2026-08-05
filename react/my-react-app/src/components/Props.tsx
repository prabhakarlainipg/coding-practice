import Button from "./Button.tsx";
import {useState} from "react";
import Card from "./Card.tsx";

const PropsComponent: React.FC  = ()=>{
    const [name, setName] = useState("");

    return (
        <>
    <Button label="Save" setName={setName}/>
    <Button label="Cancel" setName={setName}/>
    <Button label="Delete" setName={setName}/>
    <div>{name}</div>
    <Card>
    <div>Profile</div>
    <p>Hello Prabhakar</p>
    </Card>
    </>
    )
}


export default PropsComponent

