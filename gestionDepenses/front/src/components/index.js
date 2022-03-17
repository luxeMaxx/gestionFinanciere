import React from "react";
import Body from "./body";
import FooterPage from "./footer";
import HeadPage from "./head";
import "../styles/design.css";



const PageIndex = () => {
    return (
        <div className = "container">
            <HeadPage />
            <Body />
            <FooterPage />
        </div>
    );
}
export default PageIndex;