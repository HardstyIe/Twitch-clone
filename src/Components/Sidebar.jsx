const Sidebar = () => {
  const handleChange = () => {
    console.log("Hello");
  };
  return (
    <div className="w-64 min-h-screen p-4 text-white bg-gray-900 text-start">
      <div className={"flex items-center justify-between"}>
        <p className="mb-4 text-2xl font-bold">Pour Vous</p>
        <button onClick={handleChange}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 16V4h2v12h-2zM6 9l2.501-2.5-1.5-1.5-5 5 5 5 1.5-1.5-2.5-2.5h8V9H6z"
            />
          </svg>
        </button>
      </div>
      <div className="mt-8">
        <div>
          <div>
            <p className="mb-4 font-bold">CHAÎNES SUIVIES</p>
            <p></p>
          </div>
        </div>
        <ul>
          {/* placeholder */}
          <li className="px-2 py-1 mb-2 rounded hover:bg-gray-700">
            <a href="#">Chaîne 1</a>
          </li>
          <li className="px-2 py-1 mb-2 rounded hover:bg-gray-700">
            <a href="#">Chaîne 2</a>
          </li>
          <li className="px-2 py-1 mb-2 rounded hover:bg-gray-700">
            <a href="#">Chaîne 3</a>
          </li>
          {/* placeholder */}
        </ul>
        <button className={"btn "}>Afficher Plus</button>
      </div>
      <div>
        <p>CHAÎNES RECOMMANDÉES</p>
      </div>
    </div>
  );
};

export default Sidebar;
