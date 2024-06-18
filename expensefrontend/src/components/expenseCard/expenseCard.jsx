import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import modal from "../modal/modal";
import classes from "./expense.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectDarkMode } from "../../utilities/redux/slices/modeSlice";
import { expenseActions } from "../../utilities/redux/slices/expenseSlice";

export const expenseCard = (props) => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const [expenseDetails, setExpenseDetails] = useState(null);
  const token = useSelector((state) => state.auth.authToken);
  const itemRef = useRef({ current: "" });
  const locationRef = useRef({ current: "" });
  const paymentRef = useRef({ current: "" });
  const priceRef = useRef({ current: "" });
  const dateRef = useRef({ current: "" });
  const categoryRef = useRef({ current: "" });

  const DeleteHandler = async () => {
    try {
      await axios.delete(
        `https://localhost:8080/api/delete-expense/${props.expenseId}`,
        { header: { Authorization: token } }
      );
      props.closeHandler;
      dispatch(expenseActions.deleteExpenses(props.expenseId));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getExpenseDetails = async () => {
      const response = await axios.get(
        `https://localhost:8080/api/get-expense/${props.expenseId}`,
        { header: { Authorization: token } }
      );
      itemRef.current.value=response.data.expenseData.item;
      locationRef.current.value=response.data.expenseData.location;
      paymentRef.current.value=response.data.expenseData.payment;
      priceRef.current.value=response.data.expenseData.price;
      categoryRef.current.value=response.data.expenseData.category;

      const dateObject =new Date(response.data.expenseData.date);
      const year = dateObject.getFullYear();
      const month =(dateObject.getMonth()+1).toString().padStart(2, '0');
      const day=(dateObject.getDate()+1).toString().padStart(2, '0');

      const formattedDate =`${year} - ${month} - ${day}`;
      dateRef.current.value=formattedDate;
      setExpenseDetails(response.data.expenseData);
    };
    getExpenseDetails();
  },[props.expenseId,token])
  if(!expenseDetails){
    return;
  }

  const formSubmitHandler =async(e)=>{
    e.preventDefault();

    const expenseDetails ={
        item:itemRef.current.value,
        location:locationRef.current.value,
        date:dateRef.current.value,
        paymentType:paymentRef.current.value,
        amount:priceRef.current.value,
        category:categoryRef.current.value
    }
    const response = await axios.post(
        `https://localhost:8080/api/update-expense/${props.expenseId}`,expenseDetails
        { header: { Authorization: token } }
      );
      dispatch(expenseActions.updateExpense(response.data.updatedExpense));
      props.closeHandler();
  }
  return <>
  <modal>
    <form className={`${classes['form-container']} ${darkMode ? classes['dark-mode']:classes['light-mode']}`} onSubmit={formSubmitHandler} >
        <div className={`${classes['form-control']}`}>
            <div className={`${classes['form-group']}`}>
                <label htmlFor="">Is this what you spend on</label>
                <input type="text" placeholder="EX tickets,popcorn,travelling,shopping...." ref={itemRef}/>
            </div>
            <div className={`${classes['form-group']}`}>
                <label htmlFor="">Is this where you spend on</label>
                <input type="text" placeholder="EX cinema halls, bus stand, malls...." ref={itemRef}/>
            </div>
            <div className={`${classes['form-group']}`}>
                <label htmlFor="">Is this category correct ?</label>
                <select name="" id="" ref={categoryRef}>
                    <option defaultChecked>Select an category</option>
                    <option value="food">Food</option>
                    <option value="shopping">Shopping</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="Bills">Bills</option>
                    <option value="transport">Transport</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className={`${classes['form-group']}`}>
                <label htmlFor="">Payment method</label>
                <select name="" id="" ref={paymentRef}>
                    <option defaultChecked>Select payment method</option>
                    <option value="emi">Emi</option>
                    <option value="debit">Debit</option>
                    <option value="credit">Credit</option>
                    <option value="cash">Cash</option>
                    <option value="other">other</option>
                </select>
            </div>
            <div className={`${classes['form-group']}`}>
                <label htmlFor="">on which day you spend</label>
                <input type="date" placeholder="Rs:1000 on 10/6/2022" ref={dateRef}/>
            </div>
            <div>
                <label htmlFor="">How much amount spend ? </label>
                <input type="number"  placeholder="Rs:1000"ref={priceRef}/>
            </div>
        </div>
        <div className={`${classes['form-actions']}`}>
            <button type="reset" onClick={DeleteHandler}>Delete</button>
            <button type="submit">Update Expenses</button>
            <button onClick={()=>props.closeHandler()}>Cancel</button>
        </div>
    </form>
  </modal>
  </>;
};
