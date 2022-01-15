import React, {useEffect} from "react";
import RatingTableElement from "./RatingTableElement";

import RatingApi from "../services/RatingApi";

import './RatingTable.css'

export default class RatingTable extends React.Component {
    constructor(props) {
        super(props);
        this.rating_path = props.rating_path;
        this.state = {
            top_codes: []
        }
        this.getTopUsers();
    }

    getTopUsers() {
        RatingApi.GetTopCodes(8).then(data => {
            let idx = 0
            let top = []
            for (let obj of data.data.results) {
                top[idx] = obj;
                top[idx].number = (idx + 1).toString();
                idx += 1;
            }
            this.setState({top_codes: top});
        });
    }

    generateRowDiv(row) {
        return <RatingTableElement number={row.number} name={row.user_id} code={row.name} score={row.score}/>;
    }

    render() {
        return (
            <div>
                    <h1 style={{position: 'fixed', font: 'bold 4vw "Chakra Petch"', left: '18vw', top: '12vh'}}>Rating</h1>
                <div className='rating_table'>
                    <div className='rating_table_element' style={{backgroundColor: 'transparent'}}>
                        <div className='number_label' style={{backgroundColor: 'transparent', border: 'none'}}/>
                        <div className='label_top'>name</div>
                        <div className='label_top'>code</div>
                        <div className='label_top'>score</div>
                    </div>
                    {this.state.top_codes.slice(0, 8).map(this.generateRowDiv)}
                </div>
            </div>
        )
    }
}