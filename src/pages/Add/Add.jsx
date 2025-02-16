// react
import { useState } from 'react';
import { toast } from 'react-toastify';

//import axios from 'axios'
import axios from 'axios';

//import PropTypes from 'prop-types'

// assets
import {assets} from '../../assets/assets.js'

//components
import './Add.css';

const Add = () => {
  
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: '',
    description: '',
    category: 'Salad',
    price: '',
    
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value})) 
  }

  const onSubmitHandler = async (event) => {
      event.preventDefault;
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('price',Number(data.price));
      // add product to the database
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/add`, formData);
      if(response.data.success){
        toast.success(response.data.message);
        setData({
          name: '',
          description: '',
          category: 'Salad',
          price: '',
        })
        setImage(false)
      }else{
        console.log("error")
         toast.error(response.data.message)
      }
  }



  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img  src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=> setImage(e.target.files[0 ])} type="file" id="image" name="image" accept="image/*" hidden required/>
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' required/>
        </div>
        <div className="add-product-desc flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler}  name="category" required>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>
      
    </div>
  )
}

Add.propTypes = {}

export default Add