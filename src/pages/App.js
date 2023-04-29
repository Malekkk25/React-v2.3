import './App.css';
import BaseCard from '../components/baseCard/BaseCard';
import { SidebarDataAdmin } from '../components/layouts/sidebar/SidebarDataAdmin';
import Sidebar from '../components/layouts/sidebar/SidebarAdmin';
import SidebarUser from '../components/layouts/sidebar/SidebarUser';
import Header from '../components/layouts/header/Header';
import FullLayout from '../components/layouts/FullLayout';
import SidebarAdmin from '../components/layouts/sidebar/SidebarAdmin';
import UserTable from './UserTable';
import createEmotionCache from '../createEmotionCache';
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from '../theme/theme';
import ProductTable from './ProductTable';
import CategoryTable from './CategoryTable';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import Tables from './SaleTable';
import ProductForm from './AddProduct';
import AddCategory from './AddCategory';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import UpdateCategory from './UpdateCategory';
import AddUser from './AddUser';
import AddSale from './AddSale';
import LoginPage from './LoginPage';
import UpdateUser from './UpdateUser';
import Register from './Register';
import Stats from './Stats';



export default function MyApp() {

  
  return (
    <Router>

      {
        localStorage.getItem('user-info')?
        <Routes>
        <Route path='/' element={<Tables/>}/>
        <Route path='/User' element={<UserTable/>}/>
        <Route path='/Product' element={<ProductTable/>}/>
         <Route path='/Categories' element={<CategoryTable/>}/>
         <Route path='/AddCategory' element={<AddCategory/>}/>
         <Route path='/AddProduct' element={<AddProduct/>}/>
         
         <Route path='/AddSale' element={<AddSale/>}/>
         <Route path='/Product/updateProduct/:id' element={<UpdateProduct/>}/>
         <Route path='/Categories/updateCategory/:id' element={<UpdateCategory/>}/>
         <Route path='/User/updateUser/:id' element={<UpdateUser/>}/>
          <Route path='/Manage' element={<Stats/>}/> 
         </Routes>
      :
      
      <Routes>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        </Routes>
      }
    
       
   
    </Router>
  );
}
