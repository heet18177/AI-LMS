import React from 'react'
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';

export const TopicInput = ({ setTopic, setDifficultyLevel }) => {
  return (
    <div>
      <h2>Enter topic or paste the content foe which you want to generate </h2>
      <Textarea
        placeholder="Enter your topic or content here"
        className="mt-3"
        onChange={(e) => setTopic(e.target.value)}
      />

      <h2 className="mt-5 mb-3">Select the difficulty level</h2>
      <select
        defaultValue=""
        className="mt-3 w-full border border-gray-300 rounded-xl bg-white px-4 py-2 text-sm shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 
             hover:shadow-md transition"
        onChange={(e) => setDifficultyLevel(e.target.value)}
      >
        <option value="" disabled hidden>
          Select Difficulty
        </option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </div>
  );
};

export default TopicInput