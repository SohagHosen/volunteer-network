import React, { useEffect, useState } from "react";
import axios from "axios";
import Events from "./event/Events";

const Home = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/events")
      .then((res) => setEvents(res.data));
  }, []);
  return (
    <div className="my-10">
      <h1 className="text-4xl text-center my-10 font-bold">
        I GROW BY HELPING PEOPLE IN NEED.
      </h1>

      <section className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
        {events.map((event) => (
          <Events
            key={event._id}
            id={event._id}
            img={event.img}
            name={event.name}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
