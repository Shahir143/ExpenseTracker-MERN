import { createSlice } from "@reduxjs/toolkit";

const initialExpenses = {
  allExpenses: [],
  organisedExpenses: [],
  topFiveExpenses: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenses,
  reducers: {
    setExpenses(state, action) {
      const { allExpenses, organisedExpenses, topFiveExpenses } =
        action.payload;
      allExpenses = allExpenses;
      organisedExpenses = organisedExpenses;
      topFiveExpenses = topFiveExpenses;
    },

    addExpenses(state, action) {
      const newExpense = action.payload;
      state.allExpenses.push(newExpense);
      if (state.topFiveExpenses.length < 5) {
        state.topFiveExpenses.unshift(newExpense);
      } else {
        state.topFiveExpenses.pop();
        state.topFiveExpenses.unshift(newExpense);
      }
      //update organisedExpenses
      const category = newExpense.category || "Uncategorized";

      //check if the category is already exists
      if (!state.organisedExpenses[category]) {
        //if not create new category with new expense
        state.organisedExpenses[category] = newExpense;
      } else {
        //if the category exists, check the length and add the new expense
        if (state.organisedExpenses[category].length < 2) {
          state.organisedExpenses[category].push(newExpense);
        }
      }
    },

    updateExpense(state, action) {
      const updatedExpenses = action.payload;
      //finding the expense from the allExpenses
      const index = state.allExpenses.findIndex((expenses) => {
        return expenses._id === updatedExpenses._id;
      });

      if (index !== -1) {
        //update in allExpenses
        state.allExpenses[index] = updatedExpenses;

        //update in top five
        const topFiveIndex = state.topFiveExpenses.findIndex(
          (expense) => expense._id === updatedExpenses._id
        );

        if (topFiveIndex !== -1) {
          state.topFiveExpenses[topFiveIndex] = updatedExpenses;
        }

        //update in organisedExpenses
        state.organisedExpenses = updatedinOrganisedExpenses(
          state.organisedExpenses,
          updatedExpenses
        );
      }
    },

    deleteExpenses(state, action) {
      const expenseIdToDelete = action.payload;
      state.allExpenses = state.allExpenses.filter(
        (expense) => expense._id !== expenseIdToDelete
      );
      //Remove from topFiveExpenses if present

      state.topFiveExpenses = state.topFiveExpenses.filter(
        (expense) => expense._id !== expenseIdToDelete
      );

      state.organisedExpenses = removeDeletedFromOrganisedExpenses(
        state.organisedExpenses,
        state.allExpenses,
        expenseIdToDelete
      );
    },

    clearState(state) {
      state.allExpenses = [];
      state.topFiveIndex = [];
      state.organisedExpenses = [];
    },
  },
});

const updatedinOrganisedExpenses = (organisedExpenses, updateExpense) => {
  const updatedCategory = updateExpense.category || "Uncategorized";

  //find the categorized in the organizedExpenses
  const updatedCategorizedExpenses = organisedExpenses[updatedCategory] || [];

  //find the index of expense in the category

  const updatedIndex= updatedCategorizedExpenses.findIndex(
    (expense)=>expense._id===updateExpense._id);

  if(updatedIndex!==-1){
    organisedExpenses[updatedCategory][updatedIndex]={
        ...updateExpense,
        date:updateExpense.date,
    };
  }
  return organisedExpenses;
};

const removeDeletedFromOrganisedExpenses(
    organisedExpenses,
    allExpenses,
    expenseIdToDelete
  )=>{
    //find the deleted expenses in allExpenses
    const deletedExpense =allExpenses.find(
        (expense)=> expense._id === expenseIdToDelete
    )


    if(deletedExpense){
        //Get the category of the deleted expense
        const deletedCategory = deletedExpense.category|| "Uncategorized";

        //find the index of the deleted expense in the category
        const deletedIndex =organisedExpenses[deletedCategory].findIndex(
            (expense)=> expense._id===expenseIdToDelete
        )

        // if found, remove the deleted expense in the category
        if(deletedIndex!==-1){
            organisedExpenses[deletedCategory].splice(deletedIndex, 1);

            //if the category becomes empty after removing,delete the category 
            if(organisedExpenses[deletedCategory].length===0){
                delete organisedExpenses[deletedCategory];
            }

        }
        return organisedExpenses;
    }
  }
  
  export const expenseAction =expenseSlice.actions;
  export default expenseSlice;