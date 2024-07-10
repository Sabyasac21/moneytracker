import React from "react";
import "./introFile.css";
import BarCharts from "../antdutils/BarCharts";
import Timeline from "../antdutils/Timeline";
import { useDispatch } from "react-redux";
import { setShowModal } from "../../Redux/Slice";
import Testimonials from "../Testimonials/Testimonials";
import Modal from "../antdutils/Modal";
import LineChart from "../antdutils/LineChart";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const IntroFile = () => {
  const dispatch = useDispatch();
  const handleGetStarted = () => {
    dispatch(setShowModal(true));
  };
  const data = [
    { day: "JAN", expense: 3000 },
    { day: "FEB", expense: 4000 },
    { day: "MAR", expense: 3500 },
    { day: "APR", expense: 5000 },
    { day: "MAY", expense: 4900 },
    { day: "JUNE", expense: 7000 },
    { day: "JULY", expense: 9000 },
    { day: "AUG", expense: 13000 },
  ];
  const data1 = [
    { expense: 100, day: "Monday" },
    { expense: 200, day: "Tuesday" },
    { expense: 150, day: "Wednesday" },
    { expense: 300, day: "Thursday" },
    { expense: 250, day: "Friday" },
  ];
  const data2 = [
    { expense: 50, day: "Monday" },
    { expense: 100, day: "Tuesday" },
    { expense: 250, day: "Wednesday" },
    { expense: 200, day: "Thursday" },
    { expense: 150, day: "Friday" },
  ];

  return (
    <div className="intro-wrapper">
      <div className="intro-main">
        <div className="intro-line">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            A promising Way to track your finances <br />
            using graphical representation
          </motion.h1>
        </div>

        <div className="charts-cont">
          <div className="charts">
            <LineChart value={data} />
          </div>
        </div>
      </div>

      <div className="explanation">
        <motion.h1
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
        >
          <span>Take control of your finances by</span> <br />{" "}
          <span>tracking the detailed expenses as small as</span> <br />{" "}
          <span>on everyday basis</span>
        </motion.h1>
        <div className="daily-example">
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -150 }}
            transition={{ duration: 1 }}
            className="bars "
          >
            <BarCharts value={data1} />
          </motion.div>
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 150 }}
            transition={{ duration: 1 }}
            className="bars "
          >
            <BarCharts value={data2} />
          </motion.div>
        </div>
      </div>

      <div className="app-usage-steps-container">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -100 }}
          transition={{ duration: 1 }}
          className="app-usage-intro"
        >
          <p>Improve your finances in 5 easy steps with us</p>
        </motion.div>
        <div className="timeline-steps">
          <Timeline />
        </div>
        <div className="getStarted-btn">
          <Link to="/register">
            <button onClick={handleGetStarted}>Get Started</button>
          </Link>
        </div>
      </div>
      <Testimonials />
      <Modal />
    </div>
  );
};

export default IntroFile;
