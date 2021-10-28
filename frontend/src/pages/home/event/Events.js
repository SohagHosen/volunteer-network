import React from "react";
import { useHistory } from "react-router-dom";

const Events = ({ img, name, id }) => {
  const colors = ["#ffbd3e", "#ff7044", "#3f90fc", "#421fcf"];
  const activeColor = colors[Math.floor(Math.random() * colors.length)];
  let history = useHistory();
  const handleClick = () => {
    history.push(`/register/${name}`, { name, id: id, img: img });
  };

  return (
    <article
      style={{ backgroundColor: activeColor }}
      onClick={handleClick}
      className="rounded-lg shadow-lg bg-yellow-500 cursor-pointer mx-3 sm:mx-0 "
    >
      <img src={img} alt="" className="rounded-t-lg h-52 object-cover w-full" />
      <div className="p-6">
        <h2 className="font-bold text-center mb-2 text-2xl text-white">
          {name}
        </h2>
      </div>
    </article>
  );
};

export default Events;
