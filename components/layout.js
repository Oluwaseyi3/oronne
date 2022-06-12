import Navbar from "./navbar";

const Layout = ({children}) => {
    return ( 
        <div>
       
            <main>{children}</main>
        </div>
     );
}
 
export default Layout;