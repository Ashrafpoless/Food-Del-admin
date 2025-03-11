// react
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

//import PropTypes from 'prop-types'

//components
import './List.css';

const List = () => {
  const [list, setList] = useState([]);

  // fetch list data function
  const fetchList = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/food/list`
    );
    if (res.data.success) {
      setList(res.data.data);
    } else {
      console.log(res.data.message);
    }
  };

  // delete food item function
  const deleteFoodItem = async (foodId) => {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/food/remove/`,
      { id: foodId }
    );
    await fetchList();
    if (res.data.success) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  // fetch list data on component mount
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img
                src={`${import.meta.env.VITE_SERVER_URL}/images/` + item.image}
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className="cursor" onClick={() => deleteFoodItem(item._id)}>
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

List.propTypes = {};

export default List;
