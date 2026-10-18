import { useState } from 'react';

function createPetals() {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 10 + Math.random() * 10,
    duration: 12 + Math.random() * 10,
    delay: -Math.random() * 20,
  }));
}

export default function Petals() {
  const [petals] = useState(createPetals);

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}