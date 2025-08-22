export default function HeaderBar({ onSubmit }) {
    return (
    <div className="w-full bg-cyan-500 py-6">
    <form
    onSubmit={onSubmit}
    className="max-w-6xl mx-auto px-4 flex gap-4 items-center"
    >
    <input
    name="firstName"
    placeholder="First name"
    className="flex-1 rounded-md border border-transparent focus:border-white/70 px-4 py-3 outline-none"
    />
    <input
    name="lastName"
    placeholder="Last name"
    className="flex-1 rounded-md border border-transparent focus:border-white/70 px-4 py-3 outline-none"
    />
    <input
    name="participation"
    placeholder="Participation"
    type="number"
    className="w-48 rounded-md border border-transparent focus:border-white/70 px-4 py-3 outline-none"
    />
    <button
    type="submit"
    className="shrink-0 rounded-md bg-white text-cyan-700 font-semibold px-6 py-3"
    >
    SEND
    </button>
    </form>
    </div>
    );
    }