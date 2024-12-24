import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Search from "./Search";

const Header = ({cartItems})=>{
    const { auth, logout } = useContext(AuthContext);
    console.log(cartItems)

    return (
        <nav className="navbar row">
            <div className="col-12 col-md-3 ">
                <div className="navbar-brand">
                    <Link to="/"><img width="150px" src="/images/logo9.png" /></Link>
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Search />
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                {auth ? (
                    <div className='header-nav d-flex'>
                        <div className='header-option'>
                            <span className="header_optionLineOne">Hello User</span>
                            <Link to="/">
                                <span className="header_optionLineTwo" onClick={logout}>Sign Out</span>
                            </Link>

                        </div>

                        <Link to="/cart">
                            <span id="cart" className="mr-2"><ShoppingBasketIcon className='mb-2' /></span>
                            <span id="cart" className="mr-2">Cart</span>
                            <span className="ml-1" id="cart_count">{cartItems.length}</span>
                        </Link></div>

                ) : (
                    <div className='header-option'>
                        <span className="header_optionLineOne">Hello User</span>
                        <Link to="/signin">
                            <span className="header_optionLineTwo">Sign In</span>
                        </Link></div>
                )}

            </div>
        </nav>
    );
};

export default Header;
