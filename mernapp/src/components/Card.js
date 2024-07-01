import React, { useRef, useState, useEffect } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';
import { useNavigate } from 'react-router-dom';


const Card = (props) => {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);  // Correctly defined as 'qty' with lowercase 'q'
    const [size, setSize] = useState("");

    const handleAddToCart = async () => {

        
        await dispatch({
                type: "ADD",
                id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalPrice,
                qty: qty,  // Correctly referenced as 'qty' with lowercase 'q'
                size: size
            })

        
    };

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    let finalPrice = qty * parseInt(options[size]);

    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                <img src={props.foodItem.img} alt={props.foodItem.name} className="card-img-top" style={{ height: "120px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className='container w-100'>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            <div className='mt-1'>
                                Total: ₹{finalPrice}/-
                            </div>
                        </div>
                    </div>
                    <hr />
                    <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
