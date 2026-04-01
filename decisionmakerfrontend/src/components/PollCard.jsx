import React, {useState, useEffect} from "react";

const PollCard = ({ poll, onVote }) => {
  const [timeLeft, setTimeLeft] = useState("");

  const calculateTime = () => {
    const end = new Date(poll.expiryTime);
    const now = new Date();
    const diff = end - now;
    if (diff <= 0) return "Expired";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const actualTime = end.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    return `Ends at ${actualTime} (${hours}h ${minutes}m left)`;
  };

  useEffect(() => {
    setTimeLeft(calculateTime());
    const timer = setInterval(() => setTimeLeft(calculateTime()), 60000);
    return () => clearInterval(timer);
  }, [poll.expiryTime]);

  const isExpired = poll.status === "expired" || timeLeft === "Expired";

  //highest number of votes
  const maxVotes = Math.max(...poll.options.map(o => o.voteCount));
  
  //winner exists only if the poll is closed
  const hasVotes = maxVotes > 0;


  return (
    <div className={`bg-white p-6 rounded-[32px] shadow-xl border border-gray-100 transition-all hover:shadow-2xl ${isExpired ? 'opacity-95' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-gray-800 leading-tight">
          {poll.question}
        </h2>
        
        {/* shows is active or expire */}
        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
          isExpired ? "bg-gray-800 text-white" : "bg-green-100 text-green-600"
        }`}>
          {isExpired ? "Results In" : "Active"}
        </span>
      </div>

      <p className={`text-sm font-bold flex items-center gap-1 mb-6 ${isExpired ? 'text-gray-400' : 'text-orange-500'}`}>
        <span className="text-lg">⏱</span> {timeLeft}
      </p>

      <div className="space-y-4">
        {poll.options.map((opt) => {
          const isWinner = isExpired && hasVotes && opt.voteCount === maxVotes;

          return (
            <div
              key={opt._id}
              onClick={() => !isExpired && onVote(poll._id, opt._id)}
              className={`relative group border-2 p-4 rounded-2xl transition-all overflow-hidden
                ${isExpired ? "cursor-not-allowed" : "cursor-pointer hover:border-orange-200 hover:bg-orange-50/30 active:scale-[0.98] active:shadow-inner"}
                ${isWinner ? "border-yellow-400 bg-yellow-50/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]" : "border-gray-100"}
              `}
            >
              <div className="flex justify-between items-center mb-2 relative z-10">
                <span className="font-bold text-gray-700 flex items-center gap-2">
                  {opt.text}
                  {isWinner && <span className="text-lg">🏆</span>}
                </span>
                <span className={`text-sm font-black ${isWinner ? "text-yellow-600" : "text-gray-400"}`}>
                  {opt.percentage}% <span className="font-normal opacity-60">({opt.voteCount})</span>
                </span>
              </div>

              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden shadow-inner border border-gray-200/50">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out 
                    ${isWinner 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                      : isExpired ? 'bg-gray-300' : 'bg-gradient-to-r from-orange-500 to-purple-600'}
                  `}
                  style={{ width: `${opt.percentage}%` }}
                ></div>
              </div>
              
              {isWinner && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-[10px] font-black px-2 py-1 rounded-bl-xl uppercase text-yellow-900 tracking-tighter">
                  Winner
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-400 font-medium">
        <span>Created: {new Date(poll.createdAt).toLocaleDateString()}</span>
        <span className="bg-gray-50 px-2 py-1 rounded-md">ID: {poll._id.slice(-6)}</span>
      </div>
    </div>
  );
};

export default PollCard;