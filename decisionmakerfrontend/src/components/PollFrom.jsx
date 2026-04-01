import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";

const PollForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [displayTime, setDisplayTime] = useState("");
  const [expiryMinutes, setExpiryMinutes] = useState(10);
  const navigate = useNavigate();

useEffect(() => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + Number(expiryMinutes));
    
    const formatted = date.toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setDisplayTime(formatted);
  }, [expiryMinutes]);


const handleclick = async () => {
  if (expiryMinutes < 10 || expiryMinutes > 1440) {
    alert("Poll duration must be between 10 minutes and 24 hours!");
    return;
  }

  if (!question.trim() || options.some(opt => !opt.trim())) {
    alert("Please fill in everything!");
    return;
  }

  try {
    const expiryTime = new Date();
    //Current Time + User Minutes
    expiryTime.setMinutes(expiryTime.getMinutes() + Number(expiryMinutes));

    await API.post("/polls", {
      question,
      options: options.filter(opt => opt.trim() !== ""),
      expiryTime, 
    });

    navigate("/"); 
  } catch (error) {
    console.error("Poll Creation Failed", error.response?.data?.message || error.message);
  }
};

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
    }
  };

  const handleInputChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

 return (
  <div className="bg-white p-8 rounded-[32px] shadow-xl border border-gray-100 max-w-2xl mx-auto space-y-8">
    
    {/*Question */}
    <div>
      <label className="block text-gray-700 font-bold mb-2 ml-1 text-sm uppercase tracking-wider">
        The Question
      </label>
      <input
        placeholder="What needs to decide?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-purple-500 outline-none transition-all text-lg font-medium"
      />
    </div>

    {/* time selector */}
    <div className="bg-purple-50/50 border-2 border-purple-100 p-6 rounded-[28px] shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-[10px] text-purple-600 font-black uppercase tracking-widest mb-1">Poll Expiry</p>
          <p className="text-sm font-bold text-gray-700">Ends: <span className="text-purple-600">{displayTime}</span></p>
        </div>
        <div className="text-right">
          <input 
            type="number"
            value={expiryMinutes}
            onChange={(e) => setExpiryMinutes(e.target.value)}
            className="w-20 bg-white border-2 border-purple-200 rounded-xl px-3 py-2 font-bold text-purple-600 outline-none focus:border-purple-400 transition-all text-center"
          />
          <p className="text-[9px] text-gray-400 mt-1 font-bold">MINS</p>
        </div>
      </div>
    </div>

    {/*Options Section */}
    <div className="space-y-3">
      <label className="block text-gray-700 font-bold mb-2 ml-1 text-sm uppercase tracking-wider">
        Options
      </label>
      {options.map((opt, i) => (
        <div key={i} className="flex gap-2 items-center group">
          <input
            value={opt}
            onChange={(e) => handleInputChange(i, e.target.value)}
            className="flex-1 bg-gray-50 border-2 border-gray-100 p-3 rounded-xl focus:border-orange-400 outline-none transition-all"
            placeholder={`Option ${i + 1}`}
          />
          {options.length > 2 && (
            <button onClick={() => removeOption(i)} className="text-gray-300 hover:text-red-500 p-2">✕</button>
          )}
        </div>
      ))}
    </div>

    {/*Action Buttons */}
    <div className="flex flex-col gap-4 pt-4">
      {options.length < 4 && (
        <button onClick={addOption} className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 font-bold hover:bg-gray-50 transition-all">
          + Add Option
        </button>
      )}

      <button
        onClick={handleclick}
        className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold py-4 rounded-2xl text-xl"
      >
        Create Poll
      </button>
    </div>
  </div>
);
};

export default PollForm;
