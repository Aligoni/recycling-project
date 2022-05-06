import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import ReactTooltip from 'react-tooltip';
import { DataGrid } from '@mui/x-data-grid';

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CountriesMap from '../components/CountriesMap'
import styles from '../styles/Stats.module.scss'

import 'tailwindcss/tailwind.css'

const countryData = require('../constants/country_level_data.json')
const columns = [
    { field: 'id', headerName: "#", width: 30 },
    { field: 'country_name', headerName: "Country", width: 150 },

    // Inverted!!
    { headerName: "GDP ($)", field: "gdp", width: 150 },
    { headerName: "Total MSW generated (In Tons)", field: "total_msw_total_msw_generated_tons_year", width: 200 },
    { headerName: "Organic Food (%)", field: "composition_food_organic_waste_percent" },
    { headerName: "Metal (%)", field: "composition_metal_percent" },
    { headerName: "Glass (%)", field: "composition_glass_percent" },
    { headerName: "Paper (%)", field: "composition_paper_cardboard_percent" },
    { headerName: "Rubber (%)", field: "composition_rubber_leather_percent" },
    { headerName: "Wood (%)", field: "composition_wood_percent" },
    { headerName: 'Yard/Garden (%)', field: "composition_yard_garden_green_waste_percent" },
    { headerName: 'Plastic (%)', field: "composition_plastic_percent" },
    { headerName: 'Other (%)', field: "composition_other_percent" },
]

const rows = countryData.map((data, i) => {
    data.id = i + 1
    return data
})

export default function Stats() {
    const [tooltipContent, setTooltipContent] = useState("")

    const router = useRouter();

    const countryHovered = (name) => {
        if (!name) setTooltipContent('')

        setTooltipContent(name)
    }

    const countryClicked = (details) => {
        console.log(details)
    }


    return (
        <div className={styles.container}>

            <main className={styles.main}>
                <img src="/assets/stats-background.jpg" alt="" width="100%" height="100%" />

                <div className={styles.overlay}>
                    <Navbar router={router} />
                    <div className="flex-1 flex flex-col justify-center items-center">
                        <h1 className={styles.header}>World Statistics</h1>
                        <h5 className={styles.headerMini}>
                            Help bring change to the world
                        </h5>
                    </div>
                </div>
            </main>
            
            <section className={styles.mapSection}>

                <div className="">
                    <CountriesMap data={countryData} countryHovered={countryHovered} countryClicked={countryClicked}/>
                    <ReactTooltip type="light">{tooltipContent}</ReactTooltip>
                    
                </div>
                <div className={styles.mapKeys}>
                    <p className={styles.title}>
                        Municipal Solid Waste (in tons)
                    </p>
                    <div className={styles.legend}>
                        <div className={styles.icon + ' ' + styles.colorOne}></div>
                        <p className={styles.text}>{'> 100,000,000'}</p>
                    </div>
                    <div className={styles.legend}>
                        <div className={styles.icon + ' ' + styles.colorTwo}></div>
                        <p className={styles.text}>{'> 10,000,000'}</p>
                    </div>
                    <div className={styles.legend}>
                        <div className={styles.icon + ' ' + styles.colorThree}></div>
                        <p className={styles.text}>{'> 5,000,000'}</p>
                    </div>
                    <div className={styles.legend}>
                        <div className={styles.icon + ' ' + styles.colorFour}></div>
                        <p className={styles.text}>{'> 2,500,000'}</p>
                    </div>
                    <div className={styles.legend}>
                        <div className={styles.icon + ' ' + styles.colorFive}></div>
                        <p className={styles.text}>{'> 1,000,000'}</p>
                    </div>
                    <div className={styles.legend}>
                        <div className={styles.icon + ' ' + styles.colorSix}></div>
                        <p className={styles.text}>{'> 500,000'}</p>
                    </div>
                    <div className={styles.legend}>
                        <div className={styles.icon + ' ' + styles.colorSeven}></div>
                        <p className={styles.text}>{'> 100,000'}</p>
                    </div>
                    <div className={styles.legend}>
                        <div className={styles.icon + ' ' + styles.colorEight}></div>
                        <p className={styles.text}>{'> 10,000'}</p>
                    </div>
                    <div className={styles.legend}>
                        <div className={styles.icon + ' ' + styles.colorNine}></div>
                        <p className={styles.text}>{'Below 1,000'}</p>
                    </div>
                </div>
            </section>
            <div className={styles.tableContainer}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={50}
                />
                <Footer />
            </div>
        </div>
    )
}
