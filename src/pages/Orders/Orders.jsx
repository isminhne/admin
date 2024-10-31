import './Orders.css'
import React, {useEffect} from "react";
import pushToast from "../../helpers/sonnerToast.js";
import {NavLink} from "react-router-dom";
import ReactPaginate from "react-paginate";
import OrderService from "../../services/order.service.js";
import {moment} from "../../utils/moment.js";

const Orders = () => {
  const [list, setList] = React.useState([]);
  const [pagination, setPagination] = React.useState({});

  const fetchList = async ({
   page = 1,
   limit = 10,
  }) => {
    const res = await OrderService.getOrders({
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

  const removeOrder = async(id) => {
    const res = await OrderService.deleteOrder(id);
    if(res) {
      pushToast("Delete order successfully", "success");
      fetchList({});
    }
  }

  useEffect(() => {
    fetchList({});
  }, []);

  const handleChangeStatus = async (id, status) => {
    const res = await OrderService.updateOrder({
      id,
      status
    });
    if(res) {
      pushToast("Update order successfully", "success");
      fetchList({
        page: pagination.page
      });
    }
  }

  return (
    <>
      <div className='list add flex-col'>
        <p>All Orders List</p>
        <div className="list-table">
          <div className="list-table-format title orders-list">
            <b>User&#39;s name</b>
            <b>Products</b>
            <b>Status</b>
            <b>Total</b>
            <b>Placed at</b>
            <b>Actions</b>
          </div>
          {list.length === 0 && <div className="list-table-format orders-list">No order available</div>}
          {list.map((item, index) => {
            return (
              <div key={index} className="list-table-format orders-list">
                <p>{item?.user?.username}</p>
                <p>{item?.products?.map(item => item?.product?.title).join(", ")}</p>
                <p>
                  <select
                    value={item?.status}
                    onChange={(e) => handleChangeStatus(item._id, e.target.value)}
                  >
                    {Object.values(ORDER_STATUS).map((status, index) => {
                      return (
                        <option key={index} value={status}>{status}</option>
                      )
                    })}
                  </select>
                </p>
                <p>{item?.total} vnd</p>
                <p>{moment(item?.createdAt).format("HH:mm, DD/MM/YYYY")}</p>
                <div>
                  <p onClick={() => removeOrder(item._id)} className="cursor">x</p>
                  <NavLink to={`/orders/${item._id}`}>Detail</NavLink>
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

export const ORDER_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  SHIPPING: "SHIPPING",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
};

export default Orders
