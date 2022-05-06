import React, { memo } from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const CountriesMap = ({ countryHovered, data, countryClicked }) => {

    const rounded = num => {
        if (num > 1000000000) {
            return Math.round(num / 100000000) / 10 + "B";
        } else if (num > 1000000) {
            return Math.round(num / 100000) / 10 + "M";
        } else {
            return Math.round(num / 100) / 10 + "K";
        }
    };
    const colorScale = num => {
        if (num > 100000000) {
            return 'rgb(255, 0, 0)'
        } else if (num > 100000000) {
            return 'rgb(255, 30, 30)';
        } else if (num > 50000000) {
            return 'rgb(255, 50, 50)';
        } else if (num > 25000000) {
            return 'rgb(255, 70, 70)';
        } else if (num > 10000000) {
            return 'rgb(255, 90, 90)';
        } else if (num > 5000000) {
            return 'rgb(255, 120, 120)';
        } else if (num > 1000000) {
            return 'rgb(255, 150, 150)';
        } else if (num > 100000) {
            return 'rgb(255, 195, 195)';
        } else 
            return 'rgb(255, 227, 227)'
    };

    return (
        <ComposableMap data-tip="" >
            {/* <ZoomableGroup> */}
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map(geo => {
                            const cur = geo.properties.NAME === 'United States of America' ?
                                data.find(s => s.country_name === 'United States') :
                                geo.properties.NAME === 'Russia' ?
                                data.find(s => s.country_name === 'Russian Federation') :
                                geo.properties.NAME === 'Iran' ?
                                data.find(s => s.country_name === 'Iran, Islamic Rep.') :
                                geo.properties.NAME === 'Venezuela' ?
                                data.find(s => s.country_name === 'Venezuela, RB') :
                                geo.properties.NAME === 'Dominican Rep.' ?
                                data.find(s => s.country_name === 'Dominica') :
                                geo.properties.NAME === 'Bahamas' ?
                                data.find(s => s.country_name === 'Bahamas, The') :
                                geo.properties.NAME === 'Egypt' ?
                                data.find(s => s.country_name === 'Egypt, Arab Rep.') :
                                geo.properties.NAME === "Côte d'Ivoire" ?
                                data.find(s => s.country_name === 'Côte d’Ivoire') :
                                geo.properties.NAME === "Yemen" ?
                                data.find(s => s.country_name === 'Yemen, Rep.') :
                                geo.properties.NAME === "Gambia" ?
                                data.find(s => s.country_name === 'Gambia, The') :
                                geo.properties.NAME === "Syria" ?
                                data.find(s => s.country_name === 'Syrian Arab Republic') :
                                geo.properties.NAME === "Kyrgyzstan" ?
                                data.find(s => s.country_name === 'Kyrgyz Republic') :
                                geo.properties.NAME === "Macedonia" ?
                                data.find(s => s.country_name === 'Macedonia, FYR') :
                                geo.properties.NAME === "Bosnia and Herz." ?
                                data.find(s => s.country_name === 'Bosnia and Herzegovina') :
                                geo.properties.NAME === 'Slovakia' ?
                                data.find(s => s.country_name === 'Slovak Republic') :
                                geo.properties.NAME === 'North Korea' ?
                                data.find(s => s.country_name === 'Korea, Rep.') :
                                geo.properties.NAME === 'South Korea' ?
                                data.find(s => s.country_name === 'Korea, Rep.') :
                                geo.properties.NAME === 'Czechia' ?
                                data.find(s => s.country_name === 'Czech Republic') :
                                geo.properties.NAME === 'Somaliland' ?
                                data.find(s => s.country_name === 'Somalia') :
                                geo.properties.NAME === 'Laos' ?
                                data.find(s => s.country_name === 'Lao PDR') :
                                geo.properties.NAME === 'Brunei' ?
                                data.find(s => s.country_name === 'Brunei Darussalam') :
                                geo.properties.NAME === 'Dem. Rep. Congo' ?
                                data.find(s => s.country_name === 'Congo, Dem. Rep.') :
                                geo.properties.NAME === 'Central African Rep.' ?
                                data.find(s => s.country_name === 'Central African Republic') :
                                geo.properties.NAME === 'Congo' ?
                                data.find(s => s.country_name === 'Congo, Rep.') :
                                geo.properties.NAME === 'S. Sudan' ?
                                data.find(s => s.country_name === 'South Sudan') :
                                geo.properties.NAME === 'Eq. Guinea' ?
                                data.find(s => s.country_name === 'Equatorial Guinea') :
                                geo.properties.NAME === 'Swaziland' ?
                                data.find(s => s.country_name === 'Eswatini') :
                                data.find(s => s.country_name === geo.properties.NAME)
                                
                            return <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onMouseDown={e => {
                                    e.preventDefault()
                                    countryClicked(cur)
                                }}
                                onMouseEnter={() => {
                                    const { NAME, POP_EST } = geo.properties; 
                                    cur ?
                                        countryHovered(
                                            <div style={{
                                                margin: 8,

                                            }}>
                                                <p style={{
                                                    fontWeight: "bold",
                                                    fontSize: 20
                                                }}>{NAME}</p>
                                                <hr />
                                                <div style={{
                                                    justifyContent: "space-between",
                                                    display: 'flex',
                                                    fontSize: 17
                                                }}>
                                                    <p>Population:</p>
                                                    <span style={{ color: 'green', marginLeft: 6 }}>
                                                        {rounded(POP_EST)}
                                                    </span>
                                                </div>
                                                <hr />
                                                <div style={{
                                                    justifyContent: "space-between",
                                                    display: 'flex',
                                                    fontSize: 17
                                                }}>
                                                    <p>GDP:</p>
                                                    <span style={{ color: 'orange' }}>
                                                        {cur.gdp ? "$"+ rounded(Number(cur.gdp +"")): "Not Available"}
                                                    </span>
                                                </div>
                                                <div style={{
                                                    justifyContent: "space-between",
                                                    display: 'flex',
                                                    fontSize: 17
                                                }}>
                                                    <p>MSW generated:</p>
                                                    <span style={{ color: 'blue', marginLeft: 8 }}>
                                                        {rounded(Number(cur.total_msw_total_msw_generated_tons_year +"")) +" tons"}
                                                    </span>
                                                </div>
                                            </div>
                                        ) :
                                        countryHovered(
                                            <div>
                                                <p style={{
                                                    fontWeight: "bold",
                                                    fontSize: 20
                                                }}>{NAME}</p>
                                                <hr />
                                                <p style={{
                                                    // fontWeight: "bold",
                                                    fontSize: 17
                                                }}>No info available</p>
                                            </div>
                                        )
                                }}
                                onMouseLeave={() => {
                                    countryHovered("");
                                }}

                                fill={cur ? colorScale(Number(cur.total_msw_total_msw_generated_tons_year + "")) : "black"}
                            />
                        })
                    }
                </Geographies>
            {/* </ZoomableGroup> */}
        </ComposableMap>
    );
};

export default memo(CountriesMap);
