import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export default function Manager() {
  const [isVisible, setisVisible] = useState(false);
  const [formPassword, setformPassword] = useState([]);
  const [viewPassword, setviewPassword] = useState({});
  const [copy, setcopy] = useState({ index: null, field: null });
  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
  });
  useEffect(() => {
    let sitePassword = localStorage.getItem("password");
    if (sitePassword) {
      try {
        const parsedPasswords = JSON.parse(sitePassword);
        setformPassword(Array.isArray(parsedPasswords) ? parsedPasswords : []);
      } catch (error) {
        console.error("Invalid JSON in localStorage. Resetting.");
        localStorage.removeItem("password"); // optional: reset storage
        setformPassword([]); // fallback to empty array
      }
    }
  }, []);

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    if (form.site === "" && form.username === "" && form.password === "") {
      toast("Add field first")
    } else {
      let newPasswordList = [...formPassword, { ...form, id: uuidv4() }];
      setformPassword(newPasswordList);
      localStorage.setItem("password", JSON.stringify(newPasswordList));
      setform({ site: "", username: "", password: "" });
      toast("Successfully saved ✅")
    }
  };
  const copyToClipboard = (value, index, field) => {
    toast("🦄 Copy to Clipboard!");
    navigator.clipboard.writeText(value).then(() => {
      setcopy({ index, field });

      setTimeout(() => {
        setcopy({ index: null, field: null });
      }, 2000);
    });
  };
  const editData = (id) => {
    setform(formPassword.filter((i) => i.id === id)[0]);
    setformPassword(formPassword.filter((i) => i.id != id));
  };
  const deleteData = (id) => {
    let c = confirm("Are you sure You want to delete contact")
    if(c)
    {
      setformPassword(formPassword.filter((item) => item.id != id));
    localStorage.setItem(
      "password",
      JSON.stringify(formPassword.filter((item) => item.id != id))
    );
     toast("Deleted successfully  ✅");
    }    
  };
  const viewPasswordSet = (id) => {
     setviewPassword((prev) => ({
    ...prev,
    [id]: !prev[id],
  }));
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div>
        <div className="absolute top-0 z-[-2] h-screen max-w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>

      <div className="lg:myContainer sm:mx-24 min-h-screen mb-10 mx-auto sm:max-w-[6xl]">
        <div className="flex flex-col gap-5 p-4">
          <div className="flex flex-col">
            <a href="" className="text-center text-3xl font-bold">
              <span className="text-green-700">&lt;</span>
              <span>Pass</span>
              <span className="text-green-700">OP/&gt;</span>
              <span></span>
            </a>
            <h1 className="text-lg font-semibold text-center">
              Your Own Password Manager
            </h1>
          </div>
          <input
            className="border border-green-400 rounded-full px-3 py-2 outline-none"
            type="text"
            placeholder="Website Name/URL"
            name="site"
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex flex-col sm:flex-row w-full gap-8 ">
            <input
              className="border flex-1 border-green-400 px-3 py-1 outline-none rounded-3xl"
              type="text"
              placeholder="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
            <div className="border flex-1 flex justify-between bg-white border-green-400 px-3 py-1  rounded-3xl">
              <input
                className="outline-none w-[80%]"
                type={isVisible ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
             {form.password === "" ? "":  <button
                onClick={() => {
                  setisVisible(!isVisible);
                }}
              >
                {isVisible ? (
                  <span>
                    <img src="hide.svg" alt="" />
                  </span>
                ) : (
                  <span>
                    <img src="show.svg" alt="" />
                  </span>
                )}
              </button>}
            </div>
          </div>
          <button
            onClick={handleSubmit}       
            className="flex items-center justify-center text-white font-semibold gap-2 border bg-green-500  rounded-full px-4 py-2 "
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#ffffff,secondary:#ffffff"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="show p-6 w-full sm:max-w-[6xl]">
          <h1 className="mb-4 text-xl font-semibold">Your Passwords</h1>
          <div className="w-full overflow-auto">
            {formPassword.length === 0 && <div>No password to show</div>}
            {formPassword.length != 0 && (
              <table className="w-full table-fixed">
                <thead className=" bg-green-500">
                  <tr>
                    <th className="w-[200px] sm:w-1/2 px-4 py-2 text-left">Website</th>
                    <th className="w-[150px] sm:w-1/4 px-4 py-2 text-left">Username</th>
                    <th className="w-[150px] sm:w-1/4 px-4 py-2 text-left">Password</th>
                    <th className="w-[80px] sm:w-20 px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formPassword.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="border border-gray-300 truncate px-3 py-2 flex items-center relative">
                         {item.site === "" ? "No link add":  <a
                            className="text-blue-500 hover:underline max-w-[90%] truncate"
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.site}
                          </a>}
                          {item.site === "" ? "" : <span className="absolute right-3">
                            <img
                              className="size-4 hover:cursor-pointer"
                              onClick={() => {
                                copyToClipboard(item.site, index, "site");
                              }}
                              src={
                                copy.index === index && copy.field === "site"
                                  ? "copied.svg"
                                  : "copy-content.svg"
                              }
                              alt="copy image"
                            />
                          </span>}
                        </td>
                        <td className="border border-gray-300 truncate px-3 py-2">
                         {item.username === "" ? "No username" :  <div className="flex items-center justify-between">
                            <span className="max-w-[90%] truncate">
                              {item.username}
                            </span>
                            <span>
                              <img
                                className="size-4 hover:cursor-pointer"
                                onClick={() => {
                                  copyToClipboard(
                                    item.username,
                                    index,
                                    "username"
                                  );
                                }}
                                src={
                                  copy.index === index &&
                                  copy.field === "username"
                                    ? "copied.svg"
                                    : "copy-content.svg"
                                }
                                alt="copy-image"
                              />
                            </span>
                          </div>}
                        </td>
                        <td className="border border-gray-300 truncate px-3 py-2">
                          <div className="flex items-center justify-between">
                            <span className="max-w-[60%] truncate">
                              <span>
                                {item.password === "" ? "No password" : viewPassword[item.id] ? item.password : "*********"}
                              </span>
                            </span>
                            {item.password === "" ? "": <div className="flex gap-2 items-center">
                              <button
                                onClick={() => {
                                  viewPasswordSet(item.id);
                                }}
                              >
                                {viewPassword[item.id] ? (
                                  <span>
                                    <img
                                      className="size-5"
                                      src="hide.svg"
                                      alt=""
                                    />
                                  </span>
                                ) : (
                                  <span>
                                    <img
                                      className="size-5"
                                      src="show.svg"
                                      alt=""
                                    />
                                  </span>
                                )}
                              </button>
                              <span>
                                <img
                                  className="size-4 hover:cursor-pointer"
                                  onClick={() => {
                                    copyToClipboard(
                                      item.password,
                                      index,
                                      "password"
                                    );
                                  }}
                                  src={
                                    copy.index === index &&
                                    copy.field === "password"
                                      ? "copied.svg"
                                      : "copy-content.svg"
                                  }
                                  alt="copy-image"
                                />
                              </span>
                            </div>}
                            
                          </div>
                        </td>
                        <td className="w-fit border border-gray-300 truncate px-3 py-2">
                          <div className="flex justify-between">
                            <span>
                              <lord-icon
                                onclick={() => {
                                  editData(item.id);
                                }}
                                className="size-5 hover:cursor-pointer"
                                src="https://cdn.lordicon.com/exymduqj.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#000000,secondary:#000000"
                              ></lord-icon>
                            </span>
                            <span>
                              <lord-icon
                                onclick={() => {
                                  deleteData(item.id);
                                }}
                                className="size-5 hover:cursor-pointer"
                                src="https://cdn.lordicon.com/xyfswyxf.json"
                                trigger="hover"
                              ></lord-icon>
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
