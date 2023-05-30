import React, { Fragment, useEffect, useRef, useState } from 'react'
import "./Dashboard.css"
import Sidebar from "./Sidebar.js"
import Metadata from "../layout/Metadata"
import {useDispatch, useSelector} from "react-redux"
import ProductList from "./ProductList.js"
import ProductForm from "./ProductForm.js"
import { clearErrors, getAdminProducts } from '../../actions/productAction'
import { getAllOrders } from '../../actions/orderAction'
import OrderList from "./OrderList.js"
import UserList from "./UserList.js"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllUsers } from '../../actions/userAction'
import Chart from "react-apexcharts";
import Loader from "../layout/Loader/Loader"
import { Typography } from '@mui/material'
import CountUp from 'react-countup';

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

    let del = 0
    let proc = 0
    
    useEffect(()=>{
      dispatch(getAdminProducts())
      dispatch(getAllOrders())
      dispatch(getAllUsers())
    },[dispatch])

    let years = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let totalAmount = 0
    orders&& orders.forEach((order)=>{
        let mon = Number(String(order.createdAt).substring(5,7))
        totalAmount += order.totalPrice;
        years[mon-1] += order.totalPrice;
        (order.orderStatus === "Delivered")?del+=1:proc+=1;
    })
    for (let index = 0; index < years.length; index++) {
        years[index] = parseInt(years[index]);
    }
    totalAmount = totalAmount.toFixed(2)
    let date = new Date()
    date = date.getFullYear()


    const series =  [proc, del]

    const donutOptions = {
        chart: { 
            type: "donut",
        },
        colors: ["#003566", "#A3D2FC"],
        legend: { show: false },
        dataLabels: { enabled: false },
        plotOptions: {
            pie:{
                expandOnClick: false,
                donut: {
                    labels: {
                        show: true,
                        total:{
                            show:true,
                            fontSize:"1rem",
                            color:"#003566"
                        }
                    }
                }
            }
        },
        labels: ['Processing', 'Delivered'],
        series: [proc, del],
        legend: {
            position: "top",
            horizontalAlign: "right",
        },
        fill: {
            opacity: 1,
        },
    }    

    const TotalRevenueSeries = [{
        name: "This Year",
        data: years,
    }]
    const options = {
        chart: {
            type: "bar",
            toolbar: {
                show: false,
            },
        },
        colors: ["#003566", "#A3D2FC"],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
            },
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            show: false,
        },
        stroke: {
            colors: ["transparent"],
            width: 4,
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug","Sep","Oct","Nov","Dec"],
        },
        yaxis: {
            // title: {
            //     text: "₹Revenue (thousands)",
            // },
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
        },
    }


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

  return (
    <Fragment>
        {loading?<Loader/>:(
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
                                            <Typography fontSize={15} fontWeight={400} color="#11142d" padding>
                                                Products:
                                            </Typography>
                                            <p>
                                                {products && (<CountUp end={products.length} duration={2} />)
                                                }
                                            </p>
                                        </div>
                                        <div>
                                            <Typography fontSize={15} fontWeight={400} color="#11142d" padding>
                                                Orders:
                                            </Typography>
                                            <p>
                                                {orders && (<CountUp end={orders.length} duration={2} />)}
                                            </p>
                                        </div>
                                        <div>
                                            <Typography fontSize={15} fontWeight={400} color="#11142d" padding>
                                                Users:
                                            </Typography>
                                            <p>
                                                {users && (<CountUp end={users.length} duration={2} />)}
                                            </p>
                                        </div>
                                        <div>
                                            <Typography fontSize={15} fontWeight={400} color="#11142d" padding>
                                                Total Revenue:
                                            </Typography>
                                            <p>₹ <CountUp end={totalAmount} duration={1} /></p>
                                        </div>
                                    </div>
                                    <div className="charts">
                                        <div className="lineChart">
                                            <Typography fontSize={15} fontWeight={400} color="#11142d" padding>
                                                Total Revenue ({date})
                                            </Typography>
                                            <Chart
                                                series={TotalRevenueSeries}
                                                type="bar"
                                                height={300}
                                                options={options}
                                            />
                                        </div>
                                        <div className="donutChart">   
                                            <Typography fontSize={15} fontWeight={400} color="#11142d" padding>
                                                Order's Status:
                                            </Typography> 
                                            <div> 
                                                {orders && (
                                                    <Chart
                                                        series={series}
                                                        type="donut"
                                                        width="300px"
                                                        options={donutOptions}
                                                    />
                                                )}   
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="refundRequestSection">
                                        <a href="/admin/dashboard/refund">
                                        <Typography fontSize={30} fontWeight={400} color="#11142d" padding>
                                                Refund Requests
                                        </Typography> 
                                        </a>
                                    </div> */}
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