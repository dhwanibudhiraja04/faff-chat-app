"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800 px-6 py-12 flex flex-col items-center justify-center">
      <section className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Building my way into FAFF 
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-2">
          Built for the FAFF Engineering Assignment
        </p>
        <p className="text-md text-gray-500 mb-8">By Dhwani Budhiraja</p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
  <button
    onClick={() => {
      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    }}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-200"
  >
    Get Started
  </button>

</div>


        <div className="mt-6">
          <Image
            src="/hero-chat-illustration.avif"
            alt="Chat App Preview Illustration"
            width={600}
            height={400}
            className="rounded-xl shadow-lg mx-auto"
          />
          <p className="text-gray-400 mt-2 text-sm">
            Illustration: A visual overview of the real-time chat experience
          </p>
        </div>
      </section>

      <section id="features" className="w-full max-w-5xl px-4 py-16 mx-auto text-center">
  <h2 className="text-3xl md:text-4xl font-bold mb-6">About the Assignment</h2>
  <p className="text-gray-600 text-lg mb-12">
    This project was built as part of the FAFF Engineering Assignment and includes three integrated parts focused on real-time communication, system analysis, and NLP-driven memory extraction.
  </p>

  <div className="grid gap-6 md:grid-cols-3">
    {/* Part 1: Realtime Chat */}
<a
  href="https://faff-chat-app.vercel.app/login"
  target="_blank"
  rel="noopener noreferrer"
>
  <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-200 cursor-pointer">
    <h3 className="text-xl font-semibold mb-2">💬 Realtime Chat App</h3>
    <p className="text-sm text-gray-600">
      A full-stack chat platform with authentication, real-time messaging, and message history support.
    </p>
  </div>
</a>

{/* Part 2: Bottleneck Analysis */}
<a
  href="https://phantom-caraway-a19.notion.site/TASK-2-Bottleneck-Failure-Analysis-216bd4a5e7d080fc8924e71aad3b07e1"
  target="_blank"
  rel="noopener noreferrer"
>
  <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-200 cursor-pointer">
    <h3 className="text-xl font-semibold mb-2">📉 Bottleneck Analysis</h3>
    <p className="text-sm text-gray-600">
      Estimation of system scalability limits, monitoring strategies, and failure detection mechanisms.
    </p>
  </div>
</a>

{/* Part 3: Memory Extraction */}
<a
  href="https://colab.research.google.com/drive/13ETQ19Cohrjs2YKTLPMyay7wh77rtl-L?usp=sharing"
  target="_blank"
  rel="noopener noreferrer"
>
  <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-200 cursor-pointer">
    <h3 className="text-xl font-semibold mb-2">🧠 Memory Extraction</h3>
    <p className="text-sm text-gray-600">
      Extracted long-term user facts from chat logs using NLP, structured into queryable memory snippets.
    </p>
  </div>
</a>
  </div>
</section>

<section className="w-full max-w-5xl px-4 py-16 mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
    Part 1: Realtime Chat App
  </h2>
  <p className="text-gray-600 text-center mb-10 text-lg">
    A scalable chat system with live messaging, user auth, and persistent message storage.
  </p>

  <div className="grid md:grid-cols-2 gap-8 items-center">
    {/* Left: Info and Features */}
    <div>
      <ul className="list-disc text-gray-700 pl-6 space-y-3 mb-6">
        <li>User Signup/Login with email</li>
        <li>Real-time communication via Socket.io</li>
        <li>Persistent storage using backend APIs</li>
        <li>REST API Endpoints:
          <ul className="list-disc pl-6 text-sm text-gray-500 mt-1">
            <li>POST /users</li>
            <li>POST /messages</li>
            <li>GET /messages?userId=...</li>
          </ul>
        </li>
      </ul>

      <div className="flex gap-4 mt-4">
        <Link href="/login">
          <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition">
            Try the Chat
          </button>
        </Link>
      </div>
    </div>

    {/* Right: Chat UI Screenshot */}
    <div className="text-center">
      <Image
        src="/chat-ui-preview.png"
        alt="Chat UI Screenshot"
        width={500}
        height={350}
        className="rounded-lg shadow-lg"
      />
      <p className="text-gray-400 text-sm mt-2">
        Screenshot: Live chat UI with message input and real-time updates
      </p>
    </div>
  </div>
</section>

<section className="w-full max-w-5xl px-4 py-16 mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
    Part 2: Bottleneck & Failure Analysis
  </h2>
  <p className="text-gray-600 text-center text-lg mb-10">
    Evaluating the scalability limits and identifying failure points of the chat system.
  </p>

  <div className="grid md:grid-cols-2 gap-8 items-start">
    {/* Left: Key Points */}
    <div>
      <ul className="list-disc text-gray-700 pl-6 space-y-3">
        <li>
          <strong>Breaking Point:</strong> ~2,000 concurrent users on GCP e2-standard-2
        </li>
        <li>
          <strong>Limiting Factor:</strong> CPU-bound message broadcast handler
        </li>
        <li>
          <strong>Logged Metrics:</strong> Message throughput, active socket connections
        </li>
        <li>
          <strong>Detection:</strong> Used logging to monitor event loop lag and memory usage
        </li>
        <li>
          <strong>Mitigation Plan:</strong> Introduce horizontal scaling + Redis pub/sub
        </li>
      </ul>

      <div className="mt-6">
        <Link href="https://phantom-caraway-a19.notion.site/TASK-2-Bottleneck-Failure-Analysis-216bd4a5e7d080fc8924e71aad3b07e1">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition">
            View Full Report
          </button>
        </Link>
      </div>
    </div>

    {/* Right: System Diagram */}
    <div className="text-center">
      <Image
        src="/bottleneck-diagram.png"
        alt="System Bottleneck Diagram"
        width={500}
        height={350}
        className="rounded-lg shadow-lg"
      />
      <p className="text-gray-400 text-sm mt-2">
        Diagram: Architecture and bottleneck hotspots
      </p>
    </div>
  </div>
</section>

<section className="w-full max-w-5xl px-4 py-16 mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
    Part 3: Memory Extraction
  </h2>
  <p className="text-gray-600 text-center text-lg mb-10">
    Automatically extract structured memories from chat logs using NLP – to capture user preferences, topics, and personal facts.
  </p>

  <div className="grid md:grid-cols-2 gap-8 items-start">
    {/* Left: Description */}
    <div>
      <ul className="list-disc text-gray-700 pl-6 space-y-3">
        <li>Parse chat transcripts to identify facts (e.g., “I love jazz music”)</li>
        <li>Deduplicate and timestamp extracted memory items</li>
        <li>Store memories with references to original messages</li>
        <li>Expose query API for retrieving user-specific memories</li>
      </ul>

      <div className="mt-6">
        <Link href="https://colab.research.google.com/drive/13ETQ19Cohrjs2YKTLPMyay7wh77rtl-L?usp=sharing">
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-md transition">
            Try Memory Query 
          </button>
        </Link>
      </div>
    </div>

    {/* Right: Preview Image & Example */}
    <div className="text-center">
      <Image
        src="/memory-output-preview.jpg"
        alt="Memory Extraction Output Preview"
        width={500}
        height={350}
        className="rounded-lg shadow-lg"
      />
      <p className="text-gray-400 text-sm mt-2">
        Screenshot: Structured memory output (JSON or table)
      </p>
    </div>
  </div>
</section>

<section className="w-full max-w-4xl px-4 py-20 mx-auto text-center bg-blue-50 rounded-xl mt-10">
  <h2 className="text-3xl md:text-4xl font-bold mb-4">Thank You for this  Opportunity.</h2>
  <p className="text-gray-700 text-lg mb-8">
    All three parts of the FAFF Engineering Assignment are completed and live! Jump in and explore the chat platform or try out the memory extraction features.
  </p>


  <div className="text-sm text-gray-500">
    <p>Built by <strong>Dhwani Budhiraja</strong> for the <strong>FAFF Engineering Assignment</strong></p>
    <p className="mt-2">
      🔗 <a href="https://github.com/dhwanibudhiraja04/faff-chat-app" className="underline hover:text-blue-700">GitHub Repo</a> |
      🌐 <a href="https://faff-chat-app.vercel.app/">Live Demo</a> |
      ✉️ <a href="mailto:dhwanibudhiraja2004@gmail.com" className="underline hover:text-blue-700">dhwanibudhiraja2004@gmail.com</a>
    </p>
  </div>
</section>


    </main>
  );
}
