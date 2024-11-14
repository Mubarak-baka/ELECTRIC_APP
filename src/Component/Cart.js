
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function Cart() {
    const [cartData, setCartData] = useState([]); 

    useEffect(() => {
        fetch("http://localhost:3000/cart") 
            .then((response) => response.json())
            .then((data) => {
                setCartData(data); 
            })
            .catch((error) => console.error("Error fetching cart data:", error));
    }, []);

    // delete a transaction
    const deleteTransaction = (id) => {
        fetch(`http://localhost:3000/cart/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
                // Filter out the deleted transaction from the state
                setCartData(cartData.filter(transaction => transaction.id !== id));
                toast.success('Transaction deleted successfully!');
            } else {
                toast.error('Failed to delete transaction.'); 
            }
        })
        .catch((error) => {
            console.error('Error deleting transaction:', error);
            toast.error('Failed to delete transaction.');
        });
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Cart Transactions</h1>

            {cartData.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <div>
                    {/* Render cart transaction details */}
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Product</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                <th scope="col">Date</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartData.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.id}</td>
                                    <td>
                                        <ul>
                                            {transaction.cartDetails.map((item, i) => (
                                                <li key={i}>{item.title} (x{item.quantity})</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{transaction.cartDetails.reduce((acc, item) => acc + item.quantity, 0)}</td>
                                    <td>Ksh{transaction.totalAmount.toFixed(2)}</td>
                                    <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteTransaction(transaction.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={window.print()}>Print</button>
                </div>
            )}
        </div>
    );
}

export default Cart;
