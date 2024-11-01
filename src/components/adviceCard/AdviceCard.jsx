import React, { useState, useEffect } from "react";
import "./AdviceCard.css";

function AdviceCard() {
  const [advice, setAdvice] = useState("");
  const [adviceId, setAdviceId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdvice(data.slip.advice);
      setAdviceId(data.slip.id);
    } catch (error) {
      console.error("Failed to fetch advice:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="advice-card">
      {loading ? (
        <div className="loading-animation"></div>
      ) : (
        <>
          <h4 className="advice-id">ADVICE #{adviceId}</h4>
          <p className="advice-text">"{advice}"</p>
          <div className="separator">
            <span className="line"></span>
            <span className="pause-icon">||</span>
            <span className="line"></span>
          </div>
        </>
      )}
      <button className="dice-button" onClick={fetchAdvice}>
        <div className="dice-icon">
          <div className="dot"></div>
        </div>
      </button>
      <img src="./assets/pointer.png" alt="" className="pointer-image" />
    </div>
  );
}

export default AdviceCard;
