import Navbar from "./Navbar";
import Footer from "./Footer";


export default function Layout(props){
    return (
            <>
            <Navbar t={props.t}/>
            <main
                style={{
                    minHeight: '100vh',
                    height: '100%',
                    width: '100%',
                    justifyContent : 'center'
                }}
            >{props.children}</main>
            </>
    )
}