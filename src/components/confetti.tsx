
'use client';

interface ConfettiProps {
    show: boolean;
}

const Confetti = ({ show }: ConfettiProps) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[200]">
            {[...Array(150)].map((_, i) => (
                <div key={i} className="confetti-piece" style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    '--confetti-color': `hsl(${Math.random() * 360}, 70%, 60%)`
                } as React.CSSProperties}></div>
            ))}
        </div>
    );
};

export default Confetti;
