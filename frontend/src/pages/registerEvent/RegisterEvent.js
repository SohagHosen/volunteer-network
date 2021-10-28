import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useParams, useHistory, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
const RegisterEvent = () => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [event, setEvent] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { eventName } = useParams();
  let history = useHistory();
  let location = useLocation();
  const onSubmit = (data) => {
    data.date = startDate;
    const newData = { ...data, eventId: event.id, img: event.img };

    axios
      .post("https://floating-inlet-31216.herokuapp.com/register", newData)
      .then((res) => {
        if (res.data.insertedId) {
          alert("Registration Successful");
          history.push("/myEvents");
        }
      });
  };
  useEffect(() => {
    setEvent(location.state);
  }, []);

  return (
    <div class="mx-auto sm:w-2/3 my-10">
      <div class="flex justify-center items-center ">
        <div class="w-full bg-white rounded shadow-2xl p-8 m-4">
          <h1 class="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
            Register
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="flex flex-col mb-4">
              <label class="mb-2 font-bold text-lg text-gray-900" for="name">
                Name
              </label>
              <input
                {...register("name", { required: true })}
                defaultValue={user?.displayName}
                class="border py-2 px-3 text-grey-800"
                type="text"
                name="name"
                id="name"
              />
            </div>

            <div class="flex flex-col mb-4">
              <label class="mb-2 font-bold text-lg text-gray-900" for="email">
                Email
              </label>
              <input
                defaultValue={user?.email}
                {...register("email", { required: true })}
                class="border py-2 px-3 text-grey-800"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div class="flex flex-col mb-4">
              <label class="mb-2 font-bold text-lg text-gray-900" for="date">
                Date
              </label>
              <DatePicker
                className="w-full border py-2 px-3 text-grey-800"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div class="flex flex-col mb-4">
              <label
                class="mb-2 font-bold text-lg text-gray-900"
                for="description"
              >
                Description
              </label>
              <input
                {...register("description")}
                class="border py-2 px-3 text-grey-800"
                type="text"
                name="description"
                id="description"
              />
            </div>
            <div class="flex flex-col mb-4">
              <label class="mb-2 font-bold text-lg text-gray-900" for="event">
                Event
              </label>
              <input
                defaultValue={eventName}
                {...register("event", { required: true })}
                class="border py-2 px-3 text-grey-800"
                type="text"
                name="event"
                id="event"
              />
            </div>
            <input
              class="block bg-indigo-500 text-white uppercase text-lg mx-auto px-4 py-2 cursor-pointer rounded"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterEvent;
