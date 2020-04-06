import * as React from 'react';
import {Product} from '../no-di/product/product.entity';

function Products(props:{products: Product[]})  {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>App</title>
            </head>
            <body>
                <h2>Featured Products</h2>
                {props.products.map((product)=> {
                    return (<div>{product.Name} — ${product.UnitPrice}</div>);
                })}
            </body>
        </html>
    )
}

module.exports = Products;
