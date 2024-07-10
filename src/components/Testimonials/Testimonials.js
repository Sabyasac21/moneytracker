import Card from "../antdutils/Card";
import React from "react";
import './testimonials.css'

const Testimonials = () => {
  const datas = [
    {
      testimonial:
        "I've tried several finance tracking apps, but this one stands out with its intuitive design and powerful features. Keeping track of my daily expenses and savings has never been easier. Highly recommend!",
      user: "— Subhash Ghai, Freelance Graphic Designer",
    },
    {
        testimonial:
         "I love how this app allows me to categorize my expenses and set financial goals. It's helped me save more effectively and keep track of my spending habits. The user interface is clean and easy to navigate.",
        user: "— Mehul R., Marketing Professional",
      },
      {
        testimonial:
          "This finance tracker app has been a lifesaver! The ability to see my spending trends over time has really helped me cut down on unnecessary expenses. I feel more in control of my money than ever before.",
        user: "— Arsalan P., Software Engineer",
      },
  ];
  return (
    <div className="testimonials-cont">
      
      {datas.map((data)=>{
        return <Card  content={data.testimonial} user={data.user}/>
      })}
      
    </div>
  );
};

export default Testimonials;
