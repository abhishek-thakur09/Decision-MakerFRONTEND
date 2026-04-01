const FilterTabs = ({ active, setActive })=> {
  return (
    <div className="flex gap-3">
      {["all", "active", "expired"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-2 rounded-full ${
            active === tab ? "bg-black text-white" : "bg-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;