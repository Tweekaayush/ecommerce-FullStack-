import React, { Fragment, useRef, useState } from 'react'
import "./Dashboard.css"
import Sidebar from "./Sidebar.js"
import Metadata from "../layout/Metadata"
import {Line} from "react-chartjs-2"
import {useSelector} from "react-redux"
import {Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Scale} from "chart.js"


ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
)

const Dashboard = () => {

    const dashboardTab = useRef(null)
    const dashboardProductsTab = useRef(null)
    const dashboardOrdersTab = useRef(null)
    const dashboardUsersTab = useRef(null)

    const { orders } = useSelector((state) => state.myOrders);

    let totalAmount = 0;
    orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

    const lineState = {
        labels: ["Initial Amount", "Total Amount"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: "#003566",
            hoverBackgroundColor: "rgb(197, 72, 49)",
            data: [0, 5000],
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

  return (
    <Fragment>
        <Metadata title="Dashboard" />
        <div className="dashboardContainer">
            <Sidebar switcherTab={switcherTab}/>
            <div className="dashboardContainerContent">
                <div ref={dashboardTab} className="dashboardComponent">
                    <div className="dashboardHeading">
                        <h1 className='dashboardAllHeadings'>Dashboard</h1>
                    </div>
                    <div className="dashboardDetails">
                        <div className="dashboardSummaryBox">
                            <div>
                                <p>Products</p>
                                <p>50</p>
                            </div>
                            <div>
                                <p>Orders</p>
                                <p>50</p>
                            </div>
                            <div>
                                <p>Users</p>
                                <p>50</p>
                            </div>
                            <div>
                                <p>Reviews</p>
                                <p>50</p>
                            </div>
                        </div>
                        <div className="lineChart">
                            <></>
                          <Line data={lineState} options={options} />
                        </div>
                    </div>
                </div>
                <div ref={dashboardProductsTab} className="dashboardComponent dashboardContent-inactive">
                    <div className="dashboardHeading">
                        <h1 className='dashboardAllHeadings'>Products</h1>
                    </div>
                    <div className="dashboardProductComponent">
                        
                    </div>
                </div>
                <div ref={dashboardOrdersTab} className="dashboardComponent dashboardContent-inactive">
                    <div className="dashboardHeading">
                        <h1 className='dashboardAllHeadings'>Orders</h1>
                    </div>
                </div>
                <div ref={dashboardUsersTab} className="dashboardComponent dashboardContent-inactive">
                    <div className="dashboardHeading">
                        <h1 className='dashboardAllHeadings'>Users</h1>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Dashboard