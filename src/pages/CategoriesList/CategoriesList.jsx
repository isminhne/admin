import {NavLink} from "react-router-dom";
import ReactPaginate from "react-paginate";
import React, {useEffect} from "react";
import ProductService from "../../services/product.service.js";
import pushToast from "../../helpers/sonnerToast.js";
import CategoriesService from "../../services/categories.service.js";

export default function CategoriesList() {

  const [list, setList] = React.useState([]);
  const [pagination, setPagination] = React.useState({});

  const fetchList = async ({
   page = 1,
   limit = 10,
  }) => {
    const res = await CategoriesService.getAllCategories({
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

  const removeFood = async(id) => {
    const res = await CategoriesService.deleteCategory(id);
    if(res) {
      pushToast("Delete category successfully", "success");
      fetchList({});
    }
  }

  useEffect(() => {
    fetchList({});
  }, []);

  return (
    <>
      <div className='list add flex-col'>
        <p>All Categories List</p>
        <NavLink to={"/categories/add"} className="add-btn">Add</NavLink>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Description</b>
          </div>
          {list.length === 0 && <div className="list-table-format">No categories available</div>}
          {list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={item?.thumbnail} alt=""/>
                <p>{item?.title}</p>
                <p>{item?.description}</p>
                <div>
                  <p onClick={() => removeFood(item._id)} className="cursor">x</p>
                  <NavLink to={`/categories/${item._id}/update`}>Update</NavLink>
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