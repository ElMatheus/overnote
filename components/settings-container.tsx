export function SettingsContainer({ isPrivate, setIsPrivate, setShowSettings }: { isPrivate: boolean, setIsPrivate: (isPrivate: boolean) => void, setShowSettings: (showSettings: boolean) => void }) {
  return (
    <div className="fixed inset-y-0 right-0 w-1/3 bg-[#1E201F] shadow-lg p-6">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-thin text-white">Settings</h1>
        <button onClick={() => setShowSettings(false)} className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col">
        <div className="mb-2">
          <h1 className="text-white font-normal text-xl">Visibility</h1>
          <p className="text-[#9198a1] font-extralight text-base">Change the visibility of the note</p>
        </div>
        <div className="flex flex-row gap-2">
          <input type="radio" id="public" name="visibility" value="public" checked={!isPrivate} onChange={() => setIsPrivate(false)} />
          <label htmlFor="public" className="text-white font-light text-base">Public</label>
        </div>
        <div className="flex flex-row gap-2">
          <input type="radio" id="private" name="visibility" value="private" checked={isPrivate} onChange={() => setIsPrivate(true)} />
          <label htmlFor="private" className="text-white font-light text-base">Private</label>
        </div>
      </div>
    </div>
  );
}