import * as React from 'react';
import {ProductViewModel} from '../di/product/product.types';

function Products(props:{products: ProductViewModel[]})  {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>App</title>
            </head>
            <body>
                <h2>Featured Products</h2>
                {props.products.map((product)=> {
                    return (<div>{product.name} — ${product.price}</div>);
                })}
            </body>
        </html>
    )
}

module.exports = Products;
