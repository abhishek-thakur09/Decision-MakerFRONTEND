import { useEffect, useState } from "react";
import StatsCard from "../components/StateCard";
import PollCard from "../components/PollCard";
import FilterTabs from "../components/FilterTabs";

const Dashboard = ()=> {
  const [polls, setPolls] = useState([]);
  const [filter, setFilter] = useState("all");

  return (
    <div className="min-h-screen w-full bg-slate-50 relative overflow-hidden p-6 md:p-10">
      
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-200/50 blur-[130px] -z-10" />
      <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-purple-200/50 blur-[130px] -z-10" />
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Polls" value={polls.length} />
          <StatsCard title="Active" value={0} />
          <StatsCard title="Closed" value={0} />
          <StatsCard title="Total Votes" value={0} />
        </div>

        {/* Filters and Content Area */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <FilterTabs active={filter} setActive={setFilter} />
          </div>

          {/* Polls List */}
          <div className="grid gap-4">
            {polls.length > 0 ? (
              polls.map((poll) => <PollCard key={poll._id} poll={poll} />)
            ) : (
              
              <div className="bg-white/50 backdrop-blur-sm border-2 border-dashed border-gray-200 rounded-3xl p-20 text-center text-gray-400">
                No polls found in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;