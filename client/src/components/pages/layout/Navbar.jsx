// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar() {

  const handleLogout = async () => {
    await localStorage.removeItem("token");
    window.location.reload();
    //return navigate("/register")
    
  }

 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{"marginBottom":"20px"}}>
       <NavLink className="navbar-brand" to="/">
         <img alt="" style={{"width" : 15 + '%', "marginLeft":"20px"}} src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"></img>
       </NavLink>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
         <li className="nav-item">
            <NavLink className="nav-link" to="/products">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
             <NavLink className="nav-link" to="/sales_order">
               Sales order
             </NavLink>
           </li>
           <li className="nav-item">
             <NavLink className="nav-link" to="/category">
               Category
             </NavLink>
           </li>
           <li className="nav-item">
             <NavLink className="nav-link" to="/about">
               About
             </NavLink>
           </li>
           <li className="nav-item">
             <NavLink className="nav-link" to="/help">
               Help
             </NavLink>
           </li>
           <li className="nav-item">
             <NavLink className="nav-link" onClick={handleLogout}>
               Logout
             </NavLink>
          
           </li>
         </ul>
       </div>
     </nav>
   </div>
 );
}