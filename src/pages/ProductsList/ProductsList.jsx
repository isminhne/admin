import React, {useEffect} from 'react'
import './ProductsList.css'
import {NavLink} from "react-router-dom";
import ProductService from "../../services/product.service.js";
import pushToast from "../../helpers/sonnerToast.js";
import ReactPaginate from 'react-paginate';

const ProductsList = () => {

    const [list, setList] = React.useState([]);
    const [pagination, setPagination] = React.useState({});

    const fetchList = async ({
        page = 1,
        limit = 10,
    }) => {
        const res = await ProductService.getAllProducts({
            page,
            limit
        });
        setList(res.docs);
        setPagination({
            totalDocs: res.totalDocs,
            totalPages: res.totalPages,
            page: res.page,
            pagingCounter: res.pagingCounter,
            hasPrevPage: res.hasPrevPage,
            hasNextPage: res.hasNextPage,
            prevPage: res.prevPage,
            nextPage: res.nextPage
        });
    }

    const removeFood = async(foodId) => {
        const res = await ProductService.deleteProduct(foodId);
        if(res) {
            pushToast("Delete food successfully", "success");
            fetchList({});
        }
    }

  useEffect(() => {
    fetchList({});
  }, []);

  return (
    <>
      <div className='list add flex-col'>
          <p>All Foods List</p>
          <NavLink to={"/products/add"} className="add-btn">Add</NavLink>
          <div className="list-table">
              <div className="list-table-format title">
                  <b>Image</b>
                  <b>Name</b>
                  <b>Category</b>
                  <b>Price</b>
                  <b>Action</b>
              </div>
              {list.length === 0 && <div className="list-table-format">No food available</div>}
              {list.map((item, index) => {
                  return (
                  <div key={index} className="list-table-format">
                      <img src={item?.images[0]} alt="" />
                      <p>{item?.title}</p>
                      <p>{item?.category?.title}</p>
                      <p>{item?.price} vnd</p>
                      <div>
                        <p onClick={()=>removeFood(item._id)} className="cursor">x</p>
                          <NavLink to={`/products/${item._id}/update`}>Update</NavLink>
                      </div>
                  </div>
                  )
              })}
          </div>
          <ReactPaginate
            nextLabel="next"
            onPageChange={(e) => fetchList({page: e.selected + 1})}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pagination.totalPages}
            previousLabel="previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
      </div>
    </>
  )
}

export default ProductsList
