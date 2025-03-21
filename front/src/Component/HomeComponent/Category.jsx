import React from "react";
import { Link } from "react-router-dom"; // استيراد Link من react-router-dom
import "../CSS/Category.css";

const CategoryCards = () => {
  return (
    <div className="cards-container" id="shop">
      {/* Card 1 */}
      <div className="circle-card">
        <Link to="/Livevacc">
          <img
            className="circle-card-img"
            src="/src/assets/pic/cat3.b197b0.webp"
            alt="Live Vaccine"
          />
          <div className="circle-card-body">
            <h5 className="circle-card-title">Live Vaccine</h5>
          </div>
        </Link>
      </div>

      {/* Card 2 */}
      <div className="circle-card">
        <Link to="#">
          <img
            className="circle-card-img"
            src="/src/assets//pic/cat4-1.b197b0.webp"
            alt="Vitamins"
          />
          <div className="circle-card-body">
            <h5 className="circle-card-title">Vitamins</h5>
          </div>
        </Link>
      </div>

      {/* Card 3 */}
      <div className="circle-card">
        <Link to="#">
          <img
            className="circle-card-img"
            src="/src/assets//pic/cat5.b197b0.webp"
            alt="Disinfectants"
          />
          <div className="circle-card-body">
            <h5 className="circle-card-title">Disinfectants</h5>
          </div>
        </Link>
      </div>

      {/* Card 4 */}
      <div className="circle-card">
        <Link to="#">
          <img
            className="circle-card-img"
            src="/src/assets//pic/سماد.jpg"
            alt="Fertilizers"
          />
          <div className="circle-card-body">
            <h5 className="circle-card-title">Fertilizers</h5>
          </div>
        </Link>
      </div>

      {/* Card 5 */}
      <div className="circle-card">
        <Link to="#">
          <img
            className="circle-card-img"
            src="/src/assets//pic/بذور زراعية.jpg"
            alt="Seeds"
          />
          <div className="circle-card-body">
            <h5 className="circle-card-title">Seeds</h5>
          </div>
        </Link>
      </div>

      {/* Card 6 */}
      <div className="circle-card">
        <Link to="#">
          <img
            className="circle-card-img"
            src="/src/assets//pic/معدات زراعية.webp"
            alt="Equipment"
          />
          <div className="circle-card-body">
            <h5 className="circle-card-title">Equipment</h5>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCards;
