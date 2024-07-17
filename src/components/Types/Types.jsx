import React, { useEffect, useState } from "react";
import productApi from '../../api/productApi';
import styles from "./Types.module.css"; //

function Types({ onTypeSelect, selectedType }) {
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

            <ul className={styles.list}>
                {types.map((type, index) => (
                    <li
                        key={index}
                        onClick={() => onTypeSelect(type)}
                        className={type === selectedType ? styles.selected : ''}
                    >
                        {type}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Types;
