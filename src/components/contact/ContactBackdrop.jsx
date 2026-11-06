export default function ContactBackdrop() {
    return (
        <>
            <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(112,120,208,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(112,120,208,0.07) 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                    maskImage: 'radial-gradient(ellipse at 75% 40%, #000, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at 75% 40%, #000, transparent 70%)',
                }}
            />
        </>
    );
}