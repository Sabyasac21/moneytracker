import React from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setShowExpenseForm, setShowModal } from "../../Redux/Slice";
import Signup from "../Forms/Signup";
import ExpenseEdit from "../Forms/ExpenseEdit";
import { useLocation, useParams } from "react-router-dom";
import AmountDelete from "../Forms/AmountDelete";
const App = ({refreshData}) => {
  const dispatch = useDispatch();
  const modalOpen = useSelector((state) => state.handleApp.showModal);
  const expensFormOpen = useSelector((state)=>state.handleApp.showExpenseForm);
  const handleClose = ()=>{
    dispatch(setShowModal(false))
    dispatch(setShowExpenseForm(false))
  }
  const location = useLocation()
  const incomePath = location.pathname.includes('/dashboard/income');
  const userId = useParams()

  
  return (
    <Modal
      width='auto'
      title={<span style={{fontSize:'28px', color:'#123F1E'}}>{(modalOpen&&'Enter Your Details')|| (expensFormOpen&&(incomePath?'Edit Your Income':'Edit Your Expense'))}</span>}
      centered
      open={modalOpen || expensFormOpen}
      footer={null}
      onOk={() => dispatch(setShowModal(false))}
      onCancel={handleClose}
    >
      <div>{
        // modalOpen?(<Signup/>) : expensFormOpen?(<ExpenseEdit/>) : ('')
        (modalOpen&&(location.pathname==='/register'||location.pathname==='/login')&&<Signup/>) ||
        (modalOpen && (location.pathname.includes('/delete')&&<AmountDelete/>))||
        (expensFormOpen&&<ExpenseEdit refreshData={refreshData}/>)
        
        }</div>
    </Modal>
  );
};
export default App;
