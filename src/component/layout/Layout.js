import Navbar from "./Navbar";
import Footer from "./Footer";


export default function Layout(props){
    return (

            <div  style={{
                // height : '100%',
                width:'100%'
            }}>

            <Navbar t={props.t}/>
            <main
                style={{
                    minHeight : '100vh',
                    width:'100%',
                    justifyContent : 'center',
                    position: 'relative'
                }}
            >{props.children}</main>
            <Footer t={props.t}/>
            </div>


    )
}