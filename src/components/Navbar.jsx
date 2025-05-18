const Navbar = () => {
  return (
    <nav className=" p-2 bg-slate-400">
      <div className="sm:myContainer mx-auto flex justify-around sm:justify-between items-center">
        <div className="font-bold">
          <a href="" className="text-xl">
            <span className="text-green-700">&lt;</span>
            <span>Pass</span>
            <span className="text-green-700">OP/&gt;</span>
            <span></span>
          </a>
        </div>
        <div>
          <button className="flex justify-center items-center gap-1 border hover:bg-gray-600 border-gray-700 px-2 rounded-full py-1">
            <lord-icon
            className="size-5 sm:size-6"              
            src="https://cdn.lordicon.com/jjxzcivr.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#000000,secondary:#000000"
            ></lord-icon>
            <span className="text-sm sm:text-[15px]">Github</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
