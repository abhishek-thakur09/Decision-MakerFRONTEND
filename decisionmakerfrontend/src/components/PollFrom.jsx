import { useState } from "react";

const  PollForm = ({ onSubmit })=> {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

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
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-2xl mx-auto space-y-6">
      {/* Question Input */}
      <div>
        <label className="block text-gray-700 font-bold mb-2 ml-1">The Question</label>
        <input
          placeholder="What needs to deciede?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-purple-500 focus:ring-0 outline-none transition-all text-lg font-medium"
        />
      </div>

      {/* Options List */}
      <div className="space-y-3">
        <label className="block text-gray-700 font-bold mb-2 ml-1">Options</label>
        {options.map((opt, i) => (
          <div key={i} className="flex gap-2 items-center group">
            <input
              value={opt}
              onChange={(e) => handleInputChange(i, e.target.value)}
              className="flex-1 bg-gray-50 border-2 border-gray-100 p-3 rounded-xl focus:border-orange-400 outline-none transition-all"
              placeholder={`Option ${i + 1}`}
            />
            {options.length > 2 && (
              <button 
                onClick={() => removeOption(i)}
                className="text-gray-300 hover:text-red-500 transition-colors p-2"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 pt-4">
        {options.length < 4 && (
          <button 
            onClick={addOption}
            className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-500 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            + Add Another Option
          </button>
        )}

        <button
          onClick={() => onSubmit({ question, options: options.filter(o => o.trim() !== "") })}
          className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold py-4 rounded-2xl text-xl"
        >
          Create Poll
        </button>
      </div>
    </div>
  );
}


export default PollForm;