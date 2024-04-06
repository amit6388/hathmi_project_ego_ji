const mongoose = require("mongoose");
const ExpenseSchema = new mongoose.Schema({
     
    Expense_Head  : {
        type: String,
       //required: true,
      },
      name: {
        type: String,
       //    required: true,
      },
    
      Invoice_Number: {
        type: Number,
//required: true,
      },
      Date: {
        type: String,
         //  required: true,
      },
      Amount: {
        type: String,
       //required: true,
      },
      Attach_Document: {
        type: String,
     //  required: true,
      },
      Description: {
        type: String,
      // required: true,
      },
    
    
}); 
module.exports = mongoose.model('Expense_tbl',ExpenseSchema);
 