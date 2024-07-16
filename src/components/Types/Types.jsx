import React, { useEffect, useState } from "react";
import productApi from '../../api/productApi';
import styles from "./Types.module.css"; //

function Types({ onTypeSelect }) {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const productTypes = await productApi.getAllProductTypes();
                setTypes(productTypes);
            } catch (error) {
                console.error("Failed to fetch product types:", error);
            }
        };

        fetchTypes();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <ul className={` ${styles.list} `}>
                {types.map((type, index) => (
                    <li key={index} onClick={() => onTypeSelect(type)}>
                        {type}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Types;
