import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    axios
      .post("https://floating-inlet-31216.herokuapp.com/events", {
        email: user.email,
      })
      .then((res) => setEvents(res.data))
      .catch();
  }, []);
  const handleDelete = (id) => {
    axios
      .delete(`https://floating-inlet-31216.herokuapp.com/events/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.deletedCount === 1) {
          const remaining = events.filter((event) => event._id !== id);
          setEvents(remaining);
        }
      });
  };
  return (
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 container mx-auto my-10">
      {events?.map((event) => (
        <div class="w-full bg-gray-100 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
          <div class="md:w-2/4 ">
            <img
              class="object-center h-64 object-cover w-full"
              src={event.img}
              alt="photo"
            />
          </div>
          <div class="w-full md:w-2/4 text-left p-6 md:p-4 space-y-2 relative">
            <p class="text-xl text-gray-700 font-bold">{event.event}</p>
            <p class="text-base text-gray-400 font-normal">{event.name}</p>
            <p class="text-base text-gray-400 font-normal">{event.date}</p>
            <p class="text-base leading-relaxed text-gray-500 font-normal">
              {event.description}
            </p>
            <button
              onClick={() => handleDelete(event._id)}
              class="px-3 py-2 bg-red-500 text-white rounded font-bold w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyEvents;
