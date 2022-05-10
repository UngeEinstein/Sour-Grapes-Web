import React from "react";

export default function frontPageArt() {
    return (
        <div id="frontPageArt">
            <img src={require('../img/grapeWines.png')} alt="wineArt" id="frontPageImg"/>
            <h2 id="quote">葡萄酒很美味，但用法语<br />或意大利语甚至更美味</h2>
            <h2 id="author">- Team 30</h2>
        </div>
    )
}