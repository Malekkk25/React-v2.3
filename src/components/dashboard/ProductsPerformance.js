import React,{useState,useEffect} from "react";
import Axios from 'axios';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';
import IconButton from "@mui/material";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import pimg from '../../assets/img/860814.png';
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import {
  Grid,
  Button,
 
  Stack,
  
  Fab,
  ButtonGroup,
} from "@mui/material";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import ProductPag from "../pagination/ProductPag";
import { red } from "@mui/material/colors";
/* const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch('/api/sales')
      .then(res => res.json())
      .then(data => setSales(data))
      .catch(error => console.error(error));
  }, []);*/

const ProductsPerformance = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] =useState(false);
  const [currentPage ,setCurrentPage]=useState(1);
  const [postsPerPage , setPostsPerPage]=useState(2);
  const user=JSON.parse(localStorage.getItem('user-info'))

   useEffect(() => {
    Axios.get('http://localhost:3001/api/getProduct').then((response) => {
      setProducts(response.data);
      console.log(response.data);
     });
    Axios.get('http://localhost:3001/api/getCategorie').then((response) => {
    setCategories(response.data);
      console.log(response.data);
   });
   }, []);

  const indexOfLastPost =currentPage *postsPerPage;
  const indexOfFirstPost =indexOfLastPost -postsPerPage;
  const currentPosts =products.slice(indexOfFirstPost,indexOfLastPost);

  
  const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/api/deleteProduct/${id}`);
    console.log(id);
  }
  const navigate = useNavigate();
  const handleButtonClick =()=>{
    navigate('/AddProduct');
  };
  const handleDelete = (id) => {
    deleteProduct(id);
    window.location.reload();
  };
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  return (
    <BaseCard title="Products Perfomance">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "50px" , marginTop:"-50px"}}>
      {
      user.role =='admin'?
       <Button variant="contained" color="primary" onClick={handleButtonClick}>Add Product</Button>
      :<></>  
      }
       </div>

      <Table
        aria-label="simple table"
        sx={{
          mt: -5,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Category
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Stock Quantity
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                State
              </Typography>
            </TableCell>
            {
                user.role =='admin'?
                <>
            <TableCell >
              <Typography color="textSecondary" variant="h6">
                Update
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Delete
              </Typography>
            </TableCell>
            </>
            :
            <></>}
          </TableRow>
        </TableHead>
        <TableBody>
          
          {currentPosts.map((product) => (
            <TableRow key={product.name}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "600",
                      }}
                    >
                    <img  src='../../assets/users/1.jpg' />
                      {product.name}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {categories.find(cat => cat.id === product.category)?.name}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                {categories.find(cat => cat.id === product.category)?.name}
                </Typography>
              </TableCell>
              <TableCell>
              <Typography variant="h6">{product.prix} Dinars </Typography>
              </TableCell>
              <TableCell>
              <Typography variant="h6">{product.Qstock} </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  sx={product.state === 'available' ? {pl: "4px",
                  pr: "4px",
                  backgroundColor: "green",
                  color: "#fff",}:
                  {pl: "4px",
                  pr: "4px",
                   backgroundColor: "#E46A76",
                  color: "#fff",}
                
                }
                  label={product.state}
                ></Chip>
              </TableCell>
              {
                user.role =='admin'?
                <>
              <TableCell  >
              <Link to={`updateProduct/${product.id}`}><ModeEditIcon/></Link>
              </TableCell>
              <TableCell align="right" >
              <button onClick={() => {deleteProduct(product.id)}} /*onClick={handleDelete(user.id)}*/ style={{ border: 'none', background: 'none' }} ><DeleteOutlineIcon/></button>
              {/*onClick={handleDelete}*/}
              </TableCell>
              </>
              :
              <>
              </>
              }
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <br/>
      <ProductPag postsPerPage={postsPerPage} totalPosts={products.length} paginate={paginate}/> */}
      <ReactPaginate
                  onPageChange={paginate}
                  pageCount={Math.ceil(products.length / postsPerPage)}
                  previousLabel={'Prev'}
                  nextLabel={'Next'}
                  containerClassName={'pagination'}
                  pageLinkClassName={'page-number'}
                  previousLinkClassName={'page-number'}
                  nextLinkClassName={'page-number'}
                  activeLinkClassName={'active'}
               />
    </BaseCard>
  );
};

export default ProductsPerformance;
