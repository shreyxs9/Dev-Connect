import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../Redux/userSlice';

const NavBar = () => {
  const user = useSelector((store)=> store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () =>{
    try {dispatch(removeUser());
    navigate("/login");} catch (err){
      console.error(err);
    }
  }
  return ( 
        <div className="navbar bg-base-300 shadow-sm fixed top-0 z-20">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl"> 🧑‍💻Dev-Connect</Link>
  </div>
  <div className="flex gap-2">
    <div className="dropdown dropdown-end mx-10">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
       <div className="w-10 rounded-full">
        {user ? (  <img
            alt="Tailwind CSS Navbar component"
            src={user.photoUrl}   />) :(
              <img
            alt="Tailwind CSS Navbar component"
            src="https://as2.ftcdn.net/jpg/05/89/93/27/1000_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.webp"   />
            )}
        </div>
      </div>
      <ul  
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li onClick={handleLogout}><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div> 
 
  )
}

export default NavBar;
