import { useState } from "react";
import {toast} from 'react-toastify';
import orderApi from "../../api/orderApi";
import '../../styles/ReturnSurveyModal.css';

const ReturnSurveyModal = ({ onClose ,orderId}) => {
  const [formData, setFormData] = useState({
    reason: "",
    satisfaction: 8,
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReturnReason = async() => {
    alert('Thank you for your contribution. TIMEPIECE is committed to improving service quality in the future.');
    const status = 'Canceled';
    try{
      const response = await orderApi.changeStatus(orderId , status);
      toast.success(response.message);
    }catch(err){
      toast.error(err.response?.data?.message||err.message);
    }finally{
      onClose();
    }
  };

  return (
    <div className="survey-overlay">
      <div className="survey-modal">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2>Return & Refund Experience Survey</h2>
        <p className="subtitle">
          We're sorry that your Timepiece watch did not meet your expectations.
          Please share your feedback to help us improve our products and service.
        </p>

        <form >
          {/* Reason for Return */}
          <div className="form-group">
            <label>Reason for your return/refund request</label>
            <select className="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            >
              <option value="">-- Please select a reason --</option>
              <option value="defective">Product was defective or damaged</option>
              <option value="wrong_item">Received the wrong item</option>
              <option value="not_as_expected">Item not as described</option>
              <option value="shipping_delay">Shipping took too long</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Satisfaction */}
          <div className="form-group">
            <label>How satisfied were you with the product before returning?</label>
            <div className="rating-group">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  type="button"
                  key={num}
                  className={`rating-btn ${num <= formData.satisfaction ? "active" : ""}`}
                  onClick={() => setFormData((prev) => ({ ...prev, satisfaction: num }))}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div className="form-group">
            <label>Additional comments or suggestions</label>
            <textarea className="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Tell us what went wrong or how we can improve..."
              rows="4"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={()=>handleReturnReason()}>
              Skip
            </button>
            <button type="submit" className="submit-btn" onClick={()=>handleReturnReason()}>
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnSurveyModal;
