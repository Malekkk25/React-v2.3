import React from 'react'
import theme from '../theme/theme';
import {useState,useEffect} from "react";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import axios from 'axios';
import { Autocomplete } from '@mui/material';
import FullLayout from "../components/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
  } from "@mui/material";
  import BaseCard from '../components/baseCard/BaseCard';

  
  const AddSale = () => {
  const [Product, setProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get('http://localhost:3001/api/getAll').then((response) => {
      setProducts(response.data);
      console.log(response.data);

    });
  }, []);
  const options = Product.map((product) => ({
    id: product.id,
    name: product.name,
    prix:product.prix,
    stock:product.Qstock
  }));
  
  const user=JSON.parse(localStorage.getItem('user-info'))
  const [name, setName]=useState(user.login)
  const[userRole,setUserRole]=useState(user.name)
  const[date,setDate]=useState(new Date().toISOString());
  const[product,setProduct]=useState('')
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState({});
  
  const handleProductChange = (event, value) => {
    setProduct(value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };


  const handleClearForm = () => {
    setProduct('');
    setQuantity('');
    setTotal(0);
  };


  const validateForm = () => {
    let isValid = true;
    let errors = {};
    if (!product) {
      errors.product = "Product code is required";
      isValid = false;
    }
    if (!quantity) {
      errors.quantity = " quantity is required";
      isValid = false;
    } 
     if (quantity < 0) {
      errors.quantity = "Stock quantity must be a positive number";
      isValid = false;
    }

    if(quantity > product.stock){
      errors.quantity = "Stock insufficient";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  }

  
  const Add = (event) => {
    event.preventDefault();
  
    if (validateForm()) {
      
      console.log(name)
      
      Axios.post("http://localhost:3001/api/insertSale", data)
        .then((response) => {
          console.log(response);
          navigate("/");
        })
        .catch((error) => {
          console.error(error);
        });
    }
    
  };
    const data={
        product: product.id,
        quantity:quantity,
        name:name,
        budget:total,
        date:date,
    };

    const calculateTotal = () => {
     
      const price = product.prix;
      
      const newTotal = price * quantity;
      setTotal(newTotal);
    }
    
    
    useEffect(() => {
      calculateTotal();
    }, [product, quantity]);


    const handleProductFocus = () => {
      setErrors("")
    }

    const handleQuantityFocus = () => {
      setErrors("")
    }
 
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12} sx={{ textAlign: 'left' }}>
        <BaseCard title="Add Sale">
        <form onSubmit={Add}>
          <Stack spacing={4}  sx={{ marginTop: '-50px', paddingTop: '10px' }} >
          
                  <Autocomplete
  options={options}
  getOptionLabel={(option) => option.name}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Select a Product"
      variant="outlined"
      error={!!errors.product}
      helperText={errors.product}
      onFocus={handleProductFocus}
    />
  )}
  onChange={handleProductChange
  }
  sx={{ width: "60%" }}
/> 
   
                  <TextField
        fullWidth
        id="quantity-input"
        label="Quantity"
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        sx={{ mb: 2 }}
        error={!!errors.quantity}
                helperText={errors.quantity}
                onFocus={handleQuantityFocus}
      />
              
              <TextField
        fullWidth
        id="total-input"
        label="Total"
        type="number"
        value={total}
        InputProps={{
          readOnly: true,
        }}
      />  
              

          </Stack>
          <br />
          <Button type='submit' variant="contained" mt={2}>
            Submit
          </Button>
          <Button variant="outlined" sx={{ ml: '10px' }} onClick={handleClearForm}>
  Clear Form
</Button>
</form>
        </BaseCard>
      </Grid>
      </Grid>
      </FullLayout>
      </ThemeProvider>
  )
}

export default AddSale