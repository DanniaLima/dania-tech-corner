"use client";

import { useEffect, useRef } from "react";

export function MatrixBackground({
  theme,
}: {
  theme: "light" | "dark" | "system";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isDark) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    let width = (canvas.width = parent?.clientWidth || window.innerWidth);
    let height = (canvas.height = parent?.clientHeight || window.innerHeight);

    const chars = "01ABCDEF0123456789";
    const fontSize = 20; // Aumentei o tamanho para ficar menos denso
    const columns = width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(11, 16, 32, 0.15)"; // Rastro mais suave
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(56, 189, 248, 0.10)"; // Letras MUITO mais transparentes
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 60); // Um pouco mais lento

    const handleResize = () => {
      width = canvas.width = parent?.clientWidth || window.innerWidth;
      height = canvas.height = parent?.clientHeight || window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDark]);

  if (!isDark) return null;

  return (
    <canvas
      ref={canvasRef}
      // AQUI ESTÁ A MÁGICA: A máscara faz o efeito sumir na direita (onde está o gráfico)
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen [mask-image:linear-gradient(to_right,black_20%,transparent_60%)]"
      aria-hidden="true"
    />
  );
}
