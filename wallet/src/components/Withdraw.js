import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
} from "react-router-dom";
import React, { useState } from 'react'

export default function Deposit() {

    const [data, setData] = useState({
        address: null,
        amount: 0
    });

    const handleChange = (evt) => {
        this.setData({
            [evt.target.name]: evt.target.value
        });

    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setData({
            [evt.target.name]: evt.target.value
        })
    }

    return (
        <div className="container d-flex">
            <div className="card bg-info" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title m-3 text-center text-bg-dark">WITHDRAW</h5>
                    <form>
                        <div className="m-3">
                            <label htmlFor="amount" className="form-label">Enter Amount </label>
                            <input type="number" className=" form-control" id="amount" name="amount" value={data.value} onChange={handleChange} />
                        </div>
                    </form>
                    <a href="/" className="btn btn-danger m-3">Cancel</a>
                    <button type="submit" className="btn btn-success m-3" onSubmit={handleSubmit}>Deposit</button>
                </div>
            </div>
        </div>
    )
}

