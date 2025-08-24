export default function HeaderBar({ onSubmit }) {
    return (
        <div className="w-full bg-brand-cyan py-6 shadow-md">
            <form
                onSubmit={onSubmit}
                className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center"
            >
                <input
                    name="firstName"
                    placeholder="First name"
                    aria-label="First name"
                    className="flex-1 bg-white rounded shadow-sm px-4 py-3 outline-none placeholder-gray-400"
                />
                <input
                    name="lastName"
                    placeholder="Last name"
                    aria-label="Last name"
                    className="flex-1 bg-white rounded shadow-sm px-4 py-3 outline-none placeholder-gray-400"
                />
                <input
                    name="participation"
                    placeholder="Participation"
                    aria-label="Participation"
                    type="number"
                    min="0"
                    max="100"
                    className="w-40 bg-white rounded shadow-sm px-4 py-3 outline-none placeholder-gray-400"
                />
                <button
                    type="submit"
                    className="shrink-0 rounded-md bg-white text-brand-cyan font-semibold px-6 py-3"
                >
                    SEND
                </button>
            </form>
        </div>
    )
}