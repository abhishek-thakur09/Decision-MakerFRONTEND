export default function PollCard({ poll, onVote }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h2 className="text-lg font-semibold">{poll.question}</h2>

      <p className="text-sm text-orange-500">
        ⏱ {poll.remainingTimeFormatted}
      </p>

      {poll.options.map((opt) => (
        <div
          key={opt._id}
          onClick={() => onVote(poll._id, opt._id)}
          className="border p-3 rounded-lg my-2 cursor-pointer"
        >
          <div className="flex justify-between">
            <span>{opt.text}</span>
            <span>{opt.percentage}% ({opt.voteCount})</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 h-2 rounded mt-2">
            <div
              className="bg-orange-400 h-2 rounded"
              style={{ width: `${opt.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}