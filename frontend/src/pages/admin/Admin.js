import React, { useEffect, useState } from "react";
import axios from "axios";
const Admin = () => {
  const [allRegisters, setAllRegisters] = useState([]);
  useEffect(() => {
    axios
      .get("https://floating-inlet-31216.herokuapp.com/register")
      .then(function (response) {
        setAllRegisters(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://floating-inlet-31216.herokuapp.com/register/${id}`)
      .then((res) => {
        if (res.data.deletedCount === 1) {
          const remaining = allRegisters.filter(
            (register) => register._id !== id
          );
          setAllRegisters(remaining);
        }
      });
  };
  return (
    <div class="mt-20 container mx-auto">
      <section>
        <table class="min-w-full border-collapse block md:table">
          <thead class="block md:table-header-group">
            <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
              <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Name
              </th>
              <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Email Address
              </th>
              <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Registration dates
              </th>
              <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Volunteer list
              </th>
              <th class="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="block md:table-row-group">
            {allRegisters?.map((reg) => (
              <tr
                key={reg._id}
                class="bg-white border border-grey-500 md:border-none block md:table-row"
              >
                <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span class="inline-block w-1/3 md:hidden font-bold">
                    Name
                  </span>
                  {reg.name}
                </td>

                <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span class="inline-block w-1/3 md:hidden font-bold">
                    Email Address
                  </span>
                  {reg.email}
                </td>
                <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span class="inline-block w-1/3 md:hidden font-bold">
                    Registration dates
                  </span>
                  {reg.date}
                </td>
                <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span class="inline-block w-1/3 md:hidden font-bold">
                    Volunteer list
                  </span>
                  {reg.event}
                </td>
                <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  <span class="inline-block w-1/3 md:hidden font-bold">
                    Actions
                  </span>
                  <button
                    onClick={() => handleDelete(reg._id)}
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Admin;
