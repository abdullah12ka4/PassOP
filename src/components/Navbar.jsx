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
      </div>
    </nav>
  );
};

export default Navbar;
