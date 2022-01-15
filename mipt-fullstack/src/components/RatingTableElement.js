import React from "react";

import './RatingTableElement.css'

export default function RatingTableElement(props) {
    return (
        <div className='rating_table_element'>
            <div className='number_label'>{props.number}</div>
            <div className='label'>{props.name}</div>
            <div className='label'>{props.code}</div>
            <div className='label'>{props.score}</div>
        </div>
    )
}