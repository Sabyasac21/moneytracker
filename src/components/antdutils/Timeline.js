import React from "react";
import { Timeline } from "antd";
import "./timeline.css";
import { motion } from "framer-motion";
// import '../../App.css'
const App = () => {
  return (
    <>
      <Timeline
        mode="alternate"
        items={[
          {
            label: "2015-09-01",
            children: (
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 1 }}
                className="timeline-content"
              >
                'Create an account'
              </motion.div>
            ),
            color: "blue",
          },
          {
            label: "2015-09-01 09:12:11",
            children: (
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 1.5 }}
                className="timeline-content"
              >
                'Enter your each expenses everyday'
              </motion.div>
            ),
            color: "red",
          },
          {
            children: (
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 1 }}
                className="timeline-content"
              >
                'Enter if you earned something'
              </motion.div>
            ),
            color: "green",
          },
          {
            label: "2015-09-01 09:12:11",
            children: (
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 1 }}
                className="timeline-content"
              >
                'Put the category of expense or income'
              </motion.div>
            ),
            color: "brown",
          },
          {
            label: "2015-09-01 09:12:11",
            children: (
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 1 }}
                className="timeline-content"
              >
                'Check your monthly, daily and yearly expenses and track your
                expenses with us'
              </motion.div>
            ),
            color: "green",
          },
        ]}
      />
    </>
  );
};
export default App;
