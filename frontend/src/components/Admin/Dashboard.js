import React, { Fragment, useEffect, useRef, useState } from 'react'
import "./Dashboard.css"
import Sidebar from "./Sidebar.js"
import Metadata from "../layout/Metadata"
import {Line} from "react-chartjs-2"
import {useDispatch, useSelector} from "react-redux"
import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Scale} from "chart.js"
import ProductList from "./ProductList.js"
import ProductForm from "./ProductForm.js"
import { clearErrors, getAdminProducts } from '../../actions/productAction'
import { getAllOrders } from '../../actions/orderAction'
import OrderList from "./OrderList.js"
import UserList from "./UserList.js"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
)

const Dashboard = () => {

    const {loading} = useSelector((state)=>state.user)
    const { orders } = useSelector((state) => state.allOrders);
    const {products} = useSelector((state)=>state.products);
    const {users} = useSelector((state)=>state.allUsers)

    const dispatch = useDispatch()
    const dashboardTab = useRef(null)
    const dashboardProductsTab = useRef(null)
    const dashboardOrdersTab = useRef(null)
    const dashboardUsersTab = useRef(null)
    const switcherProductTab = useRef(null)
    const [productListComponent, setProductListComponent] = useState("")
    const [productFromComponent, setProductFromComponent] = useState("dashboardContent-inactive")
    
    useEffect(()=>{
      dispatch(getAdminProducts())
      dispatch(getAllOrders())
    },[dispatch])

    let totalAmount = 0
    orders&& orders.forEach((order)=>{
        totalAmount += order.totalPrice
    })
    totalAmount = totalAmount.toFixed(2)

    const lineState = {
        labels: ["Initial Amount", "Total Amount"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: "#003566",
            hoverBackgroundColor: "rgb(197, 72, 49)",
            data: [0, 10000],
          },
        ],
      };
      const options =({
        responsive:true,
        plugins:{
            legend:true,
            title:{
                display: true,
            },
        },
        scale:{
            x:{
                grid:{
                    color:"red"
                }
            }
        }
      })


    const switcherTab = (tab) =>{
        if(tab === "dashboard"){
            dashboardTab.current.classList.remove("dashboardContent-inactive")
            dashboardOrdersTab.current.classList.add("dashboardContent-inactive")
            dashboardProductsTab.current.classList.add("dashboardContent-inactive")
            dashboardUsersTab.current.classList.add("dashboardContent-inactive")
        }else if(tab === "orders"){
            dashboardTab.current.classList.add("dashboardContent-inactive")
            dashboardOrdersTab.current.classList.remove("dashboardContent-inactive")
            dashboardProductsTab.current.classList.add("dashboardContent-inactive")
            dashboardUsersTab.current.classList.add("dashboardContent-inactive")
        }
        else if(tab === "products"){
            dashboardTab.current.classList.add("dashboardContent-inactive")
            dashboardOrdersTab.current.classList.add("dashboardContent-inactive")
            dashboardProductsTab.current.classList.remove("dashboardContent-inactive")
            dashboardUsersTab.current.classList.add("dashboardContent-inactive")
        }
        else if(tab === "users"){
            dashboardTab.current.classList.add("dashboardContent-inactive")
            dashboardOrdersTab.current.classList.add("dashboardContent-inactive")
            dashboardProductsTab.current.classList.add("dashboardContent-inactive")
            dashboardUsersTab.current.classList.remove("dashboardContent-inactive")
        }
    }

    const switchProductTabs = (e, tab)=>{
        if(tab === "AllProducts"){
            switcherProductTab.current.classList.add("shiftToNeutral");
            switcherProductTab.current.classList.remove("shiftToRight");

            setProductListComponent("")
            setProductFromComponent("dashboardContent-inactive")
        }
        if(tab === "ProductForm"){
            switcherProductTab.current.classList.remove("shiftToNeutral");
            switcherProductTab.current.classList.add("shiftToRight");

            setProductListComponent("dashboardContent-inactive")
            setProductFromComponent("")
        }
      }

    const switchUsersTabs = (e, tab)=>{
        if(tab === "all"){
            switcherProductTab.current.classList.add("shiftToNeutral");
            switcherProductTab.current.classList.remove("shiftToRight");

            setProductListComponent("")
            setProductFromComponent("dashboardContent-inactive")
        }
        if(tab === "action"){
            switcherProductTab.current.classList.remove("shiftToNeutral");
            switcherProductTab.current.classList.add("shiftToRight");

            setProductListComponent("dashboardContent-inactive")
            setProductFromComponent("")
        }
      }

  return (
    <Fragment>
        {loading === false && (
            <Fragment>
                <Metadata title="Dashboard" />
                <div className="dashboardContainer">
                    <div className="dashboardBox">
                        <Sidebar switcherTab={switcherTab}/>
                        <div className="dashboardContainerContent">
                            <div ref={dashboardTab} className="dashboardComponent">
                                <div className="dashboardHeading">
                                    <h1 className='dashboardAllHeadings'>Dashboard</h1>
                                    <hr className='dashboardHeadingUnderline'/>
                                </div>
                                <div className="dashboardDetails">
                                    <div className="dashboardSummaryBox">
                                        <div>
                                            <p>Products:</p>
                                            <p>{products && products.length}</p>
                                        </div>
                                        <div>
                                            <p>Orders:</p>
                                            <p>{orders && orders.length}</p>
                                        </div>
                                        <div>
                                            <p>Users:</p>
                                            <p>{users && users.length}</p>
                                        </div>
                                        <div>
                                            <p>Total Earnings:</p>
                                            <p>₹ {totalAmount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div ref={dashboardProductsTab} className="dashboardComponent dashboardContent-inactive">
                                <div className="dashboardHeading">
                                    <h1 className='dashboardAllHeadings'>Products</h1>
                                    <hr className='dashboardHeadingUnderline'/>
                                </div>
                                <div className="dashboardComponentDetails">
                                    <div className="dashboardCompBtns">
                                        <div>
                                            <p onClick={(e)=>switchProductTabs(e, "AllProducts")}>All Products</p>
                                            <p onClick={(e)=>switchProductTabs(e, "ProductForm")}>Add a Product</p>
                                        </div>
                                        <button ref={switcherProductTab}></button>
                                    </div>
                                    <div className="dashboardComponentSection">
                                        <ProductList opt={productListComponent}/>
                                        <ProductForm opt={productFromComponent}/>
                                    </div>
                                </div>
                            </div>
                            <div ref={dashboardOrdersTab} className="dashboardComponent dashboardContent-inactive">
                                <div className="dashboardHeading">
                                    <h1 className='dashboardAllHeadings'>Orders</h1>
                                    <hr className='dashboardHeadingUnderline'/>
                                </div>
                                <div className="dashboardComponentDetails">
                                    <OrderList/>
                                </div>
                            </div>
                            <div ref={dashboardUsersTab} className="dashboardComponent dashboardContent-inactive">
                                <div className="dashboardHeading">
                                    <h1 className='dashboardAllHeadings'>Users</h1>
                                    <hr className='dashboardHeadingUnderline'/>
                                </div>
                                <div className="dashboardComponentDetails">
                                    <UserList/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          rtl={false}
          theme="colored"
        />
    </Fragment>
  )
}

export default Dashboard