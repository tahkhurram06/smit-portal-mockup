export default function AuroraBackground() {
  return (
    <>
      {/* blurred color blobs */}
      <div className="fixed -inset-[20%] z-0 opacity-[var(--aurora-opacity)] blur-[60px] sm:blur-[74px]">
        <div
          className="absolute h-[70vw] w-[70vw] max-h-[560px] max-w-[560px] rounded-full bg-[#8B6BFF] motion-safe:animate-[drift1_19s_ease-in-out_infinite]"
          style={{ top: "-8%", left: "-8%" }}
        />
        <div
          className="absolute h-[60vw] w-[60vw] max-h-[460px] max-w-[460px] rounded-full bg-[#3FE6D6] motion-safe:animate-[drift2_23s_ease-in-out_infinite]"
          style={{ bottom: "-10%", right: "-6%" }}
        />
        <div
          className="absolute h-[45vw] w-[45vw] max-h-[340px] max-w-[340px] rounded-full bg-[#FF57A8] motion-safe:animate-[drift3_21s_ease-in-out_infinite]"
          style={{ bottom: "8%", left: "22%" }}
        />
      </div>

      {/* grain texture */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage:
            "radial-gradient(var(--grain) 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* vignette */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, var(--vignette) 100%)",
        }}
      />
    </>
  );
}