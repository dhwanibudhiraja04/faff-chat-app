export default function ChatWindow() {
  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="border-b p-4 font-semibold">Chat with John Doe</div>
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {/* Message bubbles will go here */}
        <div className="mb-2 p-2 bg-blue-100 rounded max-w-xs">Hey there!</div>
        <div className="mb-2 p-2 bg-green-100 rounded max-w-xs self-end">
          Hello!
        </div>
      </div>
      <div className="border-t p-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Type a message..."
        />
      </div>
    </div>
  )
}
