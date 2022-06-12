import styles from './navbar.module.css'
const Navbar = ({account}) => {
    return ( 
        <div>
            <div className={styles.navbody}>
            <div className={styles.navfirst}>
                <h1>Oronne</h1>
            </div>
            <div className={styles.navitems}>
                <ul>
                <li>Home</li>
                <li>Docs</li>
                <li>{account}</li>
                {/* <li><button>Connect Wallet</button></li> */}
                </ul>
                
            </div>
            </div>
{/*             
            <div className={styles.navline}/> */}
        </div>
     );
}
 
export default Navbar;
 
