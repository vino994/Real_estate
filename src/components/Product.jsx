import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
const Product = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch('https://fakestoreapi.com/products');
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);

            }
            return () => {
                componentMounted = false;
            }
        }
        getProducts();
    }, [])
    const Loading = () => {
        return <>
            ...Loading
        </>
    }
    const filterProduct =(pro)=>{
        const updateList = data.filter((p)=>p.category === pro);
        setFilter(updateList);
    }
    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-around mb-4">
                    <button className="btn btn-outline-dark" onClick={()=>setFilter(data)}>All Product</button>
                    <button className="btn btn-outline-dark" onClick={()=>filterProduct("men's clothing")}>Men Product</button>
                    <button className="btn btn-outline-dark" onClick={()=>filterProduct("women's clothing")}>Women Product</button>
                    <button className="btn btn-outline-dark" onClick={()=>filterProduct("jewelery")}>Jewels Product</button>
                    <button className="btn btn-outline-dark" onClick={()=>filterProduct("electronics")}>Electric Product</button>
                </div>
                <hr />

                <h1>Products</h1>

                {filter.map((product) => {
                    console.log(product)
                    return (
                        <>
                            <div className="col-md-3 mb-4">
                                <div class="card h-100 text-center p-4" key={product.id} >
                                    <img src={product.image} class="card-img-top" alt="..." height="250" />
                                    <div class="card-body">
                                        <h5 class="card-title">{product.title.substring(0,12)}...</h5>
                                        <p class="card-text lead fw-bold">${product.price}</p>
                                        <NavLink to={`/Product/${product.id}`} class="btn btn-outline-dark">Buy Now</NavLink>
                                    </div>
                                </div>

                            </div>

                        </>
                    )
                })}
            </>
        )
    }
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
};

export default Product;