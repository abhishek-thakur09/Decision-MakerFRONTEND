import { useEffect, useState } from "react";
import StatsCard from "../components/StateCard";
import PollCard from "../components/PollCard";
import FilterTabs from "../components/FilterTabs";
import API from "../services/Api";

const Dashboard = () => {
  const [polls, setPolls] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false); // Added a loading state
  const [states, setState] = useState({
    totalPolls: 0,
    activePolls: 0,
    expiredPolls: 0,
    totalVotes: 0,
  });

  const refreshData = async () => {
    try {
      const [statsRes, pollsRes] = await Promise.all([
        API.get("/stats"),
        API.get(`/allPolls?status=${filter}`)
      ]);
      setState(statsRes.data);
      setPolls(pollsRes.data);
    } catch (error) {
      console.error("Sync Error:", error);
    }
  };

  useEffect(() => {
    refreshData();
  }, [filter]);

  // The Voting Handler
  const handleVote = async (pollId, optionId) => {
    try {
      await API.post("/vote", { pollId, optionId });
      await refreshData();
      
      console.log("Vote successful!");
    } catch (error) {
      console.error("Vote failed:", error.response?.data?.message || error.message);
      alert("Voting failed. You might have already voted or the poll expired.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 relative overflow-hidden p-6 md:p-10">

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Polls" value={states.totalPolls} />
          <StatsCard title="Active" value={states.activePolls} />
          <StatsCard title="Closed" value={states.expiredPolls} />
          {/* Total Votes*/}
          <StatsCard 
             title="Total Votes" 
             value={Array.isArray(states.totalVotes) ? states.totalVotes[0]?.total || 0 : states.totalVotes} 
          />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <FilterTabs active={filter} setActive={setFilter} />
          </div>

          <div className="grid gap-6">
            {polls.length > 0 ? (
              polls.map((poll) => (
                <PollCard 
                  key={poll._id} 
                  poll={poll} 
                  onVote={handleVote} 
                />
              ))
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
};


export default Dashboard;