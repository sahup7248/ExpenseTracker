import React, { useContext, useEffect } from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';

import { ExpenseTrackerContext } from '../../../context/context';
import useStyles from './styles';

const List = () => {
  useEffect(() => {
      let fetchTransactions = async () => {
        let user_id = JSON.parse(localStorage.user).body._id
        let transactions = await fetch(`http://localhost:5000/api/v001/data/get?user_id=${user_id}`, {
            headers: {
                'Authorization':"Bearer " + JSON.parse(localStorage.user).token
            },
        }).then(res => res.json()).then(jsonRes => {
                return jsonRes
        }).catch(error => console.log(error));
        if(transactions) return transactions;
        return null;
      }
      fetchTransactions().then(res => {
        localStorage.setItem("transactions", JSON.stringify(res))
      });

  });

  const removeTransaction = async (id) => {
    let removededTransaction = await fetch(`http://localhost:5000/api/v001/data/delete?id=${id}`, {
              method: "DELETE",
              headers: {
                  'Authorization':"Bearer " + JSON.parse(localStorage.user).token
              },
      }).then(res => res.json()).then(jsonRes => {
              return jsonRes
      }).catch(error => console.log(error));
      if(removededTransaction.ok) deleteTransaction(id)
  }
  const classes = useStyles();
  const { transactions, deleteTransaction } = useContext(ExpenseTrackerContext);

  return (
    <MUIList dense={false} className={classes.list}>
      {transactions.map((transaction, index) => (
        <Slide direction="down" in mountOnEnter unmountOnExit key={index}>
          <ListItem > 
            <ListItemAvatar>
              <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                <MoneyOff />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={transaction.category} secondary={`\u20B9 ${transaction.amount} - ${transaction.date}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => removeTransaction(transaction._id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
        )) 
      }
    </MUIList>
  );
};

export default List;
