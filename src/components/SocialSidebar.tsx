const socials = [
  {
    label: "ВКонтакте",
    url: "https://vk.com/svodka24ustkut",
    color: "#0077FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M21.547 7h-3.29a.743.743 0 0 0-.655.392s-1.312 2.416-1.79 3.236c-1.23 2.127-1.75 1.746-1.75 1.746V7.5a.5.5 0 0 0-.5-.5H9.75S9.5 7 9.5 7.5c0 0 .75.154.75 1.23V15s-.25 1.25-1.856 1.25C6.607 16.25 5 14.5 5 12.5c0-1.969 1.25-4.5 1.25-4.5H2.5S1 11 1 13.5C1 17.5 4.5 20 8 20c2.844 0 4-1.5 4-1.5v1a.5.5 0 0 0 .5.5h2.5a.5.5 0 0 0 .5-.5V14s.5-1 1.5 0c.77.77 1.5 2 2.5 4.5.156.39.516.5.75.5H23s1.25-.125.5-1.5c-.625-1.125-2-3-2-3s-.625-.875 0-1.75C22.5 11.5 23.5 9 23.5 9S24 7 21.547 7z"/>
      </svg>
    ),
  },
  {
    label: "Одноклассники",
    url: "https://ok.ru/profile/581825582472",
    color: "#EE8208",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm0 5a3.5 3.5 0 1 1-3.5 3.5A3.5 3.5 0 0 1 12 6zm5.5 10.5c-.4.9-1.5 1.5-3 1.9l1.6 1.6a1 1 0 0 1-1.4 1.4L12 19.1l-2.7 2.3a1 1 0 0 1-1.4-1.4l1.6-1.6c-1.5-.4-2.6-1-3-1.9a1 1 0 0 1 1.8-.8c.4.8 1.8 1.4 3.7 1.4s3.3-.6 3.7-1.4a1 1 0 0 1 1.8.8z"/>
      </svg>
    ),
  },
  {
    label: "Telegram",
    url: "https://t.me/svodka24ustkut",
    color: "#26A5E4",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  {
    label: "MAX",
    url: "https://max.ru/join/P_HfSBqoL1_EzOFrrv_IeuUQ7u55zTDXVB0p-ODUk6E",
    color: "#7B3FE4",
    icon: (
      <img
        src="https://cdn.poehali.dev/projects/0589c48d-6b6a-42bf-a296-e4c2f31df20b/bucket/5ebd938d-04d7-4ae1-959e-ffcc82182d86.jpg"
        alt="MAX"
        width="26"
        height="26"
        className="rounded-md"
      />
    ),
  },
];

export default function SocialSidebar() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-0.5">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          title={s.label}
          className="group flex items-center overflow-hidden transition-all duration-300 w-10 hover:w-36 h-10 rounded-l-xl shadow-lg"
          style={{ backgroundColor: s.color }}
        >
          <span className="flex items-center justify-center w-10 h-10 shrink-0 text-white">
            {s.icon}
          </span>
          <span className="text-white text-xs font-bold whitespace-nowrap pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {s.label}
          </span>
        </a>
      ))}
    </div>
  );
}