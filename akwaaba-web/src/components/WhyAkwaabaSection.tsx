const features = [
  {
    title: 'User Friendly Experience',
    body: "An intuitive platform that's easy to use, letting travelers search, filter, and explore destinations without confusion.",
  },
  {
    title: 'Visually Engaging Experience',
    body: 'Designed with students and modern travelers in mind, AkwaabaGh combines storytelling with visuals to create a smooth and engaging experience.',
  },
  {
    title: 'Diaspora Reconnection',
    body: 'For Ghanaians abroad, AkwaabaGh serves as a bridge to rediscover cultural roots, historic landmarks, and traditions.',
  },
]

export function WhyAkwaabaSection() {
  return (
    <section style={{ background: 'linear-gradient(180deg,#0B1220 0%,#132a23 100%)' }}>
      <div className="mx-auto max-w-[1100px] px-5 lg:px-8 py-16 sm:py-20">
        <h2 className="text-center font-display text-2xl sm:text-3xl font-extrabold text-white mb-14">
          Why AkwaabaGh
        </h2>
        {/* wide oval badge with the caption chip pulled up via negative margin so it overlaps the oval's bottom edge, like the reference */}
        <div className="grid sm:grid-cols-3 gap-x-8 gap-y-16">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center mx-auto w-full max-w-[270px]">
              <div
                className="w-full flex items-center justify-center text-center px-8"
                style={{
                  aspectRatio: '4 / 3',
                  borderRadius: '50%',
                  background: 'linear-gradient(160deg,#F2B705,#c98f04)',
                }}
              >
                <h3 className="font-display font-extrabold text-ink text-[15px] leading-snug">{f.title}</h3>
              </div>
              <div className="-mt-9 w-[84%] rounded-xl bg-ink/85 px-4 py-3 shadow-lg">
                <p className="text-xs leading-relaxed text-white/90 text-center">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
