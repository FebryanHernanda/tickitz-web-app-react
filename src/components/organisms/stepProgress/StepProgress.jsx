const StepProgress = () => {
  return (
    <div className="flex justify-between items-center gap-5">
      <div className="flex flex-col items-center gap-2">
        <div className="text-white bg-blue-500 rounded-full w-15 h-15 flex items-center justify-center">
          1
        </div>
        <p>Fill Form</p>
      </div>

      <div className="flex gap-1">
        <div className="w-2 h-[1px] bg-gray-400"></div>
        <div className="w-5 h-[1px] bg-gray-400"></div>
        <div className="w-5 h-[1px] bg-gray-400"></div>
        <div className="w-5 h-[1px] bg-gray-400"></div>
        <div className="w-2 h-[1px] bg-gray-400"></div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="text-white bg-gray-500 rounded-full w-15 h-15 flex items-center justify-center">
          2
        </div>
        <p className="text-secondary">Activate</p>
      </div>

      <div className="flex gap-1">
        <div className="w-2 h-[1px] bg-gray-400"></div>
        <div className="w-5 h-[1px] bg-gray-400"></div>
        <div className="w-5 h-[1px] bg-gray-400"></div>
        <div className="w-5 h-[1px] bg-gray-400"></div>
        <div className="w-2 h-[1px] bg-gray-400"></div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="text-white bg-gray-500 rounded-full w-15 h-15 flex items-center justify-center">
          3
        </div>
        <p className="text-secondary">Done</p>
      </div>
    </div>
  );
};

export default StepProgress;
